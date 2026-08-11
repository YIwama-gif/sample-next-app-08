import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import type { Category } from "@/app/_types/Category";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const token = request.headers.get("Authorization") ?? "";

  const { error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  const { id } = await params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!category)
      return NextResponse.json(
        { status: "カテゴリーが見つかりませんでした" },
        { status: 404 }
      );

    return NextResponse.json<{ status: string; category: Category }>(
      { status: "OK", category: category },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

interface UpdateCategoryRequestBody {
  name: string;
}

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const token = request.headers.get("Authorization") ?? "";

  const { error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  const { id } = await params;

  const { name }: UpdateCategoryRequestBody = await request.json();

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    return NextResponse.json<{ status: string; category: Category }>(
      { status: "OK", category: category },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const token = request.headers.get("Authorization") ?? "";

  const { error } = await supabase.auth.getUser(token);

  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  const { id } = await params;

  try {
    await prisma.postCategory.deleteMany({
      where: {
        categoryId: parseInt(id),
      },
    });

    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json<{ status: string }>(
      { status: "OK" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
