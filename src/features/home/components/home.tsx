import CardThread from './cardThread';
import CreateThread from './createThread';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { api } from '@/libs/api';
import type { Thread } from '@/features/thread/types/thread';

export default function Home() {
    const { data, isLoading, isError, failureReason } = useQuery({
        queryKey: ['threads'],
        queryFn: async () => {
            const response = await api.get('/threads');
            return response.data;
        },
    });

    const threads = data?.data ?? [];

    return (
        <div>
            <CreateThread />
            {isError && (
                <p className="text-red-500">{failureReason?.message}</p>
            )}
            {isLoading ? (
                <div className="flex justify-center py-13">
                    <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
                </div>
            ) : (
                <div className="flex flex-col gap-4 mt-4">
                    {threads.map((thread: Thread) => (
                        <CardThread {...thread} key={thread.id} />
                    ))}
                </div>
            )}
        </div>
    );
}
