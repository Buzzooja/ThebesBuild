import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}

export default async function getWorkoutCount(
    params:IParams
) {
    try {
        const { userId } = params;

        const today = new Date();
        const last30DaysDate = new Date(new Date().setDate(today.getDate() - 30));
        
        
        const WorkoutCount = await prisma.workout.count({
            where: {
                userId: userId,
                date: {
                    lte: today,
                    gte: last30DaysDate
                }
            },
        });
        

        return WorkoutCount;
    } catch (error: any) {
        throw new Error(error);
    }
}