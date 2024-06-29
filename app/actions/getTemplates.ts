import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}
export default async function getTemplates() {
    try {

        const session = await getSession();

        if(!session?.user?.email) {
            return null;
        }

        const User = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            },
            include: {
                templates: true
            }
          });
        
          if (!User) {
            return null;
          }
        


        const safeTemplates = User.templates.map((template) => ({
            ...template,
            createdAt: template.createdAt.toISOString(),

        }))


        return safeTemplates;
    } catch (error: any) {
        throw new Error(error);
        
    }
}