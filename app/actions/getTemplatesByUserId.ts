import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}

export default async function getTemplatesByUserId(
    params: IParams
) {
    try {
        const { userId } = params;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                templates: {
                    include: {
                        exercises: true
                    },
                orderBy: {
                    createdAt: 'desc'
                }
                }
            }
        });

        if (!user) {
            return null;
        }

        const safeTemplatesByUserId = user.templates.map((template) => ({
            ...template,
            createdAt: template.createdAt.toLocaleDateString("en-GB"),
        }))

        return safeTemplatesByUserId;
        
    }   catch (error: any) {
        throw new Error(error);
    }
}