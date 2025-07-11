import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SuggestedFollowing from '@/features/follows/components/SuggestedFollowing';
import { useSuggestedUsers } from '@/features/follows/hooks/useSuggestedUsers';

function SuggestionsPeople() {
    const { data, isLoading } = useSuggestedUsers();
    const suggestedUsers = data ?? [];

    return (
        <Card className="bg-secondary">
            <CardHeader>
                <CardTitle className="text-2xl">Suggested for you</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    {isLoading ? (
                        <p className="text-muted-foreground text-sm">
                            Loading suggestions...
                        </p>
                    ) : suggestedUsers.length === 0 ? (
                        <p className="text-muted-foreground text-sm">
                            No suggestions yet.
                        </p>
                    ) : (
                        suggestedUsers.map((user) => (
                            <SuggestedFollowing
                                key={user.id}
                                user={user}
                                goToProfile={(username) => {
                                    window.location.href = `/@${username}`;
                                }}
                            />
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default SuggestionsPeople;
