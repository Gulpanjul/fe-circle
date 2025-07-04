import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import type { EditProfileSchemaDTO } from '@/utils/schemas/profile-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export function useEditProfile() {
    const { user, setUser } = useAuthStore();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<EditProfileSchemaDTO>({
        fullName: user?.profile.fullName || '',
        username: user?.username || '',
        bio: user?.profile.bio || '',
    });

    const mutation = useMutation({
        mutationFn: async (data: EditProfileSchemaDTO) => {
            const formDataPayload = new FormData();
            formDataPayload.append('fullName', data.fullName);
            formDataPayload.append('username', data.username);
            formDataPayload.append('bio', data.bio);
            if (selectedFile) {
                formDataPayload.append('avatar', selectedFile);
            }

            const response = await api.patch(
                `/profile/${user?.id}`,
                formDataPayload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            return response.data;
        },
        onSuccess: (updatedUser) => {
            setUser(updatedUser);
            queryClient.invalidateQueries({
                queryKey: ['user-profile', user.id],
            });
            toast.success('Profile updated successfully');
        },
        onError: (error) => {
            const message =
                error instanceof Error ? error.message : 'An error occurred';
            toast.error(message);
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    return {
        user,
        formData,
        setFormData,
        selectedFile,
        setSelectedFile,
        handleChange,
        handleFileChange,
        mutation,
    };
}
