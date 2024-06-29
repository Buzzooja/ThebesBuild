'use client';

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import WorkoutHead from "@/app/components/workouts/WorkoutHead";
import WorkoutBody from "@/app/components/workouts/WorkoutBody";
import useLoginModel from "@/app/hooks/useLoginModel";
import { SafeUser, SafeWorkout, SafeExercise, SafeTemplate } from "@/app/types";
import { useRouter } from "next/navigation";
import useAddExerciseModel from "@/app/hooks/useAddExerciseModel";
import AddExerciseModel from "@/app/components/models/AddExerciseModel";
import EmptyState from "@/app/components/EmptyState";
import useAddTemplateModel from "@/app/hooks/useAddTemplateModel";
import AddTemplateModel from "@/app/components/models/AddTemplateModel";
import GetTemplatesModel from "@/app/components/models/GetTemplateModel";
import useGetTemplatesModel from "@/app/hooks/useGetTemplatesModel";
import useDeleteWorkoutModel from "@/app/hooks/useDeleteWorkoutModel";
import DeleteWorkoutModel from "@/app/components/models/DeleteWorkoutModel";

interface WorkoutClientProps {
    exercises?: SafeExercise[] | null;
    workout: SafeWorkout & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    templates?: SafeTemplate[] | null,
}

const WorkoutClient: React.FC<WorkoutClientProps> = ({
    workout,
    exercises = [],
    currentUser,
    templates = [],
}) => {
    const loginModel = useLoginModel();
    const addExerciseModel = useAddExerciseModel();
    const addTemplateModel = useAddTemplateModel();
    const getTemplatesModel = useGetTemplatesModel();
    const deleteWorkoutModel = useDeleteWorkoutModel();
    const router = useRouter();

    const date = new Date(workout.date).toLocaleDateString("en-GB");

    

    if(!currentUser) {
        return (
            <EmptyState/>
        )
    }

    if(exercises?.length===0) {
        return (
        <Container>
             <GetTemplatesModel
                templates={templates}
                workoutId={workout.id}
            />
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <WorkoutHead
                        title={workout.title}
                        date={date}
                        id={workout.id}
                        currentUser={currentUser}
                    />
                </div>
                <div className="flex flex-col"> 
                    <div></div>
                </div>
                <AddExerciseModel
                    workout={workout} 
                    currentUser={currentUser}
                />
                <DeleteWorkoutModel
                    workoutId={workout.id}
                    userId={currentUser.id}
                />
                <div className="flex">
                    <Button
                    label="Add Exercise"
                    onClick={addExerciseModel.onOpen}
                    />
                    <Button 
                    label="Delete Workout"
                    onClick={deleteWorkoutModel.onOpen}
                    /> 
                </div>
            </div>
        </Container>
        );
    }
    
    return ( 
        <Container>
            <div className="
            pt-6
            ">
                <AddTemplateModel
                    exercises={exercises}
                    currentUser={currentUser}
                />
                <div className="
                w-full
                lg:w-5/6
                xl:w-3/4
                mx-auto 
                bg-neutral-800
                rounded-lg
                border-neutral-300
                ">
                    <div className="p-2 flex flex-col gap-6">
                        <WorkoutHead
                        title={workout.title}
                        date={date}
                        id={workout.id}
                        currentUser={currentUser}
                        />
                    </div>
                    <div className="
                    flex
                    flex-col
                    p-2
                    ">
                        <WorkoutBody 
                            exercises={exercises}
                        />
                    </div>
                    <AddExerciseModel
                        workout={workout} 
                        currentUser={currentUser}
                    />
                    <DeleteWorkoutModel
                        workoutId={workout.id}
                        userId={currentUser.id}
                    />
                    <div className="
                    flex
                    space-x-1
                    p-2
                    ">
                        <Button 
                        label="Add Exercise"
                        onClick={addExerciseModel.onOpen}
                        /> 
                        <Button 
                        label="Delete Workout"
                        onClick={deleteWorkoutModel.onOpen}
                        />
                        <Button 
                        label="Save as Template"
                        onClick={addTemplateModel.onOpen}
                        />
                    </div>
                </div>
            </div>
        </Container>
     );
}
 
export default WorkoutClient;