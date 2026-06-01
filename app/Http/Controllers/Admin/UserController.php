<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Listado de usuarios con filtros y paginación.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 15);

        $query = "SELECT id, name, email, created_at
              FROM users
              WHERE 1=1";

        $bindings = [];

        if ($search) {
            $query .= " AND (name LIKE ? OR email LIKE ?)";
            $searchTerm = "%{$search}%";
            $bindings[] = $searchTerm;
            $bindings[] = $searchTerm;
        }

        $query .= " ORDER BY created_at DESC";

        // Paginación
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $perPage;

        // Total
        $countQuery = "SELECT COUNT(*) AS total FROM users WHERE 1=1";
        $countBindings = [];
        if ($search) {
            $countQuery .= " AND (name LIKE ? OR email LIKE ?)";
            $countBindings[] = "%{$search}%";
            $countBindings[] = "%{$search}%";
        }

        $totalResults = DB::select($countQuery, $countBindings)[0]->total;

        $query .= " LIMIT ? OFFSET ?";
        $bindings[] = $perPage;
        $bindings[] = $offset;

        $users = DB::select($query, $bindings);

        // Ya no mapeamos 'active' ni 'avatar', solo retornamos los datos crudos
        // (puedes agregar avatar si quieres, pero active ya no existe)
        $users = collect($users)->map(function ($user) {
            $user->avatar = null; // opcional, si aún necesitas avatar
            return $user;
        });

        $paginator = new \Illuminate\Pagination\LengthAwarePaginator(
            $users,
            $totalResults,
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('Admin/Users/Index', [
            'users' => $paginator,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Formulario de creación de usuario.
     */
    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Guarda un nuevo usuario.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            // Opcional: verificar email inmediatamente
            'email_verified_at' => 'nullable|date',
        ], [
            'name.required' => 'El nombre es obligatorio.',
            'email.required' => 'El email es obligatorio.',
            'email.unique' => 'Este email ya está registrado.',
            'password.required' => 'La contraseña es obligatoria.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $name = $request->input('name');
            $email = $request->input('email');
            $password = Hash::make($request->input('password'));
            $emailVerifiedAt = $request->input('email_verified_at', now()); // por defecto verificado

            DB::insert(
                "INSERT INTO users (name, email, password, email_verified_at, created_at, updated_at)
                 VALUES (?, ?, ?, ?, NOW(), NOW())",
                [$name, $email, $password, $emailVerifiedAt]
            );

            return redirect()->route('admin.users.index')
                ->with('success', 'Usuario creado correctamente.');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al crear el usuario: ' . $e->getMessage())->withInput();
        }
    }

    /**
     * Formulario de edición.
     */
    public function edit($id)
    {
        $user = DB::select("SELECT id, name, email, email_verified_at FROM users WHERE id = ?", [$id]);

        if (empty($user)) {
            abort(404, 'Usuario no encontrado');
        }

        $user = $user[0];
        // No exponemos password ni remember_token

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Actualiza el usuario.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => "required|string|email|max:255|unique:users,email,{$id}",
            'password' => 'nullable|string|min:8',
        ], [
            'name.required' => 'El nombre es obligatorio.',
            'email.required' => 'El email es obligatorio.',
            'email.unique' => 'Este email ya está registrado por otro usuario.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $name = $request->input('name');
            $email = $request->input('email');

            $fields = "name = ?, email = ?, updated_at = NOW()";
            $bindings = [$name, $email];

            if ($request->filled('password')) {
                $fields .= ", password = ?";
                $bindings[] = Hash::make($request->input('password'));
            }

            $bindings[] = $id;

            DB::update("UPDATE users SET {$fields} WHERE id = ?", $bindings);

            return redirect()->route('admin.users.index')
                ->with('success', 'Usuario actualizado correctamente.');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al actualizar el usuario: ' . $e->getMessage())->withInput();
        }
    }

    /**
     * Elimina un usuario.
     */
    public function destroy($id)
    {
        $user = DB::select("SELECT id FROM users WHERE id = ?", [$id]);

        if (empty($user)) {
            abort(404, 'Usuario no encontrado');
        }

        try {
            DB::delete("DELETE FROM users WHERE id = ?", [$id]);
            return redirect()->route('admin.users.index')
                ->with('success', 'Usuario eliminado correctamente.');
        } catch (\Exception $e) {
            return back()->with('error', 'No se pudo eliminar el usuario: ' . $e->getMessage());
        }
    }
}
