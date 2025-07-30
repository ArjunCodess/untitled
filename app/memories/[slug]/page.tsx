import { notion } from "@/notion";
import { NotionPage } from "@/components/notion";
import { pageSlugs } from "@/constants";
import MemoriesPage from "@/components/memories-page";

async function getData(pageSlug: string) {
    return await notion.getPage(pageSlug);
}

export default async function Home(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const pageSlug = pageSlugs[params.slug];

    if (!params.slug || !pageSlug) return <div>Page not found</div>;

    const data = await getData(pageSlug);

    return (
        <div>
            <MemoriesPage slug={params.slug} />
            <NotionPage recordMap={data} rootPageId={pageSlug} />
        </div>
    );
}