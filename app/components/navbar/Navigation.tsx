'use client';


import { SafeUser } from "@/app/types";
import Link from "../Link";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import { GiAbstract007 } from "react-icons/gi";
import { useRouter } from "next/navigation";

interface NavigationProps {
    currentUser?: SafeUser | null
}

const Navigation: React.FC<NavigationProps> = ({
    currentUser
}) => {

    const router= useRouter();

    return ( 
        <div>
        {currentUser ? (
                <>
                    <div
                    className="
                    flex
                    flex-row
                    space-x-4
                    "
                    >
                        <Link 
                            icon= {BsFillHouseDoorFill}
                            label= "Home"
                            onClick={() => router.push(`/`)}
                        />
                        <Link 
                            icon= {CgGym}
                            label= "Workouts"
                            onClick={() => router.push(`/profile/${currentUser.id}`)}
                        />
                        <Link
                            icon={GiAbstract007}
                            label="Challenges"
                        />
                        <Link 
                            icon= {BsFillPeopleFill}
                            label= "Social"
                            onClick={() => router.push(`/social/`)}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div></div>
                </>
        )}
        </div>
     );
}
 
export default Navigation;