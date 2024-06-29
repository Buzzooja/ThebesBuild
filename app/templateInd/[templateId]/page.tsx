import getCurrentUser from "@/app/actions/getCurrentUser";
import getTemplateById from "@/app/actions/getTemplateById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getWorkoutId from "@/app/actions/getWorkoutId";
import { useRouter } from 'next/navigation';
import NewWorkout from "@/app/components/workouts/NewWorkout";
import getTemplates from "@/app/actions/getTemplates";
import TemplateClient from "../TemplateClient";
import getTemplateExercises from "@/app/actions/getTemplateExercises";

interface IParams {
    templateId?: string;
}

const WorkoutPage = async ({ params }: { params: IParams }) => {
    const template = await getTemplateById(params);
    const exercises = await getTemplateExercises(params);
    const currentUser = await  getCurrentUser();


    
    if(!currentUser) {
        return (
            <div></div>
        )
    }

    if(!template) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }    

    if(template.user.id !== currentUser.id) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }


    return ( 
        <ClientOnly>
            <TemplateClient 
                template={template}
                exercises={exercises}
                currentUser={currentUser}
            /> 
        </ClientOnly>
     );
}
 
export default WorkoutPage;