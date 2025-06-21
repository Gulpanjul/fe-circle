import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type User = {
    fullName: string;
    username: string;
    followersCount: number;
    followingsCount: number;
    avatarUrl: string;
    backgroundUrl: string;
    bio?: string;
};

type AuthStore = {
    user: User;
    setUser: (user: User) => void;
};

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set) => ({
                user: {} as User,
                setUser: (payload: User) =>
                    set((state) => ({ user: { ...state.user, ...payload } })),
            }),
            {
                name: 'auth-store',
            },
        ),
    ),
);
