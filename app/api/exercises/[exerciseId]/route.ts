import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  exerciseId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { exerciseId } = params;

  if (!exerciseId || typeof exerciseId !== 'string') {
    throw new Error('Invalid ID');
  }

  const exercise = await prisma.exercise.deleteMany({
    where: {
      id: exerciseId
    }
  });

  return NextResponse.json(exercise);
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  const { exerciseId } = params;
  const body = await request.json();
  const {
    name,
    Weight,
    sets,
    Reps,
    Rest,
  } = body;

  if (!exerciseId || typeof exerciseId !== 'string') {
    throw new Error('Invalid ID');
  }

  if (!name || !Weight || !sets || !Reps || !Rest) {
    return NextResponse.error();
}

  const exercise = await prisma.exercise.update({
    where: {
      id: exerciseId
    },
    data: {
      name,
      Weight: parseInt(Weight),
      sets,
      Reps,
      Rest,
    }
  })
  
  return NextResponse.json(exercise);
}
