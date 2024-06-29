'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface WeightInputProps {
    id: string;
    title: string;
    subtitle: string;
    value: number;
    type: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
  }

const WeightInput: React.FC<WeightInputProps> = ({
    id,
    title,
    subtitle,
    value,
    type,
    disabled,
    required,
    register,
    errors
}) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">{title}</div>
                <div className="font-light text-neutral-300">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <input 
                id={id}
                disabled={disabled}
                {...register(id, {required})}
                type={type}
                value={value}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    font-light
                    bg-neutral-300
                    text-black
                    text-center
                    border-2
                    rounded-md
                    outline-none
                    transition
                    ${errors[id] ? 'border-teal-600' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-black' : 'focus:border-teal-600'}
                    focus:border-teal-600
                    margin-0
                `}
                />
            </div>
        </div>
    )
}

export default WeightInput;