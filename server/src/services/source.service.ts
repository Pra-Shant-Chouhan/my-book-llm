import { CreateSourceInput, ListSourcesQuery } from "../validators/source.validator.js";

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