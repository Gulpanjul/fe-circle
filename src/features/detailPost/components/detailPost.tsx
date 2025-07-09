import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { usePostDetail } from '../hooks';

import TitlePage from './titlePage';
import ItemPostDetail from './itemPostDetail';
import FormStatusArea from './formStatusArea';
import ItemPost from './itemPost';

export default function PostDetail() {
    const { threadId } = useParams();
    const { data, isLoading } = usePostDetail(threadId);

    return (
        <div className="flex flex-col">
            {isLoading ? (
                <div className="flex justify-center py-12.5">
                    <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
                </div>
            ) : (
                data && (
                    <>
                        <TitlePage title="status" />
                        <ItemPostDetail thread={data} />
                        <FormStatusArea />
                        {Array.isArray(data.replies) &&
                            data.replies.length > 0 && (
                                <>
                                    {data.replies.map((reply) => (
                                        <ItemPost {...reply} key={reply.id} />
                                    ))}
                                </>
                            )}
                    </>
                )
            )}
        </div>
    );
}
