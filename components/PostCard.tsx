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
  post: IPost;
}

const MAX_CONTENT_LENGTH = 200;

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

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const calculateReadingTime = (content: any) => {
    const wordPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordPerMinute);
    return readingTimeMinutes;
  };

  const truncatedContent = truncateHTMLContent(
    post.content,
    MAX_CONTENT_LENGTH
  );

  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmark);

  const isBookmarked = (postId: string) => {
    return bookmarks.some((bookmark) => bookmark.id === post._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col text-white rounded-lg z-40"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="mb-4 relative"
      >
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
        <Image src={post.image} alt="post image" width={800} height={500} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <p className="text-sm text-gray-400 mb-2 mt-2">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h2 className="text-2xl sm:3xl md:text-4xl font-bold mb-2 capitalize md:mr-5">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-base md:text-lg text-gray-400 mb-2 mt-4"
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
        <p className="text-gray-600">
          {calculateReadingTime(post?.content || "")} MIN
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PostCard;
