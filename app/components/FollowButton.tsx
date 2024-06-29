'use client';

import { IconType } from "react-icons";
import useFollow from "../hooks/useFollow";
import { SafeUser } from "../types";

interface ButtonProps {
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,

}) => {



    return (
        <button
            disabled={disabled}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                transition
                w-full
                bg-teal-600
                border-teal-600
                text-white
                ${small ? 'py-1' : 'py-3'}
                ${small ? 'text-sm' : 'text-md'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
            `}
        >
            {label}
        </button>
    );
}

export default Button;