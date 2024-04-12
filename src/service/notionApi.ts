import Tag from "@components/Tag.astro";
import { Client } from "@notionhq/client";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const getCookItem = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID || "",
  });

  return response.results
    .filter(page => {
      return "cover" in page && page.cover && page.cover.file;
    })
    .map(page => {
      if ("properties" in page && "cover" in page) {
        const title = page.properties.Title.title[0];
        const tags = page.properties.Tags;
        const cover: string = getFirstCover(page.cover.file.url, page.id);
        return { title, tags, cover };
      }
    });
};

export interface CookItem {
  title: string;
  tags: Array<RichTextItemResponse>;
  cover: string;
}

function getFirstCover(url: string, pageId: string): string {
  const baseURL =
    "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F";
  const base_name = extractFilePathFromURL(url);
  console.log("base_name", base_name);
  return (
    baseURL +
    base_name +
    "?id=" +
    pageId +
    "&table=block&spaceId=bd3217ec-3317-4be9-80c2-8533703ab449"
  );
}
function extractFilePathFromURL(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;
    const pathSegments = path.split("/");
    const lastTwoSegments = pathSegments.slice(-2);
    return lastTwoSegments.join("%2F");
  } catch (error) {
    console.error("Error parsing URL:", error);
    return null;
  }
}
