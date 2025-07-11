import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TitlePageProps {
    title: string;
}

function TitlePage({ title }: TitlePageProps) {
    const navigate = useNavigate();

    function onBack() {
        navigate('/');
    }

    return (
        <div className="flex items-center gap-2 px-4">
            <Button
                onClick={onBack}
                variant="ghost"
                className="flex gap-1 text-muted-foreground p-0"
            >
                <ArrowLeft className="w-[27px] h-[27px]" />
            </Button>
            <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
    );
}

export default TitlePage;
