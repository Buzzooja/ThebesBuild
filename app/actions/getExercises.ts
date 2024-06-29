import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

interface IParams {
    workoutId?: string;
}

export default async function getExercises(
    params:IParams
) {
    try {
    const session = await getSession()  ;

      if (!session?.user?.email) {
        return null;
      }

      const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email as string
        }
      });

      if(!currentUser) {
        return null;
      }

        const { workoutId } = params;

        if (workoutId === "new") {
            const newWorkout = await prisma.workout.findFirst({
                where: {
                    userId: currentUser.id
                },
                orderBy: {
                    createdAt: 'desc'
                }
                  
              });
          
              if (!newWorkout) {
                  return null;
              }
          
          
              const newWorkoutId = newWorkout.id;
                const exercises = await prisma.exercise.findMany({
                    where: {
                        workoutId: newWorkoutId
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                })
                const safeExercises = exercises.map(
                    (exercise) => ({
                        ...exercise,
                        createdAt: exercise.createdAt.toISOString(),
                    })
                );
                if(!safeExercises) {
                    return null;
                }
                return safeExercises;
        
        }

        const exercises = await prisma.exercise.findMany({
            where: {
                workoutId: workoutId
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        

        const safeExercises = exercises.map(
            (exercise) => ({
                ...exercise,
                createdAt: exercise.createdAt.toISOString(),
            })
        );
        if(!safeExercises) {
            return null;
        }

        return safeExercises;
    } catch (error: any) {
        throw new Error(error);
    }
}