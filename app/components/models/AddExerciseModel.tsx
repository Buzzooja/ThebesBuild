'use client';

import { SafeUser, SafeWorkout, SafeTemplate } from "@/app/types";
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
import Counter from "../inputs/Counter";
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import useAddExerciseModel from "@/app/hooks/useAddExerciseModel";
import WeightInput from "../inputs/WeightInput";

interface AddExerciseModelProps {
    workout?: SafeWorkout & {
        user: SafeUser
    };
    template?: SafeTemplate & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    disabled?: boolean;
}

const AddExerciseModel: React.FC<AddExerciseModelProps> = ({
    workout,
    template,
    currentUser,
    disabled
}) => {
    const router = useRouter();
    const addExerciseModel = useAddExerciseModel();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            workoutId: workout?.id,
            templateId: template?.id,
            Weight: 60,
            sets: 1,
            Reps: 5,
            Rest: 120
        }
    });

    const Weight = watch('Weight');
    const sets = watch('sets');
    const Reps = watch('Reps');
    const Rest = watch('Rest');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/exercises', data)
        .then(() => {
            toast.success('Exercise Added!');
            router.refresh();
            reset();
            addExerciseModel.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setIsLoading(false);
        })
    } 
    
    const actionLabel = 'Add Exercise';

    let bodyContent = (
        <div>
            <div className="flex flex-col gap-8">
        <Heading
          title="What exercise would you like to add?"
          subtitle="What was the exercise?"
        />
        <Input
            id="name"
            label="Exercise name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <hr />
        <WeightInput 
          id="Weight"  
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          value={Weight}
          type="number"      
          title="Weight" 
          subtitle="How much weight? (Kilograms)"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('sets', value)}
          value={sets}
          title="Sets" 
          subtitle="How many Sets?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('Reps', value)}
          value={Reps}
          title="Repetitions" 
          subtitle="How many repetitions?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('Rest', value)}
          value={Rest}
          title="Rest" 
          subtitle="How many seconds for rest?"
        />
      </div>
        </div>
    )

    return (
        <Model
            isOpen={addExerciseModel.isOpen}
            onClose={addExerciseModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={undefined}
            secondaryAction={undefined}
            title="Thebes"
            body={bodyContent}
        />
    );
}
 
export default AddExerciseModel;