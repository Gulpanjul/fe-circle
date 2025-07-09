import { useProfilePage } from '../hooks/useProfilePage';
import ProfilePage from './ProfilePage';
import TitlePage from './TitlePage';

function Profile() {
    const { user, isUserLoading } = useProfilePage();

    if (isUserLoading || !user) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">Loading...</p>
            </div>
        );
    }

    const { profile } = user;
    const { fullName } = profile ?? {};
    return (
        <div className="flex flex-col gap-4">
            <TitlePage title={fullName} />
            <ProfilePage />
        </div>
    );
}

export default Profile;
