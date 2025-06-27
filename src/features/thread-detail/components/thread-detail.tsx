import CardReply from '@/features/home/components/card-reply';
import CardThreadDetail from '@/features/home/components/card-thread-detail';
import CreateThread from '@/features/home/components/create-thread';
import type { Thread } from '@/features/thread/types/thread';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
    const { threadId } = useParams();

    const { data, isLoading } = useQuery<Thread>({
        queryKey: [`threads/${threadId}`],
        queryFn: async () => {
            const response = await api.get(`/threads/${threadId}`);
            return response.data;
        },
    });

    return (
        <div className="flex flex-col gap-4">
            {isLoading ? (
                <div className="flex justify-center py-12.5">
                    <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
                </div>
            ) : (
                <>
                    {data && (
                        <>
                            <CardThreadDetail {...data} />
                            <CreateThread />
                            {data.replies?.length ? (
                                <>
                                    {data?.replies?.map((reply) => (
                                        <CardReply {...reply} />
                                    ))}
                                </>
                            ) : undefined}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
