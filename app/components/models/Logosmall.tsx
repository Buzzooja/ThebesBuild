'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const LogoSmall = () => {
    const router = useRouter();

    return (
        <Image 
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height="70"
            width="70"
            src="/images/logo3.png"
        />
    )
}

export default LogoSmall;