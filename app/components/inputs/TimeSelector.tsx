'use client';

import React from 'react';

interface OptionTODProps {
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const OptionTOD: React.FC<OptionTODProps> = ({
    label,
    selected,
    onClick
}) => {
    return (
        <div 
        onClick={() => onClick(label)}
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
 
export default OptionTOD;