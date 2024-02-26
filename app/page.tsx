import prisma from "@/lib/prisma";
import Post from "./components/Post";
import Link from "next/link";
import styles from "@/app/page.module.css";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className={`mx-auto text-center ${styles.main}`}>
      <h1 className="text-[50px]">Welcome to movie world!</h1>
      <Link href={"/add-post"} className=" my-10">
        Add Movie
      </Link>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            imageData={post.imageData}
            authorName={post.author?.name ?? null}
          />
        );
      })}
    </main>
  );
}
