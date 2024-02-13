'use client' 

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Parser from "html-react-parser";
import Image from "next/image";
import { FiTwitter, FiLinkedin, FiFacebook } from "react-icons/fi";
import Head from "next/head";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
} from "react-share";

interface IPost {
  slug: string;
  title: string;
  content: string;
  image: string | any;
  createdAt: string;
  author: string | { name: string };
}

const ReadMore = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get(`/api/posts?slug=${slug}`);
      const { data } = response;
      if (data.posts && data.posts.length > 0) {
        const matchingPost = data.posts.find((post: any) => post.slug === slug);
        if (matchingPost) {
          setPost(matchingPost);
          setLoading(false);
        } else {
          throw new Error(`Post not found`);
        }
      } else {
        throw new Error(`Post not found`);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }, [slug]);

  useEffect(() => {
    console.log("Loading post slug", slug);
    if (slug) {
      fetchPost();
    }
  }, [fetchPost, slug]);
  console.log("Post Image URL:", post?.image);

  const shareOnLinkedIn = () => {
    const url = `https://temycodes.vercel.app/blog/${slug}`;
    const title = post?.title || "Loading...";

    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
      "Share on LinkedIn",
      "width=600,height=400"
    );
  };

  const shareOnTwitter = () => {
    const url = `https://temycodes.vercel.app/blog/${slug}`;
    const title = post?.title || "Loading...";

    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      "Share on Twitter",
      "width=600,height=400"
    );
  };

  return (
    <>
      <Head>
        {/* Open Graph Meta Tags for Facebook */}
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content={`Check out this awesome blog post: ${post?.title}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.title || "Loading..."} />
        <meta
          property="og:description"
          content={post?.content || "Fallback description"}
        />
        <meta
          property="og:url"
          content={`https://temycodes.vercel.app/blog/${slug}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image" content={`${post?.image}?v=${Date.now()}`} />
        {/* Twitter Card Meta Tags for Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@temycodes" />{" "}
        {/* Replace with your Twitter handle */}
        <meta
          name="twitter:description"
          content={post?.content || "Check the awesome post"}
        />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:image" content={`${post?.image}`} />
        <meta
          name="twitter:url"
          content={`https://temycodes.vercel.app/blog/${slug}`}
        />
        <meta name="twitter:title" content={post?.title || "Loading..."} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Alt text for your image" />
      </Head>

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto py-10  mt-20 content">
          <div className="mx-auto">
            <div className="post-title">
              <h3 className="text-gray-400 py-4 md:font-semibold mx-auto max-w-4xl">
                {post?.title}
              </h3>
              <p className="text-[14px] leading-160 tracking-tighter text-gray-600 mb-4 ">
                {post &&
                  new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
              </p>
              <p className="text-3xl leading-160 tracking-tighter text-gray-400">
                {typeof post?.author === "object"
                  ? post.author?.name || "Temisan Momodu"
                  : post?.author || "Temisan Momodu"}
              </p>
            </div>
            <div className="w-full relative aspect-w-2 aspect-h-1 mt-2 mb-8 post-content">
              {loading ? (
                ""
              ) : (
                <div
                  className="relative w-full h-0"
                  style={{ paddingBottom: "50%" }}
                >
                  <Image
                    src={post?.image}
                    alt="post image"
                    fill
                    objectPosition="center"
                    className="rounded-md"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="content-wrapper">
              {post ? (
                <motion.div
                  className="share-icon-column"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <TwitterShareButton
                    url={`https://temycodes.vercel.app/blog/${slug}`}
                    title={post?.title || "Loading..."}
                    onClick={shareOnTwitter}
                  >
                    <FiTwitter />
                  </TwitterShareButton>

                  <LinkedinShareButton
                    url={`https://temycodes.vercel.app/blog/${slug}`}
                    title={post?.title || "Loading..."}
                    onClick={shareOnLinkedIn}
                  >
                    <FiLinkedin />
                  </LinkedinShareButton>
                  <FacebookShareButton
                    url={`https://temycodes.vercel.app/blog/${slug}`}
                    quote={post?.title || "Loading..."}
                  >
                    <FiFacebook />
                  </FacebookShareButton>
                </motion.div>
              ) : null}
              <div className="flex-1 overflow post-content-container text-gray-400 mb-4 md:mb-0">
                {Parser(post?.content || "")}
              </div>
            </div>
          </div>
          {post ? (
            <div className="share-icon-row">
              <TwitterShareButton
                url={`https://temycodes.vercel.app/blog/${slug}`}
                title={post?.title || "Loading..."}
                onClick={shareOnTwitter}
              >
                <FiTwitter />
              </TwitterShareButton>

              <LinkedinShareButton
                url={`https://temycodes.vercel.app/blog/${slug}`}
                title={post?.title || "Loading..."}
                onClick={shareOnLinkedIn}
              >
                <FiLinkedin />
              </LinkedinShareButton>

              <FacebookShareButton
                url={`https://temycodes.vercel.app/blog/${slug}`}
                quote={post?.title || "Loading..."}
              >
                <FiFacebook />
              </FacebookShareButton>
            </div>
          ) : null}
        </div>
      )}
      <div
        className="flex items-center justify-center bg-slate-600 py-5"
        style={{ color: "rgba(255, 255, 255, 0.5)" }}
      >
        <p className="text-base mr-2">Thanks for Reading! </p>
        <svg
          viewBox="0 0 16 16"
          style={{
            transition: "fill 0.3s ease 0s, stroke 0.3s ease 0s",
            verticalAlign: "middle",
            fill: "currentcolor",
            stroke: "rgba(0, 0, 0, 0)",
            strokeWidth: "0px",
            overflow: "visible",
            width: "1em",
            height: "1em",
          }}
        >
          <g>
            <path d="M16,6c0,4.4-8,10-8,10S0,10.4,0,6c0-0.4,0-0.9,0-1.5C-0.2,2,2,0,4.5,0C5.9,0,7.2,1,8,2c0.8-1,2.1-2,3.5-2C14,0,16.2,2,16,4.5C16,5.1,16,5.6,16,6z"></path>
          </g>
        </svg>
      </div>
    </>
  );
};

export default ReadMore;
