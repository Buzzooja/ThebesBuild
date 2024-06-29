'use client';

import { SafeExercise, SafeExercises, SafeFollowedUser, SafeTemplate, SafeUser, SafeWorkout } from "@/app/types";
import { Workout, Exercise} from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Button from "../Button";
import ExerciseTable from "./ExerciseTable";
import WorkoutHead from "./WorkoutHead";

interface WorkoutCardProps {
    data: SafeWorkout;
    exercises:SafeExercises[];
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser: SafeFollowedUser;
    solo?:boolean;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
    data,
    exercises,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
    solo = false,
}) => {
    const router = useRouter();

    const date = data.date?.toLocaleDateString("en-GB");

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    
        if (disabled) {
          return;
        }
    
        onAction?.(actionId)
      }, [disabled, onAction, actionId]);
      
    return ( 
        <div
        onClick={() => router.push(`/workouts/${data.id}`)}
        className="
                    w-full
                    justify-center
                    items-center
                    flex
                    cursor-pointer
                    group
                   ">
      <div className="  relative
                        w-full
                        rounded-lg
                        bg-neutral-800
                        p-2
                        ">
        <WorkoutHead
          title={data.title}
          id={data.id}
          date={date}
          currentUser={currentUser}
          solo={solo}
        />

        <ExerciseTable
          title={data.title}
          exercises={exercises}
        />

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>

      </div>
     );
}
 
export default WorkoutCard;