'use client';

import { IconType } from "react-icons";

interface LinkProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    return ( 
        <div
        onClick={onClick}
        className="
        cursor-pointer
        text-teal-600
        px-4
        border-neutral-800
        border-b-2
        hover:border-b-2
        hover:border-teal-600
        "
        >
            <Icon size={50}/>
        </div>
     );
}
 
export default Link;