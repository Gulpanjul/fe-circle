import { Button } from '@/components/ui/button';
import Profile from '@/features/profile/components/profile';
import { useAuthStore } from '@/stores/auth';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const navigate = useNavigate();
    const {
        profile: { fullName },
    } = useAuthStore((state) => state.user);

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
                <h2 className="text-2xl font-semibold">✨{fullName}✨</h2>
            </div>
            <Profile />
        </div>
    );
}
