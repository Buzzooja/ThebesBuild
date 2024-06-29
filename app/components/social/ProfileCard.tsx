'use client';

import { SafeUser } from "@/app/types";
import ProfileHead from "./ProfileHead";
import Container from "../Container";

interface ProfileCardProps {
    user: SafeUser;
    currentUser: SafeUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    user,
    currentUser
}) => {
    
    return (
        <div className="
            space-y-2
            ">
            <ProfileHead
                user={user}
                currentUser={currentUser}
            />
        </div>
    );
}

export default ProfileCard;