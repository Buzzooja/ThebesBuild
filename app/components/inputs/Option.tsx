'use client';

import React from 'react';

interface OptionProps {
    label: string;
    selected?: boolean;
    value: string;
    onClick: (value: string) => void;
}

const Option: React.FC<OptionProps> = ({
    label,
    selected,
    value,
    onClick
}) => {
    return (
        <div 
        onClick={() => onClick(value)}
        className={`
            relative 
            bg-teal-600
            rounded-lg
            transition
            border-2
            p-2
            w-40
            text-center
            hover:border-neutral-300
            cursor-pointer
            ${selected ? 'border-neutral-300' : 'border-teal-600'}
            `}>
                {label}
        </div>
    );
}
 
export default Option;