import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Follows() {
    return (
        <div className="space-y-4">
            <Tabs defaultValue="followers" className="relative w-full">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger
                        value="followers"
                        className="flex justify-center"
                    >
                        Followers
                    </TabsTrigger>
                    <TabsTrigger
                        value="following"
                        className="flex justify-center"
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
