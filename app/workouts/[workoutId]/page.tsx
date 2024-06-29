import getCurrentUser from "@/app/actions/getCurrentUser";
import getExercises from "@/app/actions/getExercises";
import getWorkoutById from "@/app/actions/getWorkoutById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import WorkoutClient from "./WorkoutClient";
import WorkoutView from "./WorkoutView";
import getWorkoutId from "@/app/actions/getWorkoutId";
import { useRouter } from 'next/navigation';
import NewWorkout from "@/app/components/workouts/NewWorkout";
import getTemplates from "@/app/actions/getTemplates";

interface IParams {
    workoutId?: string;
}

const WorkoutPage = async ({ params }: { params: IParams }) => {
    const workout = await getWorkoutById(params);
    const exercises = await getExercises(params);
    const currentUser = await  getCurrentUser();
    const templates = await getTemplates();
    

    
    if(!currentUser) {
        return (
            <div></div>
        )
    }

    if(!workout) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }    

    if(workout.user.id !== currentUser.id) {
        return (
            <ClientOnly>
                <WorkoutView
                    exercises={exercises}
                    workout={workout}
                    currentUser={currentUser}
                />
            </ClientOnly>
        )
    }


    return ( 
        <ClientOnly>
            <WorkoutClient 
                exercises={exercises}
                workout={workout}
                currentUser={currentUser}
                templates={templates}
            /> 
        </ClientOnly>
     );
}
 
export default WorkoutPage;