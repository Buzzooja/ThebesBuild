'use client';

import { SafeExercise, SafeExercises, SafeTemplate, SafeUser, SafeWorkout } from "@/app/types";
import { Workout, Exercise} from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Button from "../Button";
import ExerciseTable from "../workouts/ExerciseTable";
import WorkoutHead from "../workouts/WorkoutHead";

interface TemplateCardProps {
    data: SafeTemplate;
    exercises:SafeExercises[];
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser: SafeUser;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
    data,
    exercises,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
}) => {
    const router = useRouter();

    const date = data.createdAt;

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
        onClick={() => router.push(`/templateInd/${data.id}`)}
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
          id={data.id}
          date={date}
          currentUser={currentUser}
          title={data.name}
          solo={true}
        />

        <ExerciseTable
          title={data.name}
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
 
export default TemplateCard;