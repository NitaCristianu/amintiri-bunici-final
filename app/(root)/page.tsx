import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };


  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container overflow-hidden ">
        <img width={'100%'} height={'100%'}  className="-z-5 sticky top-[100px] md:scale-[112%] scale-[250%]" src="/peisaj.jpg" alt="peisaj romanesc" />
        <div className="absolute">
          {/* <h1 className="heading mt-9">
            amintiri-bunici
            <p className="sub-heading !max-w-3xl">
              Submit Ideas, post memories and enjoy
            </p>
          </h1> */}
          <br />
          <br />
          <SearchForm query={query} />

        </div>

      </section>

      <div className="bg-black">
        <section className="section_container">
          <p className="text-30-semibold !text-center">
            {query ? `Search results for "${query}"` : "All Memories"}
          </p>

          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post?._id} post={post} />
              ))
            ) : (
              <p className="no-results">No startups found</p>
            )}
          </ul>
        </section>
      </div>

      <SanityLive />
    </>
  );
}
