'use client';

import AddFriendModel from "../components/models/AddFriendModel";
import useAddFriendModel from "../hooks/useAddFriendModel";
import Button from "../components/Button";
import { SafeFollowedUser } from "../types";
import FriendBody from "../components/social/friendBody";
import Heading from "../components/Heading";

interface SocialClientProps {
    Users: SafeFollowedUser[]
}

const SocialClient: React.FC<SocialClientProps> = ({
    Users
}) => {

    const addFriendModel = useAddFriendModel();
    return (   
        <div
            className={`
                justify-center
                items-center
                flex
                overflow-hidden
                overflow-y-auto
            `}>
            <AddFriendModel/>
                <div className="
                    flex
                    flex-col
                    justify-center
                    w-full 
                    md:w-4/6 
                    lg:w-3/6 
                    xl:w-2/5
                ">
                    <div className="
                        flex
                        flex-col
                        items-center
                        text-neutral-300
                        p-2
                    ">
                        <div className="
                        justify-center
                        ">
                            <Heading
                               title="Search for Friends here" 
                            />
                        </div>
                        <div className="
                        w-40
                        ">
                            <Button 
                                label="Add Friend"
                                onClick={addFriendModel.onOpen}
                            />
                        </div>
                    </div>

                {Users?.map((user) => {
                    return (
                    <FriendBody
                        date=""
                        user={user}
                        key={user.name}
                    />
                    )
                })}
                </div>
            </div>
    );
}

export default SocialClient;