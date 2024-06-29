'use client';

import axios from "axios";
import { Toast } from "react-hot-toast";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import WorkoutHead from "@/app/components/workouts/WorkoutHead";
import WorkoutBody from "@/app/components/workouts/WorkoutBody";
import useLoginModel from "@/app/hooks/useLoginModel";
import { SafeUser, SafeWorkout, SafeExercise, SafeTemplate } from "@/app/types";
import { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import WorkoutAddExercise from "@/app/components/workouts/WorkoutAddExercise";
import useAddExerciseModel from "@/app/hooks/useAddExerciseModel";
import AddExerciseModel from "@/app/components/models/AddExerciseModel";
import EmptyState from "@/app/components/EmptyState";
import useAddTemplateModel from "@/app/hooks/useAddTemplateModel";
import AddTemplateModel from "@/app/components/models/AddTemplateModel";
import GetTemplatesModel from "@/app/components/models/GetTemplateModel";
import useGetTemplatesModel from "@/app/hooks/useGetTemplatesModel";
import useDeleteTemplateModel from "../hooks/useDeleteTemplateModel";
import DeleteTemplateModel from "../components/models/DeleteTemplateModel";


interface WorkoutClientProps {
    template: SafeTemplate & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    exercises?: SafeExercise[] | null;
}

const WorkoutClient: React.FC<WorkoutClientProps> = ({
    template,
    exercises = [],
    currentUser,
}) => {
    const loginModel = useLoginModel();
    const addExerciseModel = useAddExerciseModel();
    const deleteTemplateModel = useDeleteTemplateModel();
    const addTemplateModel = useAddTemplateModel();
    const getTemplatesModel = useGetTemplatesModel();
    const router = useRouter();

    const date = template.createdAt;
    

    if(!currentUser) {
        return (
            <EmptyState/>
        )
    }

    if(exercises?.length===0) {
        return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <WorkoutHead
                        title={template.name}
                        date={date}
                        id={template.id}
                        currentUser={currentUser}
                    />
                </div>
                <div className="flex flex-col"> 
                    <div></div>
                </div>
                <AddExerciseModel
                    template={template} 
                    currentUser={currentUser}
                />
                <DeleteTemplateModel
                    templateId={template.id}
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
                    label="Delete Template"
                    onClick={deleteTemplateModel.onOpen}
                    />
                </div>
            </div>
        </Container>
        );
    }
    
    return ( 
        <Container>
            <div className="
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
                rounded-lg
                bg-neutral-800
                ">
                    <div className="p-2 flex flex-col gap-6">
                        <WorkoutHead
                        title={template.name}
                        date={date}
                        id={template.id}
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
                        template={template} 
                        currentUser={currentUser}
                    />
                    <DeleteTemplateModel
                    templateId={template.id}
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
                        label="Delete Template"
                        onClick={deleteTemplateModel.onOpen}
                        />
                    </div>
                </div>
            </div>
        </Container>
     );
}
 
export default WorkoutClient;