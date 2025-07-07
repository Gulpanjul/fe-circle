import CardThread from '@/features/home/components/cardThread';
import type { Thread } from '@/features/thread/types/thread';

export default function ItemPost(props: Thread) {
    return <CardThread {...props} />;
}
