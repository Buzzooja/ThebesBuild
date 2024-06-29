import prisma from "@/app/libs/prismadb";

interface IParams {
  userId?: string;
}

export default async function getWorkoutId( 
  params: IParams
) {
    try {
    const { userId } = params;

    if(!userId) {
      return null;
    }


    const newWorkout = await prisma.workout.findMany({
      take: 1,
      where: {
          userId: userId
      },
        
    });

    if (!newWorkout) {
        return null;
    }


    const newWorkoutId = newWorkout[0].id;
    return newWorkoutId;
    } catch (error: any) {
        return null;
    }
}
