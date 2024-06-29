import getUserById from "@/app/actions/getUserById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ProfileCard from "@/app/components/social/ProfileCard";
import ProfileClient from "@/app/profile/ProfileClient";
import getTemplatesByUserId from "@/app/actions/getTemplatesByUserId";
import getCurrentUser from "@/app/actions/getCurrentUser";
import AddWorkout from "@/app/components/workouts/AddWorkout";
import WTOption from "@/app/profile/WTOption";
import { useCallback, useState } from "react";
import ProfileHeading from "@/app/components/profile/ProfileHeading";
import getWorkoutCount from "@/app/actions/getWorkoutCount";
import { useRouter } from "next/navigation";
import TemplateCard from "@/app/components/templates/TemplateCard";
import TemplateHeading from "@/app/components/templates/TemplateHeading";
import AddTemplateModel from "@/app/components/models/AddTemplateModel";

interface IParams {
    userId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
    const user = await getUserById(params);
    const templates = await getTemplatesByUserId(params);
    const currentUser = await getCurrentUser();
    const workoutCount = await getWorkoutCount(params);
    

    if (!user) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    if (!templates) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    if (!currentUser) {
        return(
            <div></div>
        )
    }

    if (currentUser.id === user.id) {
        return(
          <ClientOnly>
            <AddTemplateModel
              currentUser={currentUser}
            />
            <WTOption
              ID={user.id}
            />
            <div className="justify-center items-center flex pt-4 overflow-hidden overflow-y-auto">
              <div
                className="
                  flex
                  flex-col
                  w-full
                  md:w-4/6
                  lg:w-3/6
                  xl:w-2/5
                  gap-8
                  overflow-auto
                ">
                <TemplateHeading
                  currentUser={currentUser}
                />
                  {templates.map((template) => {
                    return (
                      <TemplateCard
                        currentUser={user} 
                        key={template.id}
                        data={template}
                        exercises={template.exercises}
                      />
                    )
                  })}
              </div>
            </div>
            <div className="">

            </div>
          </ClientOnly>
        )
    } 

    return (
        <ClientOnly>
            <ProfileClient 
            user={user}
            currentUser={currentUser}
            />
            <div className="justify-center items-center flex pt-24 overflow-hidden overflow-y-auto">
          <div
            className="
              flex
              flex-col
              border-x
              w-full
              md:w-4/6
              lg:w-3/6
              xl:w-2/5
              gap-8
              overflow-auto
              bg-neutral-700
            ">
            
          </div>
      </div>
        </ClientOnly>
        );
}
 
export default ProfilePage;