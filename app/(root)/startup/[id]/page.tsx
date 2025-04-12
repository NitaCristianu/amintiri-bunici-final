import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { likePost, uploadComment } from "@/lib/actions";
import { auth } from "@/auth";
import { CommentSection } from "@/components/CommentSection";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const isUser = session && session.user;
  const [post, other] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);
  if (!post) return notFound();

  const comments = post.comments || [];
  console.log(post.likes);
  const likes = post?.likes?.length || 0;
  // const editorPosts = other ? typeof(other) == 'object' ? other.select : [] : [];
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <div style={{ width: '100%', height: '100%', zIndex: -5, position: 'fixed' }}>
        <img
          src="/peisaj.jpg"
          style={{ width: '100%', height: '100%', filter: 'blur(10px)', scale: 1.1 }}
          alt="peisaj"
        />
      </div>
      <br />
      <br />
      <br />
      <div className="bg-white-100 w-fit mx-auto p-5 px-[5vw]">
        <section className="pink_container !min-h-[230px]">
          <h1 className="heading">{post.title}</h1>
          <p className="sub-heading !max-w-5xl !text-black-100">{post.description}</p>
        </section>

        <section className="section_container">

          <div className="space-y-5 mt-10 max-w-4xl sm:w[90vw] md:w-[60vw] lg-[50vw] mx-auto">
            <div className="flex-between gap-5">
              <Link
                href={`/user/${post.author?._id}`}
                className="flex gap-2 items-center mb-3"
              >
                <Image
                  src={post.author.image}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />

                <div>
                  <p className="text-20-medium">{post.author.name}</p>
                  <p className="text-16-medium !text-black-300">
                    @{post.author.username}
                  </p>
                </div>
              </Link>

              {/* <div className="flex items-center">
              <form
                action={async () => {
                  "use server";
                  if (session)
                    likePost(session.id);
                }}
                >
                <button type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z" /></svg>
                  </button>
                  </form>
                  <p className="text-3xl font-bold">{likes}</p> 
                  </div>*/}

              <p className="category-tag">{post.category}</p>
            </div>
            <p className="tag mt-[10vh]">{formatDate(post?._createdAt)}</p>
            <h3 className="text-30-bold">Amintire</h3>
            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No details provided</p>
            )}
            <div className="flex justify-center">

              <img
                src={post.image}
                alt="thumbnail"
                className=" h-[80vh] w-auto rounded-xl"
              />
            </div>
          </div>

          <hr className="divider" />

          <CommentSection submitComment={async (content: string) => {
            "use server";
            console.log("sending : " + content)
            if (content == "") return;
            uploadComment(id, content);
          }} comments={comments} />

          {/* {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto ">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense> */}
        </section >
      </div>
    </>
  );
};

export default Page;
