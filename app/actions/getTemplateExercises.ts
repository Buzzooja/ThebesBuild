import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

interface IParams {
    templateId?: string;
}

export default async function getExercises(
    params:IParams
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

      if(!currentUser) {
        return null;
      }

        const { templateId } = params;

        if (templateId === "new") {
            const newTemplate = await prisma.template.findFirst({
                where: {
                    userId: currentUser.id
                },
                orderBy: {
                    createdAt: 'desc'
                }
                  
              });
          
              if (!newTemplate) {
                  return null;
              }
          
          
              const newTemplateId = newTemplate.id;
                const exercises = await prisma.exercise.findMany({
                    where: {
                        templateId: newTemplateId
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                })
                const safeExercises = exercises.map(
                    (exercise) => ({
                        ...exercise,
                        createdAt: exercise.createdAt.toISOString(),
                    })
                );
                if(!safeExercises) {
                    return null;
                }
                return safeExercises;
        
        }

        const exercises = await prisma.exercise.findMany({
            where: {
                templateId: templateId
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        

        const safeExercises = exercises.map(
            (exercise) => ({
                ...exercise,
                createdAt: exercise.createdAt.toISOString(),
            })
        );
        if(!safeExercises) {
            return null;
        }

        return safeExercises;
    } catch (error: any) {
        throw new Error(error);
    }
}