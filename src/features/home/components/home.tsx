import CardThread from './card-thread';
import CreateThread from './create-thread';
import { type Thread } from '../types/posts';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [threads, setThreads] = useState<Thread[]>([]);

    async function getThreads() {
        const response = await axios.get('https://localhost:3000/threads');
        setThreads(response.data as Thread[]);
    }

    useEffect(() => {
        getThreads();
    }, []);
    return (
        <div>
            <CreateThread />
            <div className="flex flex-col gap-4 mt-4">
                {threads?.map((thread) => (
                    <CardThread threadData={thread} key={thread.id} />
                ))}
            </div>
        </div>
    );
}
