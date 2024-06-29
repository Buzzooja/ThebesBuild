'use client';

import Container from "../components/Container";
import ProfileCard from "../components/social/ProfileHead";
import { SafeUser } from "../types";

interface ProfileClientProps {
    user: SafeUser;
    currentUser: SafeUser;
}

const ProfileClient: React.FC<ProfileClientProps> = ({
    user,
    currentUser,
}) => {
    return (
        <Container>

                    <ProfileCard
                    user={user}
                    currentUser={currentUser}
                    />
        </Container>
    );
}

export default ProfileClient;