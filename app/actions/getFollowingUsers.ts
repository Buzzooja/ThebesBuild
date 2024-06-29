import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}


export default async function getFollowingUsers() {
    try {
    const session = await getSession();

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

      const SocialUsers = await prisma.user.findMany({
        where: {
            id: { in: currentUser.followingIDs}
        },
      });

      if(!SocialUsers) {
        return null;
      }

      

    return SocialUsers;
        }
     catch (error: any) {
        throw new Error(error);
    }
}