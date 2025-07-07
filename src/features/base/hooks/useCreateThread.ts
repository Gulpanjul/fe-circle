import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/libs/api';
import { isAxiosError } from 'axios';
import type { ThreadResponse } from '@/features/thread/dto/thread';
import type { createThreadSchemaDTO } from '@/utils/schemas/thread-schema';

type Props = {
    reset: () => void;
    setPreviewUrl: (url: string | null) => void;
};

function useCreateThread({ reset, setPreviewUrl }: Props) {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<
        ThreadResponse,
        Error,
        createThreadSchemaDTO
    >({
        mutationKey: ['create-thread'],
        mutationFn: async (data: createThreadSchemaDTO) => {
            const formData = new FormData();
            formData.append('content', data.content);
            formData.append('images', data.images[0]);

            const response = await api.post<ThreadResponse>(
                '/threads',
                formData,
            );
            return response.data;
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }
            toast.error('Something went wrong!');
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['threads'] });
            toast.success(data.message);
            reset();
            setPreviewUrl(null); // bersihkan preview setelah sukses
        },
    });

    function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }

    return {
        isPending,
        mutateAsync,
        handlePreview,
    };
}
export default useCreateThread;
