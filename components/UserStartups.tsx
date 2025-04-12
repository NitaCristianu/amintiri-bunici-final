import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY, AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import DeletableStartupCard from "./DeletableStartupCard";
import { auth } from "@/auth";

const UserStartups = async ({ id , isUser }: { id: string, isUser : boolean }) => {
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => (
          isUser ? (<DeletableStartupCard key={startup._id} post={startup} />) : <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
