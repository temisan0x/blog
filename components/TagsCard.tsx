import { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { IPost } from "../types/post";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface TagsCardProps {
  posts: IPost[];
}

const MAX_CONTENT_LENGTH = 100; // Maximum length of the content before truncation

const truncateHTMLContent = (
  html: string | undefined,
  maxLength: number
): string => {
  if (!html) {
    return "";
  }
  const truncatedHTML = html.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags

  if (truncatedHTML.length <= maxLength) {
    return html;
  }
  const truncatedText = truncatedHTML.slice(0, maxLength) + "...";
  return html.replace(html, truncatedText);
};

const TagsCard: React.FC<TagsCardProps> = ({ posts }) => {
  const [tags, setTags] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("/api/tags");
        const tagsData = response.data;
        const tagsMap: { [key: string]: string } = {};
        tagsData.forEach((tag: { _id: string; name: string }) => {
          tagsMap[tag._id] = tag.name;
        });
        setTags(tagsMap);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        <>
          <ul>
            {posts.map((post: IPost) => {
              const truncatedContent = truncateHTMLContent(
                post.content,
                MAX_CONTENT_LENGTH
              );
              return (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col z-10 blog-post cursor-pointer"
                >
                  <div className="w-full relative aspect-w-2 aspect-h-1 h-64 mt-2 mb-8">
                    <Image
                      src={post.image}
                      alt="post image"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className="rounded-md"
                    />
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-2xl text-white mb-2  leading-[110%] tracking-tighter">
                      {post.title}
                    </h3>
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{ __html: truncatedContent }}
                    className="text-[14px] leading-160 tracking-tighter text-gray-400 mt-4 mb-2"
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div>
                          <br />
                          {post.tags &&
                            post.tags.map((tagId: any) => {
                              const tagName = tags[tagId];
                              return (
                                <Link
                                  href={`/tags/${tagName}`}
                                  key={tagId}
                                  className="text-white mr-2"
                                >
                                  {tagName}
                                </Link>
                              );
                            })}
                          <p className="text-[12px] leading-160 tracking-tighter text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex-col">
                        {truncatedContent.length < post.content.length && (
                          <Link
                            href={`/blog/${post._id}`}
                            className="button text-[12px] tracking-tighter"
                          >
                            Read More
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="text-white">No posts found.</p>
      )}
    </>
  );
};

export default TagsCard;
