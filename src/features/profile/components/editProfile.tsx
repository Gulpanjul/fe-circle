import { useRef, useState } from 'react';
import { useEditProfile } from '../hooks/useEditProfile';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema } from '@/utils/schemas/profile-schema';
import { useForm } from 'react-hook-form';

export default function EditProfile() {
    const {
        user,
        formData,
        setFormData,
        selectedFile,
        handleFileChange,
        mutation,
    } = useEditProfile();

    const [open, setOpen] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: formData,
    });

    const onClickFile = () => inputFileRef.current?.click();

    const onSubmit = (values: typeof formData) => {
        setFormData(values);
        mutation.mutate(values);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="rounded-full h-8 text-xs hover:bg-muted transition-all"
                >
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative w-24 h-24 mx-auto">
                        <Avatar className="w-24 h-24 border-4 border-background">
                            <AvatarImage
                                src={
                                    selectedFile
                                        ? URL.createObjectURL(selectedFile)
                                        : user.profile.avatarUrl ||
                                          `https://api.dicebear.com/9.x/micah/svg?seed=${user.profile.fullName}`
                                }
                                alt="avatar"
                            />
                            <AvatarFallback>
                                {user.profile.fullName
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute -bottom-2 -right-2 rounded-full bg-muted"
                            onClick={onClickFile}
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Input
                            ref={inputFileRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <Input {...register('fullName')} placeholder="Full Name" />
                    {errors.fullName && (
                        <p className="text-sm text-destructive">
                            {errors.fullName.message}
                        </p>
                    )}
                    <Input {...register('username')} placeholder="Username" />
                    {errors.username && (
                        <p className="text-sm text-destructive">
                            {errors.username.message}
                        </p>
                    )}
                    <Textarea {...register('bio')} placeholder="Bio" rows={3} />
                    {errors.bio && (
                        <p className="text-sm text-destructive">
                            {errors.bio.message}
                        </p>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
