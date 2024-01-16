import { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { IPost } from "../types/post";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface LatestBlogPostsProps {
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

const CategoryCard: React.FC<LatestBlogPostsProps> = ({ posts }) => {
  const [tags, setTags] = useState<{ [key: string]: string }>({});

  const calculateReadingTime = (content: any) => {
    const wordPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordPerMinute);
    return readingTimeMinutes;
  };

  function em_dash(text: string): string {
    if (text.includes("--")) {
      return "&mdash;" + text;
    } else {
      return text.replace("--", "&mdash;");
    }
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 blog-container gap-10  relative z-30 mb-5 mt-1">
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
                className="flex flex-col mt-3 z-10 blog-post cursor-pointer"
              >
                <div className="w-full relative aspect-w-2 aspect-h-1 h-64 mt-1 mb-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={post.image}
                      alt="post image"
                      fill
                      objectPosition="center"
                      className="rounded-md"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              <div className="px-3">
              <div className="flex w-[100%] flex-col text-left">
              <Link href={`/blog/${post.slug}`}>
                      <h3 className="blog-title mt-3 text-gray-300 font-medium capitalize md:mr-5 tracking-tight hover:text-fuchsia-200">
                        {em_dash(post.title)}
                      </h3>
                    </Link>
                  <div>
                    <p className="text-gray-600">
                      {calculateReadingTime(post?.content || "")} MIN
                    </p>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: truncatedContent }}
                  className="text-[1rem] leading-160 text-start mt-2 tracking-tighter text-gray-400 mb-2"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-[12px] leading-160 tracking-tighter text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex-col">
                      {truncatedContent.length < post.content.length && (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="button p-3 hover:text-fuchsia-200"
                        >
                          Read More
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="text-white">No posts found.</p>
      )}
    </>
  );
};

export default CategoryCard;
