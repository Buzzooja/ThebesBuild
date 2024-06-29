import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  workoutId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { workoutId } = params;

  if (!workoutId || typeof workoutId !== 'string') {
    throw new Error('Invalid ID');
  }

  const workout = await prisma.workout.delete({
    where: {
      id: workoutId,
    },
    include: {
      exercises: true
    }
  });

  return NextResponse.json(workout);
}
