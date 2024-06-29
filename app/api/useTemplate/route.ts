import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser= await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        templateId,
        workoutId
    } = body;

    if(!templateId || !workoutId) {
        return NextResponse.error();
    }

    const exercises = await prisma.exercise.findMany({
        where: {
            templateId: templateId
        },
        
        orderBy: {
            createdAt: 'asc'
        }
    })

    const templateExercises = exercises?.map(
        (exercise) => {
            return (
                {
                    userId: exercise.userId,
                    workoutId,
                    name: exercise.name,
                    Weight: exercise.Weight,
                    sets: exercise.sets,
                    Reps: exercise.Reps,
                    Rest: exercise.Rest
                }
            )
        }
    )
    
    const useTemplate = await prisma.exercise.createMany({
        data: templateExercises
    })

    return (NextResponse.json(useTemplate))
}