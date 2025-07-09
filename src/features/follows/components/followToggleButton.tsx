import { Button } from '@/components/ui/button';

interface FollowToggleButtonProps {
    isFollowed: boolean;
    onClick: () => void;
    isLoading?: boolean;
}

export function FollowToggleButton({
    isFollowed,
    onClick,
    isLoading,
}: FollowToggleButtonProps) {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            disabled={isLoading}
            className={`px-3 py-1 text-sm border rounded-full hover:bg-accent w-20
        ${isFollowed ? 'text-muted-foreground' : 'text-white ring-1 ring-white '}
    `}
        >
            {isLoading ? '...' : isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
    );
}
