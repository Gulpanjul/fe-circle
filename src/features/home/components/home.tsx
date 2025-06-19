import CardThread from './card-thread';
import CreateThread from './create-thread';
import { postDatas } from '@/utils/fake-datas/posts';

export default function Home() {
    return (
        <div>
            <CreateThread />
            <div className="flex flex-col gap-4 mt-4">
                {postDatas.map((postData, index) => (
                    <CardThread key={index} postData={postData} />
                ))}
            </div>
        </div>
    );
}
