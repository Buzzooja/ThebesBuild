'use client';

import {  SafeExercises } from "@/app/types";
import Input from "../inputs/Input";
import useLoginModel from "@/app/hooks/useLoginModel";
import { useRouter } from "next/navigation";
import { useCallback, useState, useMemo, useEffect } from "react";
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
import WeightInput from "../inputs/WeightInput";
import useUpdateExerciseModel from "@/app/hooks/useUpdateExercise";

interface UpdateExerciseModelProps {
    exercise?: SafeExercises;
}

const UpdateExerciseModel: React.FC<UpdateExerciseModelProps> = ({
    exercise
}) => {
    const router = useRouter();
    const updateExerciseModel = useUpdateExerciseModel();

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
            name: exercise?.name,
            Weight: exercise?.Weight,
            sets: exercise?.sets,
            Reps: exercise?.Reps,
            Rest: exercise?.Rest
        }
    });

    useEffect(() => {
        setCustomValue('name', exercise?.name)
        setCustomValue('Weight', exercise?.Weight)
        setCustomValue('sets', exercise?.sets)
        setCustomValue('Reps', exercise?.Reps)
        setCustomValue('Rest', exercise?.Rest)
    }, [exercise])


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

        axios.post(`/api/exercises/${exercise?.id}`, data)
        .then(() => {
            toast.success('Exercise Updated!');
            router.refresh();
            reset();
            updateExerciseModel.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setIsLoading(false);
        })
    } 
    
    const actionLabel = 'Update Exercise';

    let bodyContent = (
        <div>
            <div className="flex flex-col gap-8">
        <Heading
          title="What would you like to change?"
          subtitle="Change aspects about your exercise below"
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
          value={Weight}
          type="number"
          required      
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
            isOpen={updateExerciseModel.isOpen}
            onClose={updateExerciseModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={undefined}
            secondaryAction={undefined}
            title="Thebes"
            body={bodyContent}
        />
    );
}
 
export default UpdateExerciseModel;