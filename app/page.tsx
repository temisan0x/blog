import prisma from "@/lib/prisma";
import Post from "./components/Post";

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
    <main>
      <h1 style={{textAlign:"center"}}>Hello World!</h1>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorName={post.author?.name ?? null}
          />
        );
      })}
    </main>
  );
}
