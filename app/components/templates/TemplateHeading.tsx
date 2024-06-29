'use client';

import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import AddTemplate from "./AddTemplate";

interface ProfileHeadingProps {
    currentUser: SafeUser;
}

const ProfileHeading: React.FC<ProfileHeadingProps> = ({
    currentUser,
}) => {
    return (
        <>
            <div className="
            rounded-lg
            bg-neutral-800
            p-2
            ">
                <div className="
                border-b-[1px]
                border-neutral-300
                ">
                    <div className="
                    flex
                    justify-center
                    p-2
                    ">
                        <div>
                            <Avatar src={currentUser.image}/>
                        </div>
                        <div className="
                        flex
                        items-center
                        justify-center
                        text-neutral-300
                        p-2
                        ">
                            {currentUser.name}
                        </div> 
                    </div>
                </div>
                <div className="
                p-2
                ">
                        <AddTemplate />
                </div>

            </div>
        </>
        
    )
}

export default ProfileHeading;