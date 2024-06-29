'use client';

import { SafeExercise, SafeUser, SafeWorkout } from "@/app/types";
import Input from "../inputs/Input";
import useLoginModel from "@/app/hooks/useLoginModel";
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
import useAddTemplateModel from "@/app/hooks/useAddTemplateModel";

interface AddTemplateModelProps {
    exercises?: SafeExercise[] | null;
    currentUser: SafeUser | null;
    disabled?: boolean;
}

const AddTemplateModel: React.FC<AddTemplateModelProps> = ({
    exercises = [],
    currentUser,
    disabled
}) => {
    const router = useRouter();
    const addTemplateModel = useAddTemplateModel();

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
            name: "",
            exercises: exercises?.map(
                (exercise) => {
                    return (
                        {
                            userId: exercise.userId,
                            name: exercise.name,
                            Weight: exercise.Weight,
                            sets: exercise.sets,
                            Reps: exercise.Reps,
                            Rest: exercise.Rest
                        }
                    )
                }
            )
        }
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/templates', data)
        .then(() => {
            toast.success('Template Created!');
            router.refresh();
            reset();
            addTemplateModel.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setIsLoading(false);
        })
    } 
    
    const actionLabel = 'Add Template';

    let bodyContent = (
        <div>
            <div className="flex flex-col gap-8">
        <Heading
          title="Save as Template?"
          subtitle="What would you like to name your template?"
        />
        <Input
            id="name"
            label="Template name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
      </div>
        </div>
    )

    return (
        <Model
            isOpen={addTemplateModel.isOpen}
            onClose={addTemplateModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={undefined}
            secondaryAction={undefined}
            title="Thebes"
            body={bodyContent}
        />
    );
}
 
export default AddTemplateModel;