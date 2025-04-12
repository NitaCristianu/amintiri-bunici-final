"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      likes: [],
      comments: [],
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const deleteMemory = async (memoryId: string) => {
  // 1) Check session
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  try {
    const result = await writeClient.delete(memoryId);
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const likePost = async (postId: string) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  try {
    // Fetch the post using its ID.
    const post = await writeClient.getDocument(postId);
    if (!post) {
      return parseServerActionResponse({
        error: "Post not found",
        status: "ERROR",
      });
    }

    console.log(post.title)
    console.log(post.likes)
    // Check if the user already liked the post.
    const alreadyLiked = post.likes?.some(
      (like: { user: string }) => like.user === session.id
    );

    // If not already liked, append the user's like.
    if (!alreadyLiked) {
      await writeClient
        .patch(postId)
        .setIfMissing({ likes: [] })
        .append("likes", [{ user: session.id }])
        .commit();
    }

    return parseServerActionResponse({
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const uploadComment = async (
  postId: string,       // The ID of the post to comment on
  content: string       // The comment content as a string
) => {
  const session = await auth();
  console.log('slongdingdolongdingong');
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
    console.log("spinbalabum");
  try {
    // Check if the post exists
    const post = await writeClient.getDocument(postId);
    console.log("post : " + post)
    if (!post) {
      return parseServerActionResponse({
        error: "Post not found",
        status: "ERROR",
      });
    }

    // Append the new comment to the comments array

    console.log("received : " + content);
    const result = await writeClient
      .patch(postId)
      .setIfMissing({ comments: [] })
      .append("comments", [
        {
          author: {
            _type: "reference",
            _ref: session?.id,
          },
          username: session.user?.name,
          content,
        },
      ])
      .commit();

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};