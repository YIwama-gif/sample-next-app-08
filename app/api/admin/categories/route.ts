import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { status: "OK", categories: categories },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

interface CreateCategoryRequestBody {
  name: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const { name }: CreateCategoryRequestBody = await request.json();

    const data = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
