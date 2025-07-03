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
            onClick={onClick}
            disabled={isLoading}
            className="px-3 py-1 text-sm border rounded-md text-muted-foreground hover:bg-accent"
        >
            {isLoading ? '...' : isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
    );
}
