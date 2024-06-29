import prisma from "@/app/libs/prismadb";

interface IParams {
    name: string;
}

export default async function getSearchedUsers(
    params:IParams
) {
    try {
        const { name } = params;

        const correctedName = name.replace("%20", " ");

        const users = await prisma.user.findMany({
            where: {
                name: correctedName
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeUsers = users.map(
            (user) => ({
                ...user,
                createdAt: user.createdAt.toLocaleDateString(),
                updatedAt: user.updatedAt.toISOString(),
                emailVerified: user.emailVerified?.toISOString() || null,

            })
        );

        return safeUsers;
    } catch (error: any) {
        throw new Error(error);
    }
}