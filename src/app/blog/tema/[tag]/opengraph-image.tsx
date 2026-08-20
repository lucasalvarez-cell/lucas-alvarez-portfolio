import { notFound } from "next/navigation";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { getAllPosts } from "@/lib/blog";
import { activeTopics, getTopic } from "@/lib/topics";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return activeTopics(getAllPosts()).map((topic) => ({ tag: topic.tag }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const topic = getTopic(tag);
  if (!topic) notFound();

  return ogImage({ kicker: "Blog", title: topic.title });
}
