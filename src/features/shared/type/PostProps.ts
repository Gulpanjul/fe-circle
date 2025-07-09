export type PostProps = {
    avatarUrl?: string;
    fullName?: string;
    username?: string;
    createdAt: string;
    content: string;
    images?: string;
    likesCount?: number;
    isReply?: boolean;
    isPostDetail?: boolean;
    onClickContent?: () => void;
    onLikeClick?: () => void;
    isLikeLoading?: boolean;
    children?: React.ReactNode;
};
