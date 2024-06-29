'use client';

import { SafeFollowedUser, SafeUser } from "@/app/types";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Button from "../Button";
import WorkoutHead from "../workouts/WorkoutHead";
import SocialHead from "./SocialHead";


interface FriendBodyProps {
    user: SafeFollowedUser;
    date: string;
    disabled?: boolean;
}

const FriendBody: React.FC<FriendBodyProps> = ({
    user,
    date,
    disabled,
}) => {

    const router = useRouter();

    return ( 
        <>  
        <div
        className="
        rounded-lg
        bg-neutral-800
        p-2
        ">
            <SocialHead
              User={user}
              title=""
            />
        </div>
        </>
     );
}
 
export default FriendBody;