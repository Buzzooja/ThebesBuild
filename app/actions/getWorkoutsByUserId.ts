import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}

export default async function getWorkoutsByUserId(
    params: IParams
) {
    try {
        const { userId } = params;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
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

        if (!user) {
            return null;
        }

        const safeWorkoutsByUserId = user.workouts.map((workout) => ({
            ...workout,
            createdAt: workout.createdAt.toISOString(),
        }))

        return safeWorkoutsByUserId;
        
    }   catch (error: any) {
        throw new Error(error);
    }
}