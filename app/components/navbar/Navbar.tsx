'use client';


import { SafeUser } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Navigation from "./Navigation";


interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    return (
        <div className="
        fixed
        w-full
        z-10
        bg-gradient-to-r 
        from-teal-600 
        to-neutral-800
        ">
            <div
                className="
                py-4
                "
            >
                <Container>
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-3
                            md:gap-0
                        "    
                    >
                        <Logo /> 
                        <Navigation currentUser={currentUser}/>
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;