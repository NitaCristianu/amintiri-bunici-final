import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-[#0004] shadow-sm font-work-sans fixed w-full"
      style={{ backdropFilter: 'blur(20px)', zIndex: 100 }}
    >
      <nav className="flex justify-between items-center blur-xs">
        <Link href="/">
          <p className="logo mt-9">
            amintiri-bunici
          </p>
        </Link>
        <div className="flex items-center gap-5 text-black blur-xs">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden text-white-100">Creează</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden text-white-100">Deconectare</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button className="text-white-100" type="submit">Autentificare</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
