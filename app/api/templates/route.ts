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
        name,
        exercises
    } = body;

    if (!exercises || !name) {
        return NextResponse.error();
    }


    const template = await prisma.template.create({
        data: {
            name,
            userId: currentUser.id,
            exercises: {
                create: exercises
            }
            }
        }
    )

    return (NextResponse.json(template));
}