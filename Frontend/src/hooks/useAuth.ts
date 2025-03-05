import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

type Role = 'admin' | 'employee';

type User = {
    exp: number;
    iat: number;
    lastName: string;
    name: string;
    userType: Role;
    uid: string;
};

type AuthState = {
    isAuth: boolean;
    user: User | null;
    loading: boolean;
    login: (jwt: string) => void;
    logout: () => void;
};

const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            isAuth: false,
            user: null,
            loading: true,
            login: (jwt: string) => {
                try {
                    const decoded = jwtDecode<User>(jwt);
                    if (decoded.exp * 1000 < Date.now()) {
                        alert('El token ha expirado');
                        return;
                    }
                    set({ isAuth: true, user: decoded, loading: false });
                } catch (error) {
                    console.error('Error al decodificar el JWT:', error);
                    set({ isAuth: false, user: null, loading: false });
                }
            },
            logout: () => {
                set({ isAuth: false, user: null, loading: false });
                localStorage.removeItem('auth-storage');
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ isAuth: state.isAuth, user: state.user }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.loading = false;
                }
            },
        }
    )
);

export default useAuth;
