import { motion } from "framer-motion";
import Image from "next/image";
import styles from "@/app/page.module.css";
import { BlogPosts } from "@/app/components/posts";
import { formatDate, getBlogPosts } from "../utils";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/app/components/breadcrumbs";

export async function generateStaticParams (){
  let posts = getBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }))
}

const FetchPost = ({ params }: { params: { slug: string } }) => {
  let post = getBlogPosts().find((post)=> post.slug === params.slug);
  if(!post){
    notFound();
  }
  return (
   
    <div>
       <Breadcrumbs post={post}/>
       <div>
        <time className="oldstyle-nums" dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt)}</time>
       </div>
    </div>
  );
};

export default FetchPost;
