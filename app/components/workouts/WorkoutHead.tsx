'use client';

import { SafeExercise, SafeFollowedUser, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Avatar from "../Avatar";
import Logo from "../navbar/Logo";
import LogoSmall from "../models/Logosmall";

interface WorkoutHeadProps {
    id: string;
    date: string;
    currentUser: SafeFollowedUser;
    title: string;
    solo?: boolean
}

const WorkoutHead: React.FC<WorkoutHeadProps> = ({
    id,
    date,
    currentUser,
    title,
    solo
}) => {

    if (solo === true) {
        return (
            <>
                <div className="
                p-2
                flex
                justify-between
                items-center
                ">
                    <div className="
                    flex
                    space-x-2
                    p-2
                    ">
                        <LogoSmall />
                    </div>
                    <Heading 
                        title={title}
                    />
                    <div className="
                        flex
                        items-center
                        justify-end
                        text-neutral-300
                        p-2
                    ">
                        {date}
                    </div>                   
                </div>
            </>
        )
    }

    return ( 
        <>
            <div className="
            p-2
            flex
            justify-between
            items-center
            ">
                <div className="
                flex
                space-x-2
                p-2
                ">
                    <Avatar src={currentUser.image}/>
                    <div className="
                        flex
                        items-center
                        justify-center
                        text-neutral-300
                    ">
                        {currentUser.name}
                    </div>
                </div>
                <Heading 
                    title={title}
                />
                <div className="
                    flex
                    items-center
                    justify-end
                    text-neutral-300
                    p-2
                ">
                    {date}
                </div>                   
            </div>
        </>
     );
}
 
export default WorkoutHead;