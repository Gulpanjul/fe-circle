// components/SidebarPostTrigger.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GiFeather } from 'react-icons/gi';
import FormStatusArea from '@/features/shared/components/FormStatusArea';

export default function FormStatusTrigger() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="ghost"
                className="group relative flex items-center justify-center w-14 h-14 bg-brand rounded-2xl"
                onClick={() => setOpen(true)}
            >
                <GiFeather />
                <span className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-muted px-2 py-1 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-1 group-hover:scale-100 transition-all duration-200 ease-out transform scale-95 translate-y-0 z-10 shadow">
                    Create Post
                </span>
            </Button>

            <FormStatusArea open={open} onOpenChange={setOpen} />
        </>
    );
}
