import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_libs/prisma";
import type { Post } from "@/app/_types/Post";

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json<{ status: string; posts: Post[] }>(
      {
        status: "OK",
        posts: posts.map((post) => ({
          ...post,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

interface CreatePostRequestBody {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnailUrl: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { title, content, categories, thumbnailUrl }: CreatePostRequestBody =
      body;

    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });

    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id,
        },
      });
    }

    return NextResponse.json<{ status: string; message: string; id: number }>({
      status: "OK",
      message: "作成しました",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
