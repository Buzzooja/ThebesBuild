'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Avatar from "../Avatar";
import AddWorkout from "../workouts/AddWorkout";

interface ProfileHeadingProps {
    currentUser: SafeUser;
    workoutCount: number;
}

const ProfileHeading: React.FC<ProfileHeadingProps> = ({
    currentUser,
    workoutCount
}) => {
    return (
        <>
            <div className="
            bg-neutral-800
            rounded-lg
            p-2
            ">
                <div className="
                flex
                justify-between
                border-b-[1px]
                border-neutreal-300
                ">
                    <div className="flex justify-between p-2">
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
                    <div className="
                    flex
                    items-center
                    justify-center
                    text-neutral-300
                    p-2
                    space-x-2
                    ">
                        <div>
                            <b className="text-teal-600 text-2xl">{workoutCount}</b> Workouts last 30 days
                        </div>
                    </div>
                </div>
                <div className="
                p-2
                ">
                        <AddWorkout />
                </div>

            </div>
        </>
        
    )
}

export default ProfileHeading;