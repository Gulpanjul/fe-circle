import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/api';
import type { Thread } from '@/features/thread/types/thread';

export function usePostDetail(threadId: string | undefined) {
    return useQuery<Thread>({
        queryKey: [`threads/${threadId}`],
        queryFn: async () => {
            const response = await api.get(`/threads/${threadId}`);
            return response.data.data;
        },
        enabled: !!threadId,
    });
}
