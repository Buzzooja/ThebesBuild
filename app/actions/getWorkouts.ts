import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}
export default async function getWorkouts() {
    try {

        const session = await getSession();

        if(!session?.user?.email) {
            return null;
        }

        const User = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            },
            include: {
                workouts: {
                    include: {
                        exercises: true
                    },
                orderBy: {
                    date: 'desc'
                }
                }
            }
          });

          if(!User) {
            return null;
          }

          const Workouts = await prisma.workout.findMany({
            where: {
                OR: [{ userId: {in: User.followingIDs} }, {userId: User.id}]   
            },
            include: {
                exercises:true,
                user:true
            },
            orderBy: {
                date: 'desc'
            }
          })
        
          if (!User) {
            return null;
          }
        


        const safeWorkouts = Workouts.map((workout) => ({
            ...workout,
            createdAt: workout.createdAt.toLocaleDateString("en-GB"),

        }))


        return safeWorkouts;
    } catch (error: any) {
        throw new Error(error);
        
    }
}