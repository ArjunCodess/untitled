import { Separator } from "@/components/ui/separator";

import HomeClient from "./home-client";

export const metadata = {
  title: "WhispersToMishika - Home",
  description: "A loving memory collection for Mishika"
};

export default function Home() {
  return (
    <main>
      <section className="max-h-screen">
        <HomeClient />
      </section>
      
      <Separator className="bg-neutral-100" />
      
      <section className="md:py-16 py-10 mx-4">
        <div className="mt-20 -mb-40 w-full bg-neutral-950 flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h2 className="text-lg lg:text-xl text-center text-neutral-200 relative z-20">
            memory surprise test.
          </h2>
          <h1 className="text-4xl lg:text-6xl font-bold text-center text-white relative z-20">
            let&apos;s play a game!
          </h1>
          <div className="w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-px w-1/4" />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 h-full bg-neutral-950 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
      </section>
    </main>
  );
}