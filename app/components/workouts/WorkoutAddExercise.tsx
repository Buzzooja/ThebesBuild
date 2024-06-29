'use client';

import { SafeUser, SafeWorkout } from "@/app/types";
import Input from "../inputs/Input";
import useLoginModel from "@/app/hooks/useLoginModel";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";

interface WorkoutAddExerciseProps {
    workout: SafeWorkout & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    onSubmit: () => void;
    disabled?: boolean;
}

const WorkoutAddExercise: React.FC<WorkoutAddExerciseProps> = ({
    workout,
    currentUser,
    onSubmit,
    disabled
}) => {
    const loginModel = useLoginModel();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onCreateExercise = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/exercises'), {
            
        }
    }, [])

    return (
        <div>

        </div>
    );
}
 
export default WorkoutAddExercise;