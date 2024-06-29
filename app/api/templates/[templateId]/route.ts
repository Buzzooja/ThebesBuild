import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    templateId?: string;
  }
  
  export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    const { templateId } = params;
  
    if (!templateId || typeof templateId !== 'string') {
      throw new Error('Invalid ID');
    }

    const template = await prisma.template.delete({
        where: {
            id: templateId
        },
        include: {
            exercises: true
        }
    });
  
    return NextResponse.json(template);
  }
  