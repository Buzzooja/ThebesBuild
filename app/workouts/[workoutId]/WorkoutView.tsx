'use client';

import axios from "axios";
import { Toast } from "react-hot-toast";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import WorkoutHead from "@/app/components/workouts/WorkoutHead";
import WorkoutBody from "@/app/components/workouts/WorkoutBody";
import useLoginModel from "@/app/hooks/useLoginModel";
import { SafeUser, SafeWorkout, SafeExercise } from "@/app/types";
import { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import WorkoutAddExercise from "@/app/components/workouts/WorkoutAddExercise";
import useAddExerciseModel from "@/app/hooks/useAddExerciseModel";
import AddExerciseModel from "@/app/components/models/AddExerciseModel";
import EmptyState from "@/app/components/EmptyState";

interface WorkoutViewProps {
    exercises?: SafeExercise[] | null;
    workout: SafeWorkout & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const WorkoutView: React.FC<WorkoutViewProps> = ({
    workout,
    exercises = [],
    currentUser
}) => {
    const loginModel = useLoginModel();
    const addExerciseModel = useAddExerciseModel();
    const router = useRouter();

    const date = workout.date.toLocaleDateString();

    if(!currentUser) {
        return (
            <EmptyState/>
        )
    }
    
    return ( 
        <Container>
            <div className="
            pt-6
            ">
                <div className="
                w-full
                lg:w-5/6
                xl:w-3/4
                mx-auto 
                rounded-lg
                bg-neutral-800
                ">
                    <div className="p-2 flex flex-col gap-6">
                        <WorkoutHead
                        title={workout.title}
                        date={date}
                        id={workout.id}
                        currentUser={workout.user}
                        />
                    </div>
                    <div className="
                    flex
                    flex-col
                    p-2
                    ">
                        <WorkoutBody 
                            exercises={exercises}
                            viewer={true}
                        />
                    </div>
                    <div className="
                    flex
                    space-x-1
                    p-2
                    ">
                    </div>
                </div>
            </div>
        </Container>
     );
}
 
export default WorkoutView;