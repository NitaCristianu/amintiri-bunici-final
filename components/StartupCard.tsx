"use client"
import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from 'framer-motion';
import { useState } from "react";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };



const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;
  const [hovered, setHover] = useState(false);

  return (
    <motion.li
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="startup-card group overflow-hidden p-5"
    >
      <motion.div
        className="relative w-full h-[164px] rounded-[22px] overflow-hidden"
        style={{
          scale: 1,
          backdropFilter: "blur(0px)",
        }}
      >
        <motion.img src={image} alt="placeholder" className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000cc] to-transparent" />
      </motion.div>
      <br />


      <div className="flex-between mt-5 gap-2">
        <Link href={`/startup/${_id}`}>
          <h3 className="text-30-semibold line-clamp-1 ">{title}</h3>
        </Link>
        <Button className="startup-card_btn uppercase border-[3px] group-hover:border-white/80 transition border-black group-hover:bg-primary transition bg-black group-hover:text-white/80 transition text-black" asChild>
          <Link href={`/startup/${_id}`}>Detalii</Link>
        </Button>
      </div>
      <br />
      <br />

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
      </Link>

      <div className="flex-between gap-3 mt-5">
        {/* <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium !group-hover:text-white transition text-black">{category}</p>
        </Link>  */}

        <Link href={`/user/${author?._id}`}>
          <p className="text-16-medium line-clamp-1 uppercase">{author?.name}</p>
        </Link>
        <p className="startup_card_date group-hover:text-white transition text-black">{formatDate(_createdAt)}</p>
        <div className="flex gap-2">
          <p>{post.comments?.length}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" scale={.4} viewBox="0 0 24 24"><path fill="currentColor" d="M6 14h12v-2H6zm0-3h12V9H6zm0-3h12V6H6zm16 14l-4-4H4q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4zM4 16h14.85L20 17.125V4H4zm0 0V4z"/></svg>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
    </motion.li>
  );
};



export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
