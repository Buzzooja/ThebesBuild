'use client';

import { SafeExercises } from "@/app/types";
import Button from "../Button";
import useUpdateExerciseModel from "@/app/hooks/useUpdateExercise";
import BinIcon from "../BinIcon";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { MdModeEdit } from "react-icons/md";

interface ExerciseListProps {
    exercise: SafeExercises;
    onChange: (exercise: SafeExercises) => void;
    viewer?: boolean;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
    exercise,
    onChange,
    viewer = false
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [editExercise, setEditExercise] = useState<SafeExercises | null>(null);


    const updateExerciseModel = useUpdateExerciseModel();

    if(viewer === true) {
        return(
            <>
                <tr className="even:bg-neutral-700">
                    <td>{exercise.name}</td>
                    <td>{exercise.sets}</td>
                    <td>{exercise.Reps}</td>
                    <td>{exercise.Weight}</td>
                    <td>{exercise.Rest}</td>
                </tr>
            </>
        )
    }
    return (
        <>
            <tr className="even:bg-neutral-700">
                <td>{exercise.name}</td>
                <td>{exercise.sets}</td>
                <td>{exercise.Reps}</td>
                <td>{exercise.Weight}</td>
                <td>{exercise.Rest}</td>
                <td>                           
                            
                </td>
                <td className="flex justify-end">
                    <BinIcon
                        icon={MdModeEdit}
                        label="edit"
                        onClick={() => {
                            onChange(exercise),
                            updateExerciseModel.onOpen()
                        }}
                    />  
                    <BinIcon 
                        icon={MdDeleteOutline}
                        label="delete"
                        onClick={() => {
                            setIsLoading(true);

                            axios.delete(`/api/exercises/${exercise.id}`)
                            .then(() => {
                                toast.success('Exercise Deleted!')
                                router.refresh();
                            })
                            .catch(() => {
                                toast.error('Something went wrong.')
                            }).finally(() => {
                                setIsLoading(false);
                            })
                        }}
                    />
                </td>
            </tr>
        </>
    )
}

export default ExerciseList;