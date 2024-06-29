'use client';

import { useRouter } from "next/navigation";

interface NewWorkoutProps{
    workoutId: string | null;
}

const NewWorkout: React.FC<NewWorkoutProps> =  ({
    workoutId
}) => {
    const router = useRouter();

    router.push(`/workouts/${workoutId}`)
    return (
        <div></div>
    )
}

export default NewWorkout;