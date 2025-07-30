import HomeClient from "./home-client";

export const metadata = {
  title: "WhispersToMishika - Home",
  description: "A loving memory collection for Mishika"
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeClient />
    </main>
  );
}