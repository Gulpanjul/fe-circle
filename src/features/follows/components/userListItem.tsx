import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import type { UserListItemProps } from '../types/UserListItemProps';
import { Button } from '@/components/ui/button';

export const UserListItem: React.FC<UserListItemProps> = ({
    id,
    fullName,
    username,
    avatarUrl,
    bio,
    isFollowed,
    onToggleFollow,
}) => (
    <li key={id}>
        <div className="flex gap-4 py-4 items-center justify-between">
            <div className="flex gap-4">
                <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src={avatarUrl || ''} alt={fullName || ''} />
                    <AvatarFallback>
                        {fullName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1">
                    <div className="gap-1 text-sm">
                        <p className="font-bold">{fullName}</p>
                        <p className="text-muted-foreground">@{username}</p>
                        <p>{bio}</p>
                    </div>
                </div>
            </div>
            <Button
                onClick={onToggleFollow}
                className="px-3 py-1 text-sm border rounded-md text-muted-foreground hover:bg-accent"
            >
                {isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
        </div>
    </li>
);
