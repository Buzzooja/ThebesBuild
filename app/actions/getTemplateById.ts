import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

interface IParams {
    templateId?: string;
}

export default async function getTemplateById(
    params: IParams
) {
    try {
        const session = await getSession()  ;

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
            const { templateId } = params;

        if (templateId === 'new') {
            const template = await prisma.template.findFirst({
                where: {
                    userId: currentUser.id
                },
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            if(template) {
                return {
                    ...template,
                    createdAt: template.createdAt.toLocaleDateString("en-GB"),
                    user: {
                        ...template.user,
                        createdAt: template.user.createdAt.toISOString(),
                        updatedAt: template.user.updatedAt.toISOString(),
                        emailVerified:
                            template.user.emailVerified?.toISOString() || null,
                    }
                };
            };
            if(!template) {
                return null              
            }
        }
        else {
            const template = await prisma.template.findUnique({
                where: {
                    id: templateId
                },
                include: {
                    user: true,
                }
            }) 
            if(template) {
                return {
                    ...template,
                    createdAt: template.createdAt.toLocaleDateString("en-GB"),
                    user: {
                        ...template.user,
                        createdAt: template.user.createdAt.toISOString(),
                        updatedAt: template.user.updatedAt.toISOString(),
                        emailVerified:
                            template.user.emailVerified?.toISOString() || null,
                    }
                };
            };
            if(!template) {
                return null
            }
        };     
    }   catch (error: any) {
        throw new Error(error);
    }
}