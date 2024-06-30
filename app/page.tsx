export const dynamic = 'force-dynamic'

import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import getWorkouts from "./actions/getWorkouts";
import WorkoutCard from "./components/workouts/WorkoutCard";
import getCurrentUser from "./actions/getCurrentUser";
import useLoginModel from "./hooks/useLoginModel";
import HomeHeading from "./components/HomeHeading";
import WelcomePage from "./components/WelcomePage";

export default async function Home() {
  const workouts = await getWorkouts();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <div className="">
          <WelcomePage />
        </div> 
      </ClientOnly>
    )
   
  }

  if (!workouts) {
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  
  return (
    <ClientOnly>
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
            <HomeHeading
              currentUser={currentUser}  
            />
            {workouts.map((workout) => {
              return (
                <WorkoutCard
                  key={workout.id}
                  currentUser={workout.user}                   
                  data={workout}
                  exercises={workout.exercises}
                />
              )
            })}
          </div>
      </div>
    </ClientOnly>
  )
}
