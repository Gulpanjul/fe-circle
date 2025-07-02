export interface UserListItemProps {
    id: string;
    fullName: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
    isFollowed: boolean;
    onToggleFollow: () => void;
}
