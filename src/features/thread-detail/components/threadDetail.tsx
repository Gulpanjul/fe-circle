import CardReply from '@/features/home/components/cardReply';
import CardThreadDetail from '@/features/home/components/cardThreadDetail';
import CreateReply from '@/features/home/components/createReply';
import type { Thread } from '@/features/thread/types/thread';
import { api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
    const { threadId } = useParams();

    const { data, isLoading } = useQuery<Thread>({
        queryKey: [`threads/${threadId}`],
        queryFn: async () => {
            const response = await api.get(`/threads/${threadId}`);
            return response.data.data;
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
                            <CardThreadDetail thread={data} />
                            <CreateReply />
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
