'use client';

import { SafeExercise, SafeExercise2, SafeExercises } from "@/app/types";
import { Exercise } from "@prisma/client";
import Heading from "../Heading";

interface ExerciseTableProps {
    title: string;
    exercises: SafeExercises[];
}

const ExerciseTable: React.FC<ExerciseTableProps> = ({
    title,
    exercises
}) => {
    return (
        <>
            <table className="
            bg-neutral-800
            w-full
            text-neutral-300
            p-2
            rounded-lg
            text-center
            ">
                <thead className="
                text-teal-600
                border-b-[1px]
                border-neutral-300
                ">
                    <tr>
                        <th> </th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Weight(kg)</th>
                        <th>Rest</th>
                    </tr>
                </thead>
                <tbody>
                {exercises.map((exercise) => {
                    return (
                        <tr key={exercise.id} className="even:bg-neutral-700">
                        <td>{exercise.name}</td>
                        <td>{exercise.sets}</td>
                        <td>{exercise.Reps}</td>
                        <td>{exercise.Weight}</td>
                        <td>{exercise.Rest}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default ExerciseTable;