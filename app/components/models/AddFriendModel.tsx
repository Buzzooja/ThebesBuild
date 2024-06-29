'use client';

import { SafeUser, SafeWorkout } from "@/app/types";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";
import { useCallback, useState, useMemo } from "react";
import axios from "axios";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import Model from './models';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useAddFriendModel from "@/app/hooks/useAddFriendModel";

interface AddFriendProps {
    workout?: SafeWorkout & {
        user?: SafeUser
    };
    currentUser?: SafeUser | null;
    disabled?: boolean;
    onAction?: (name: string) => void;
    actionName?: string;
}

const AddFriendModel: React.FC<AddFriendProps> = ({
    workout,
    currentUser,
    onAction,
    actionName = '',
    disabled
}) => {
    const router = useRouter();
    const addFriendModel = useAddFriendModel();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            name:''
        }
    });

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    
        if (disabled) {
          return;
        }
    
        onAction?.(actionName)
      }, [disabled, onAction, actionName]);


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        router.push(`/social/${data.name}`);
    } 
    
    const actionLabel = 'Find Friend';

    let bodyContent = (
        <div>
            <div className="flex flex-col gap-8">
        <Heading
          title="What's your friend's name?"
          subtitle="Type your friend's full name here"
        />
        <Input
            id="name"
            label="Friend's name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <hr />
      </div>
        </div>
    )

    return (
        <Model
            isOpen={addFriendModel.isOpen}
            onClose={addFriendModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={undefined}
            secondaryAction={undefined}
            title="Thebes"
            body={bodyContent}
        />
    );
}
 
export default AddFriendModel;