'use client';

import { SafeExercise, SafeFollowedUser, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Avatar from "../Avatar";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface SocialHeadProps {
    User: SafeFollowedUser;
    title: string;
}

const SocialHead: React.FC<SocialHeadProps> = ({
    User,
    title
}) => {

    const router = useRouter();

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
                    <Avatar src={User.image}/>
                    <div className="
                        flex
                        items-center
                        justify-center
                        text-neutral-300
                    ">
                        {User.name}
                    </div>
                </div>
                <Heading 
                    title={title}
                />
                <div className="
                    flex
                    items-center
                    justify-end
                    p-2
                    w-40
                ">
                    <Button 
                        label="View Profile" 
                        onClick={() => router.push(`/profile/${User.id}`)}
                    />
                </div>                   
            </div>
        </>
     );
}
 
export default SocialHead;