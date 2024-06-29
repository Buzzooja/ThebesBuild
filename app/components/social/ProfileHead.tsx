'use client';

import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import FollowButton from "../FollowButton";
import useFollow from "@/app/hooks/useFollow";
import useFollowing from "@/app/hooks/useFollowing";

interface ProfileHeadProps {
    user: SafeUser;
    currentUser: SafeUser;
}

const ProfileCard: React.FC<ProfileHeadProps> = ({
    user,
    currentUser
}) => {
    const date = user.createdAt;

    const userId = user.id;
    const currentUserId = currentUser.id;

    const { hasFollowed, toggleFollow} = useFollow({
        userId,
        currentUser
    })

    const { isFollowing, toggleFollower} = useFollowing({
        currentUser,
        user,
        currentUserId,
        userId
    })
    
    return (
        <>
        <div className="
        bg-neutral-800
        p-2
        text-neutral-300
        rounded-lg
        ">
            <div className="
            flex
            justify-between
            items-center
            ">
                <div className="
                flex
                space-x-2
                p-2
                ">
                    <Avatar src={user.image}/>
                    <div className="
                        flex
                        items-center
                        justify-center
                        text-neutral-300
                    ">
                        {user.name}
                    </div>
                </div>
                <div className="
                    flex
                    items-center
                    justify-end
                    p-2
                    text-neutral-400
                    ">
                        Joined <b className="text-neutral-300 p-1">{date}</b>
                
                    <div className="w-36 p-2" onClick={toggleFollow}>
                        <FollowButton 
                            label = {hasFollowed? 'Following' : 'Follow'}
                        />    
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ProfileCard;