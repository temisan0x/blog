'use client' 

import React from "react";
import { motion } from "framer-motion";
import { IPost } from "../types/post";
import Image from "next/image";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../redux/slices/Bookmark.slice";
import { RootState } from "../redux/rootReducer";
import Link from "next/link";

interface PostCardProps {
  posts: IPost[];
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

const BookmarkPosts: React.FC<PostCardProps> = ({ posts }) => {
  const calculateReadingTime = (content: any) => {
    const wordPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordPerMinute);
    return readingTimeMinutes;
  };

  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmark);

  const isBookmarked = (postId: string) => {
    return bookmarks.some((bookmark: { id: string; }) => bookmark.id === postId);
  };

  function em_dash(text: string): string {
    if (text.includes("--")) {
      return "&mdash;" + text;
    } else {
      return text.replace("--", "&mdash;");
    }
  }

  return (
    <>
      {posts.length === 0 ? (
        <p className="text-gray-600">No bookmarked posts yet.</p>
      ) : (
        posts.map((post: IPost) => {
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
              <Link href={`/blog/${post.slug}`}>
                <div className="w-full relative aspect-w-2 aspect-h-1 h-64 mt-2 mb-4">
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
                          ); // Add bookmark
                        }
                      }}
                    />
                  </div>
                  <div className="relative w-full h-full">
                    <Image
                      src={post.image}
                      alt="post image"
                      fill
                      objectPosition="center"
                      className="rounded-md blog-post-image"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="px-3">
                  <div className="flex w-[100%] flex-col">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="blog-title text-gray-300 mt-3 font-medium capitalize md:mr-5 tracking-tight hover:text-fuchsia-200">
                        {em_dash(post.title)}
                      </h3>
                    </Link>
                    <div>
                      <p className="text-gray-400 font-bold text-sm mt-2">
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

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
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
              </Link>
            </motion.div>
          );
        })
      )}
    </>
  );
};

export default BookmarkPosts;
