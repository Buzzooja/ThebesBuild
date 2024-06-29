import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";

interface IParams {
    userId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();
    const User2 = await getUserById(params);

    if (!currentUser) {
        return NextResponse.error();
    }

    if (!User2) {
        return NextResponse.error();
    }

    const { userId } = params;

    if (!userId || typeof userId !== 'string'){
        throw new Error('Invalid ID')
    }

    let followingIDs = [... (currentUser.followingIDs || [])];

    followingIDs.push(userId);

    let followedByIDs = [... (User2.followedByIDs || [])];

    followedByIDs.push(currentUser.id)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            followingIDs
        }
    })
    await prisma.user.update({
                    where: {
                        id: User2.id
                    },
                    data: {
                        followedByIDs
                    }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await  getCurrentUser();
    const User2 = await getUserById(params);
    
    if (!currentUser) {
        return NextResponse.error();
    }

    if (!User2) {
        return NextResponse.error();
    }

    const { userId } = params;

    if (!userId || typeof userId !== 'string'){
        throw new Error('Invalid ID')
    }

    let followingIDs = [...(currentUser.followingIDs || [])];

    followingIDs = followingIDs.filter((id) => id !== userId);

    let followedByIDs = [... (User2.followedByIDs || [])];

    followedByIDs = followedByIDs.filter((id) => id !== currentUser.id)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            followingIDs
        }
    });

    await prisma.user.update({
        where: {
            id: User2.id
        },
        data: {
            followedByIDs
        }
    });

    return NextResponse.json(user);
}