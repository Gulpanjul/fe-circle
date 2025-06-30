export interface ProfileEntity {
    id: string;
    fullName: string;
    avatarUrl?: string;
    bannerUrl?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}
