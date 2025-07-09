// components/SidebarPostTrigger.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FormStatusArea from '@/features/shared/components/FormStatusArea';

export default function FormStatusTrigger() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="ghost"
                className="hover:bg-muted rounded-full w-full bg-brand text-md"
                onClick={() => setOpen(true)}
            >
                Create Post
            </Button>

            <FormStatusArea open={open} onOpenChange={setOpen} />
        </>
    );
}
