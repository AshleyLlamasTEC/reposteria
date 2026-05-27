import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar si el usuario es admin
        // Esto debe ajustarse según tu lógica de autenticación
        const checkAdminStatus = async () => {
            try {
                // Aquí iría tu lógica para verificar admin
                // Por ahora, asumimos que no es admin
                setIsAdmin(false);
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    const value = {
        isAdmin,
        loading,
        // Puedes agregar más funciones aquí
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}