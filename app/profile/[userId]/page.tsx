import getUserById from "@/app/actions/getUserById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ProfileCard from "@/app/components/social/ProfileCard";
import ProfileClient from "../ProfileClient";
import getWorkoutsByUserId from "@/app/actions/getWorkoutsByUserId";
import WorkoutCard from "@/app/components/workouts/WorkoutCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import AddWorkout from "@/app/components/workouts/AddWorkout";
import WTOption from "../WTOption";
import { useCallback, useState } from "react";
import ProfileHeading from "@/app/components/profile/ProfileHeading";
import getWorkoutCount from "@/app/actions/getWorkoutCount";
import Container from "@/app/components/Container";
import ProfileHead from "@/app/components/social/ProfileHead";

interface IParams {
    userId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
    const user = await getUserById(params);
    const workouts = await getWorkoutsByUserId(params);
    const currentUser = await getCurrentUser();
    const workoutCount = await getWorkoutCount(params);
    

    if (!user) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    if (!workouts) {
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
            <WTOption
              ID={user.id}
              workouts={true}
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
                <ProfileHeading 
                  currentUser={currentUser}
                  workoutCount={workoutCount}
                />
                  {workouts.map((workout) => {
                    return (
                      <WorkoutCard
                        currentUser={user} 
                        key={workout.id}
                        data={workout}
                        exercises={workout.exercises}
                        solo={true}
                      />
                    )
                  })}
              </div>
            </div>
          </ClientOnly>
        )
    } 

    return (
        <ClientOnly>
          <Container>
            <div className="justify-center items-center flex pt-24 overflow-hidden overflow-y-auto">
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
                <ProfileHead
                  user={user}
                  currentUser={currentUser}
                />
                {workouts.map((workout) => {
                  return (
                    <WorkoutCard
                      currentUser={user} 
                      key={workout.id}
                      data={workout}
                      exercises={workout.exercises}
                      solo={true}
                    />
                  )
                })}
              </div>
            </div>
          </Container>
        </ClientOnly>
        );
}
 
export default ProfilePage;