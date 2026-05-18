<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;

use Inertia\Inertia;

class DessertController extends Controller
{
    /**
     * Mostrar catálogo de postres.
     */
    public function index()
    {
        /*
        |--------------------------------------------------------------------------
        | Obtener categorías activas con conteo de productos disponibles
        |--------------------------------------------------------------------------
        */

        $categories = Category::query()

            ->active()

            ->withCount([
                'products' => function ($query) {

                    $query
                        ->active()
                        ->inStock();
                }
            ])

            ->orderBy('name')

            ->get()

            ->map(function ($category) {

                return [

                    'id' =>
                        $category->id,

                    'name' =>
                        $category->name,

                    'slug' =>
                        $category->slug,

                    'count' =>
                        $category->products_count,
                ];
            });


        /*
        |--------------------------------------------------------------------------
        | Obtener productos disponibles
        |--------------------------------------------------------------------------
        */

        $desserts = Product::query()

            ->with('category')

            ->active()

            ->inStock()

            ->orderByDesc('popular')

            ->get()

            ->map(function ($product) {

                return [

                    'id' =>
                        $product->id,

                    'name' =>
                        $product->name,

                    'category' =>
                        $product->category->slug,

                    'price' =>
                        (float) $product->base_price,

                    'image' =>
                        $product->image_url,

                    'description' =>
                        $product->description,

                    'rating' =>
                        (float) $product->rating,

                    'reviews' =>
                        $product->reviews_count,

                    'deliveryTime' =>
                        $product->delivery_time,

                    'serves' =>
                        $product->serves,

                    'ingredients' =>
                        $product->ingredients,

                    'popular' =>
                        $product->popular,

                    'nuevo' =>
                        $product->is_new,

                    'tags' =>
                        $product->tags,
                ];
            });


        /*
        |--------------------------------------------------------------------------
        | Agregar categoría "All"
        |--------------------------------------------------------------------------
        */

        $allCategory = [

            'id' => null,

            'name' => 'All',

            'slug' => 'all',

            'count' => $desserts->count(),
        ];


        $categories = collect([
            $allCategory,
            ...$categories,
        ]);


        /*
        |--------------------------------------------------------------------------
        | Renderizar vista
        |--------------------------------------------------------------------------
        */

        return Inertia::render(

            'Desserts/Index',

            [

                'desserts' =>
                    $desserts,

                'categories' =>
                    $categories,
            ]
        );
    }
}
