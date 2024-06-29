import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(
    request: Request
) {
    const currentUser= await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        workoutId,
        templateId,
        name,
        Weight,
        sets,
        Reps,
        Rest
    } = body;

    if (!name || !sets || !Reps || !Rest) {
        return NextResponse.error();
    }

    if (templateId) {
        const templateAndExercise = await prisma.template.update({
            where: {
                id: templateId
            },
            data: {
                exercises: {
                    create: {
                        userId: currentUser.id,
                        name,
                        Weight: parseInt(Weight),
                        sets,
                        Reps,
                        Rest
                    }
                }
            }
        })
    
        return NextResponse.json(templateAndExercise);
    }

    const workoutAndExercise = await prisma.workout.update({
        where: {
            id: workoutId
        },
        data: {
            exercises: {
                create: {
                    userId: currentUser.id,
                    name,
                    Weight: parseInt(Weight),
                    sets,
                    Reps,
                    Rest
                }
            }
        }
    })

    return NextResponse.json(workoutAndExercise);
}