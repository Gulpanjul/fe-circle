import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/libs/utils';

export default function Follows() {
    return (
        <div className="space-y-4">
            <Tabs defaultValue="followers" className="relative w-full">
                <TabsList className="w-full bg-transparent border-b-2 rounded-none">
                    <TabsTrigger
                        value="followers"
                        className={cn(
                            '!bg-transparent active:text-foreground border-0 !border-b-2',
                            'data-[state=active]:border-brand',
                            'dark:data-[state=active]:border-b-brand',
                            'rounded-none',
                        )}
                    >
                        Followers
                    </TabsTrigger>
                    <TabsTrigger
                        value="following"
                        className={cn(
                            '!bg-transparent active:text-foreground border-0 !border-b-2',
                            'data-[state=active]:border-brand',
                            'dark:data-[state=active]:border-b-brand',
                            'rounded-none',
                        )}
                    >
                        Following
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="followers">
                    <div className="text-sm text-muted-foreground">
                        No followers yet.
                    </div>
                </TabsContent>
                <TabsContent value="following">
                    <div className="text-sm text-muted-foreground">
                        You are not following anyone yet.
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
