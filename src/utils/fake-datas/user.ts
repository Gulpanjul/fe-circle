interface User {
    fullName: string;
    email: string;
    username: string;
    password: string;
    followersCount: number;
    followingsCount: number;
    avatarUrl: string;
    backgroundUrl: string;
    bio?: string;
}

export const userDatas: User[] = [
    {
        fullName: 'Andhika Chandra Gulpa',
        email: 'jyG2o@example.com',
        username: 'gulpanjul',
        password: 'password',
        followersCount: 0,
        followingsCount: 0,
        avatarUrl: 'https://avatars.githubusercontent.com/u/155915153?v=4',
        backgroundUrl:
            'https://4kwallpapers.com/images/walls/thumbs_3t/17330.png',
        bio: "I'm fullstack developer",
    },
    {
        fullName: 'Rendy Zulfan',
        email: 'jyG2o@example.com',
        username: 'rendy_zulfan',
        password: 'password',
        followersCount: 0,
        followingsCount: 0,
        avatarUrl:
            'https://api.dicebear.com/9.x/notionists/svg?seed=Rendy%20Zulfan',
        backgroundUrl:
            'https://4kwallpapers.com/images/walls/thumbs_3t/17330.png',
        bio: "I'm fullstack developer",
    },
];
