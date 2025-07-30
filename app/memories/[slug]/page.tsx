import { notion } from "@/lib/notion";
import { NotionPage } from "@/components/notion";
import { pageSlugs } from "@/constants";
import MemoriesPage from "@/components/memories-page";
import { Suspense } from "react";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

type PageProps = {
    params: Params;
}

async function getData(pageSlug: string) {
    try {
        return await notion.getPage(pageSlug);
    } catch (error) {
        console.error("Error fetching Notion page:", error);
        return null;
    }
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    return {
        title: `Memory ${slug}`,
        description: `Memory page ${slug}`,
    };
}

export default async function MemoryPage({ params }: PageProps) {
    const { slug } = await params;
    const pageSlug = pageSlugs[slug];

    if (!slug || !pageSlug) {
        notFound();
    }

    const data = await getData(pageSlug);
    
    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Error loading memory</h1>
                <p>There was an error loading this memory. Please try again later.</p>
                <Suspense fallback={<div>Loading...</div>}>
                    <MemoriesPage slug={slug} />
                </Suspense>
            </div>
        );
    }

    return (
        <div>
            <Suspense fallback={<div>Loading navigation...</div>}>
                <MemoriesPage slug={slug} />
            </Suspense>
            <Suspense fallback={<div className="p-8 text-center">Loading memory content...</div>}>
                <NotionPage recordMap={data} rootPageId={pageSlug} />
            </Suspense>
        </div>
    );
}