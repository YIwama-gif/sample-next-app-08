import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";
import type { Post } from "@/app/_types/Post";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!post)
      return NextResponse.json(
        { status: "記事が見つかりませんでした" },
        { status: 404 }
      );

    return NextResponse.json<{ status: string; post: Post }>(
      {
        status: "OK",
        post: {
          ...post,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
