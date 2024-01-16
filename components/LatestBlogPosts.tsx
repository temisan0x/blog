import React, { useState } from "react";
import { IPost } from "../types/post";
import Image from "next/image";
import Loader from "./Loader";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../redux/slices/Bookmark.slice";
import { RootState } from "../redux/rootReducer";
import Link from "next/link";
import { motion } from "framer-motion";

interface LatestBlogPostsProps {
  posts: IPost[];
  loading: boolean;
}

const MAX_CONTENT_LENGTH = 100;
const truncateHTMLContent = (
  html: string | undefined,
  maxLength: number
): string => {
  if (!html) {
    return "";
  }
  const truncatedHTML = html.replace(/(<([^>]+)>)/gi, ""); 

  if (truncatedHTML.length <= maxLength) {
    return html;
  }
  const truncatedText = truncatedHTML.slice(0, maxLength) + "...";
  return html.replace(html, truncatedText);
};

const LatestBlogPosts: React.FC<LatestBlogPostsProps> = ({
  posts,
  loading,
}) => {
  const calculateReadingTime = (content: any) => {
    const wordPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordPerMinute);
    return readingTimeMinutes;
  };

  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmark);

  function em_dash(text: string): string {
    if (text.includes("--")) {
      return "&mdash;" + text;
    } else {
      return text.replace("--", "&mdash;");
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 blog-container gap-10  relative z-30 mb-5 mt-1">
      {posts.map((post: any) => {
        const truncatedContent = truncateHTMLContent(
          post.content,
          MAX_CONTENT_LENGTH
        );
        const isBookmarked = (postId: string) => {
          return bookmarks.some((bookmark) => bookmark.id === post._id);
        };
        return (
          <>
            {loading ? (
              <Loader />
            ) : (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col z-10 blog-post cursor-pointer"
              >
                <div className="w-full relative aspect-w-16-9 aspect-h-9 h-64 mt-1 mb-2">
                  <div className="bookmark-icon-container">
                    <BiSolidBookmarkHeart
                      color={isBookmarked(post._id) ? "red" : "black"}
                      size={30}
                      onClick={() => {
                        if (isBookmarked(post._id)) {
                          dispatch(removeBookmark(post._id)); // Remove bookmark
                        } else {
                          dispatch(
                            addBookmark({
                              id: post._id,
                              title: post.title,
                              _id: undefined,
                            })
                          ); 
                        }
                      }}
                    />
                  </div>
                  {/* <Image
                    src={post.image}
                    alt="post image"
                    fill
                    objectPosition="center"
                    className="rounded-md blog-post-image"
                    style={{
                      objectFit: "cover",
                    }}
                  /> */}
                </div>

                <div className="px-3">
                  <div className="flex w-[100%] flex-col">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="blog-title mt-3 text-gray-300 font-medium capitalize md:mr-5 tracking-tight hover:text-fuchsia-200">
                        {em_dash(post.title)}
                      </h3>
                    </Link>
                    <div>
                      <p className="text-gray-400 text-sm mt-2">
                        {calculateReadingTime(post?.content || "")} MIN
                      </p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-sm text-gray-400 my-3"
                    dangerouslySetInnerHTML={{ __html: truncatedContent }}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                      <div>
                        <Link
                          className="text-sm font-bold leading-160 tracking-tighter text-gray-400"
                          href={`/categories/${post.category?.slug}`}
                        >
                          #{post.category?.name ?? "unavailable"}
                        </Link>
                        <br />
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
                          href={`/blog/${post.slug}`}
                          className="button p-3 hover:text-fuchsia-200"
                        >
                          Read More
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default LatestBlogPosts;
