import prisma from "@/app/libs/prismadb";

interface IParams {
    workoutId?: string;
}

export default async function getUserExercises(
    params:IParams
) {
    try {
        const { workoutId } = params;

        const exercises = await prisma.exercise.findMany({
            where: {
                workoutId: workoutId
            },
            include: {
                workout: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        

        const safeUserExercises = exercises.map(
            (exercise) => ({
                ...exercise,
                createdAt: exercise.createdAt.toISOString(),
                workout: {
                    ...exercise.workout,
                    createdAt: exercise.workout.createdAt.toISOString(),
                },
            })
        );

        return safeUserExercises;
    } catch (error: any) {
        throw new Error(error);
    }
}