export const isLogin: boolean = false;

interface UserSession {
    fullName: string;
    username: string;
    followersCount: number;
    followingsCount: number;
    avatarUrl: string;
    backgroundUrl: string;
    bio?: string;
}

export const userSession: UserSession = {
    fullName: 'Andhika Chandra Gulpa',
    username: 'gulpanjul',
    followersCount: 3586,
    followingsCount: 0,
    avatarUrl: 'https://avatars.githubusercontent.com/u/155915153?v=4',
    backgroundUrl: 'https://4kwallpapers.com/images/walls/thumbs_3t/17330.png',
    bio: "I'm fullstack developer",
};
