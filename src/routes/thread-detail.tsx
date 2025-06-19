import ThreadDetail from '@/features/thread-detail/components/thread-detail';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function ThreadDetailPage() {
    const navigate = useNavigate();

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
                <h2 className="text-2xl font-semibold">Status</h2>
            </div>
            <ThreadDetail />
        </div>
    );
}
