import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <div style={{ width: '100%', height: '100%', zIndex: -5, position: 'fixed' }}>
        <img
          src="/peisaj.jpg"
          style={{ width: '100%', height: '100%', filter: 'blur(5px)', scale: 1.1 }}
          alt="peisaj"
        />
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="bg-white p-4 w-fit mx-auto" style={{borderRadius : 16}}>
        <section className="pink_container !min-h-[230px] ">
          <h1 className="heading">Împărtăşeş-te amintirea</h1>
        </section>

        <StartupForm />
      </div>
      <br/>
      <br/>
      <br/>
    </>
  );
};

export default Page;
