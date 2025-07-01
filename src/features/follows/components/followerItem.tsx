import React from 'react';

interface FollowerItemProps {
    id: string;
    fullName: string;
    username: string;
    avatarUrl?: string;
}

export const FollowerItem: React.FC<FollowerItemProps> = ({
    id,
    fullName,
    username,
    avatarUrl,
}) => (
    <li key={id} className="flex items-center gap-3">
        <img
            src={avatarUrl || '/default-avatar.png'}
            alt={fullName}
            className="w-10 h-10 rounded-full object-cover"
        />
        <div>
            <p className="font-semibold">{fullName}</p>
            <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
    </li>
);
