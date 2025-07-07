import { UserSearch } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchInput({ onChange }: Props) {
    return (
        <div className="relative w-full mb-6">
            <UserSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
                placeholder="Username"
                className="pl-10 rounded-xl focus-visible:ring-brand size-2xl"
                onChange={onChange}
            />
        </div>
    );
}

export default SearchInput;
