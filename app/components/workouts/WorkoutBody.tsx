'use client';

import { SafeExercises } from "@/app/types";
import Heading from "../Heading";
import { MdDeleteOutline } from "react-icons/md";
import BinIcon from "../BinIcon";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import Button from "../Button";
import UpdateExerciseModel from "../models/UpdateExerciseModel";
import useUpdateExerciseModel from "@/app/hooks/useUpdateExercise";
import ExerciseList from "../exercises/ExerciseList";

interface WorkoutBodyProps {
    exercises: SafeExercises[] | null;
    viewer?: boolean;
}

const WorkoutBody: React.FC<WorkoutBodyProps> = ({
    exercises,
    viewer = false
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const updateExerciseModel = useUpdateExerciseModel();
    const [editExercise, setEditExercise] = useState(exercises?.[0])

    const updateExercise = (highlightedExercise: SafeExercises) => {
        setEditExercise(highlightedExercise)
    }



    if(!exercises) {
        return null;
    }

    return ( 
        <>
            <table className="

            w-full
            text-neutral-300
            p-2
            rounded-lg
            text-center
            border-neutral-300
            border-b-[1px]
            ">
                <thead className="
                text-teal-600
                border-neutral-300
                border-b-[1px]
                ">
                    <tr>
                        <th> </th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Weight(kg)</th>
                        <th>Rest</th>
                        <th> </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody className="
                pb-2
                ">
                {exercises.map((exercise) => {
                    return (
                        <ExerciseList
                            key={exercise.id}
                            exercise={exercise}
                            onChange={(exercise) => setEditExercise(exercise)}
                            viewer={viewer} 
                        />
                    )
                })}
                </tbody>
            </table>
            <UpdateExerciseModel
                exercise={editExercise}
            />
                <p>

                </p>
            

        </>
     );
}
 
export default WorkoutBody;