import { Skeleton } from '../ui/skeleton';

export default function UserCardSkeleton() {
    return (
        <div className="flex items-center gap-5 p-5">
            <Skeleton className="rounded-full w-12 h-12" />
            <div className="flex flex-col flex-1 gap-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
            </div>
        </div>
    );
}
