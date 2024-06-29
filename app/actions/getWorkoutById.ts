import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

interface IParams {
    workoutId?: string;
}

export default async function getWorkoutById(
    params: IParams
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

        if (!currentUser) {
            return null;
        } 
            const { workoutId } = params;

        if (workoutId === 'new') {
            const workout = await prisma.workout.findFirst({
                where: {
                    userId: currentUser.id
                },
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            if(workout) {
                return {
                    ...workout,
                    createdAt: workout.createdAt.toISOString(),
                    user: {
                        ...workout.user,
                        createdAt: workout.user.createdAt.toISOString(),
                        updatedAt: workout.user.updatedAt.toISOString(),
                        emailVerified:
                            workout.user.emailVerified?.toISOString() || null,
                    }
                };
            };
            if(!workout) {
                return null              
            }
        }
        else {
            const workout = await prisma.workout.findUnique({
                where: {
                    id: workoutId
                },
                include: {
                    user: true
                }
            }) 
            if(workout) {
                return {
                    ...workout,
                    createdAt: workout.createdAt.toISOString(),
                    user: {
                        ...workout.user,
                        createdAt: workout.user.createdAt.toISOString(),
                        updatedAt: workout.user.updatedAt.toISOString(),
                        emailVerified:
                            workout.user.emailVerified?.toISOString() || null,
                    }
                };
            };
            if(!workout) {
                return null
            }
        };     
    }   catch (error: any) {
        throw new Error(error);
    }
}