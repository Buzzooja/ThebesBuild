'use client';

import { SafeExercise, SafeUser, SafeWorkout } from "@/app/types";
import Input from "../inputs/Input";
import useLoginModel from "@/app/hooks/useLoginModel";
import { useRouter } from "next/navigation";
import { useCallback, useState, useMemo } from "react";
import axios from "axios";
import Model from './models';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import useDeleteWorkoutModel from "@/app/hooks/useDeleteWorkoutModel";

interface DeleteWorkoutModelProps {
    workoutId: string;
    userId: string;
}

const DeleteWorkoutModel: React.FC<DeleteWorkoutModelProps> = ({
    workoutId,
    userId
}) => {
    const router = useRouter();
    const deleteWorkoutModel = useDeleteWorkoutModel();

    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = () => {
        setIsLoading(true);

        axios.delete(`/api/workouts/${workoutId}`)
        .then(() => {
            toast.success('Workout Deleted!');
            router.push(`/profile/${userId}`);
            deleteWorkoutModel.onClose();
            router.refresh;
        })
        .catch(() => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setIsLoading(false);
        })
    } 
    
    const actionLabel = 'Delete Workout';

    let bodyContent = (
        <div>
            <div className="flex flex-col gap-8">
        <Heading
          title="Delete Workout?"
          subtitle="Are you sure you would like to delete your Workout?"
        />
      </div>
        </div>
    )

    return (
        <Model
            isOpen={deleteWorkoutModel.isOpen}
            onClose={deleteWorkoutModel.onClose}
            onSubmit={(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={undefined}
            secondaryAction={undefined}
            title="Thebes"
            body={bodyContent}
        />
    );
}
 
export default DeleteWorkoutModel;