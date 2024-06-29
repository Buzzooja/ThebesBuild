'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import LogoSmall from "./Logosmall";

interface ModelProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Model: React.FC<ModelProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModel, setShowModel] = useState(isOpen);

    useEffect(() => {
        setShowModel(isOpen);
    }, [isOpen])

    const handleClose = useCallback(() => {
        if(disabled) {
            return;
        }

        setShowModel(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if(disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="
                    justify-center
                    items-center
                    flex
                    overflow-hidden
                    overflow-y-auto
                    fixed
                    inset-0
                    z-50
                    outline-none
                    focus:outline-none
                    bg-neutral-600/50
                "
            >
                <div
                    className="
                        relative
                        w-full
                        md:w4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto
                        h-full
                        lg:h-auto
                        md:h-auto
                    "   
                >
                    {/* CONTENT */}
                    <div
                        className={`
                            translate
                            duration-300
                            h-full
                            ${showModel ? 'translate-y-0' : 'translate-y-full'}
                            ${showModel ? 'opacity-100' : 'opacity-0'}
                        `} 
                    >
                        <div
                            className="
                                translate
                                h-full
                                lg:auto
                                md:h-auto
                                border-0
                                rounded-lg
                                shadow-lg
                                relative
                                flex
                                flex-col
                                w-full
                                bg-neutral-800
                                outline-none
                                focus:outline-none
                                text-white
                            "
                        >
                            {/* HEADER */}
                            <div
                                className="
                                    flex
                                    items-center
                                    p-6
                                    rounded-t
                                    justify-center
                                    relative
                                    border-b-[1px]
                                    border-neutral-300
                                "
                            >
                                <button
                                    onClick={handleClose}
                                    className="
                                        p-1
                                        border-0
                                        hover:opacity-70
                                        transition
                                        absolute
                                        left-9
                                    "
                                >
                                    <IoMdClose size={18}/>
                                </button>
                                <LogoSmall />
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/* BODY */}
                            <div className="relative p-6 flex-auto border-b-[1px] border-neutral-300">
                                {body}
                            </div>
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                                <div
                                    className="
                                        flex
                                        flex-row
                                        items-center
                                        gap-4
                                        w-full
                                    "
                                >
                                {secondaryAction && secondaryActionLabel && (
                                    <Button 
                                        outline
                                        disabled={disabled}
                                        label={secondaryActionLabel}
                                        onClick={handleSecondaryAction}
                                    />
                                )}
                                <Button 
                                    disabled={disabled}
                                    label={actionLabel}
                                    onClick={handleSubmit}
                                />
                                </div>
                                {footer}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Model;