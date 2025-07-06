import { Button } from '@/components/ui/button';
import UserProfile from '@/features/profile/components/userProfile';
import { api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

function UserProfilePage() {
    const navigate = useNavigate();
    const { username } = useParams<{ username: string }>();
    const { data: user } = useQuery({
        queryKey: ['user-profile', username],
        queryFn: async () => {
            const res = await api.get(`/users/username/${username}`);
            return res.data.data;
        },
        enabled: !!username,
    });

    function onBack() {
        navigate('/');
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="flex gap-1 text-muted-foreground p-0"
                >
                    <ArrowLeft className="w-[27px] h-[27px]" />
                </Button>
                <h2 className="text-2xl font-semibold">
                    {user?.profile?.fullName}
                </h2>
            </div>
            <UserProfile />
        </div>
    );
}

export default UserProfilePage;
