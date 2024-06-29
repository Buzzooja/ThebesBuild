'use client';

import { SafeUser } from "@/app/types";
import Avatar from "./Avatar";

interface ProfileHeadingProps {
    currentUser: SafeUser;
}

const ProfileHeading: React.FC<ProfileHeadingProps> = ({
    currentUser,
}) => {

    const following = currentUser.followingIDs.length;
    const followers = currentUser.followedByIDs.length;
    const since = currentUser.createdAt;

    return (
        <>
            <div className="
            rounded-lg
            bg-neutral-800
            p-2
            text-neutral-300
            ">
                <div className="
                flex
                justify-between
                border-neutral-300
                p-2
                ">
                    <div className="
                    flex
                    items-center
                    space-x-3
                    ">
                        <div>
                            <Avatar src={currentUser.image}/>
                        </div>
                        <div>
                            {currentUser.name}
                        </div>
                    </div>
                    <div className="
                    flex
                    items-center
                    space-x-4
                    text-neutral-400
                    ">
                        <div>
                            Joined: <b className="text-neutral-300">{since}</b>
                        </div>
                        <div className="
                            flex
                            flex-col
                            justify-around
                        ">
                            <div>
                                <b className="text-teal-600">{following}</b> Following
                            </div>
                            <div>
                                <b className="text-teal-600">{followers}</b> Followers
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
        
    )
}

export default ProfileHeading;