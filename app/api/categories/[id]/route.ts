import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { request } from "http";

const prisma = new PrismaClient();

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: " Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const { title, description } = await request.json();

  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
