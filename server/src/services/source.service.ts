import { scrapeWebsite } from "../lib/firecrawl.js";
import { createSourceRecord } from "../repositories/source.repository.js";
import { CreateSourceInput, ImportWebsiteInput, ListSourcesQuery } from "../validators/source.validator.js";
import { getWorkspaceByIdForUser } from "./workspace.service.js";

async function createAndProcessSource(
    data: Parameters<typeof createSourceRecord>[0],
) {
    const source = await createSourceRecord(data); //

    // await enqueueSourceProcessing({
    //     sourceId: source.id,
    //     workspaceId: source.workspaceId,
    // });

    return source;
}
export async function listSourcesForWorkspace(
    workspaceId: string,
    userId: string,
    filters: ListSourcesQuery = {},
) {

}
export async function createTextOrMarkdownSource(
    workspaceId: string,
    userId: string,
    input: CreateSourceInput,
) {
    // await assertWorkspaceAccess(workspaceId, userId);

    // return createAndProcessSource({
    //     workspaceId,
    //     type: input.type,
    //     title: input.title,
    //     content: input.content,
    //     status: "PENDING",
    // });
}

export async function importWebsiteSource(
    workspaceId: string,
    userId: string,
    input: ImportWebsiteInput,
) {
    await getWorkspaceByIdForUser(workspaceId, userId);

    const scraped = await scrapeWebsite(input.url);

    return createAndProcessSource({
        workspaceId,
        type: "WEBSITE",
        title: input.title || scraped.title || input.url,
        content: scraped.markdown,
        url: scraped.sourceUrl,
        status: "PENDING",
        metadata: {
            importedFrom: scraped.sourceUrl,
        },
    });
}