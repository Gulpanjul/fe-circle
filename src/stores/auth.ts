import type { ProfileEntity } from '@/entities/profile.entity';
import type { UserEntity } from '@/entities/user.entity';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserProfile = UserEntity & {
    profile: ProfileEntity;
};

type AuthStore = {
    user: UserProfile;
    setUser: (payload: UserProfile) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
    devtools((set) => ({
        user: {} as UserProfile,
        setUser: (payload: UserProfile) =>
            set((state) => ({ user: { ...state.user, ...payload } })),
        logout: () => set(() => ({ user: {} as UserProfile })),
    })),
);
