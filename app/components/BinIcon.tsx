'use client';

import { IconType } from "react-icons";

interface BinIconProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick?: () => void;
}

const BinIcon: React.FC<BinIconProps> = ({
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
        flex
        justify-end
        pr-1
        "
        >
            <Icon size={40}/>
        </div>
     );
}
 
export default BinIcon;