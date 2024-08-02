import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from './utils';

function page() {
  return (
    <section className='min-h-screen'>
      <p className='pt-12'>Displays all blog posts</p>
      <BlogPosts/>
    </section>
  )
}

export default page;


const BlogPosts = async () =>  {
  const allBlogs = await getBlogPosts()
  return (
      <>
          {allBlogs
              .sort((a, b) => {
                  if (
                      new Date(a.metadata.publishedAt) >
                      new Date(b.metadata.publishedAt)
                  ) {
                      return -1
                  }
                  return 1
              })
              .map((post) => (
                  <Link
                      key={post.slug}
                      className="group"
                      href={`/blog/${post.slug}`}
                  >
                      <div className="flex p-4 mb-4  bg-white/5 border border-transparent rounded-md duration-200 cursor-pointer hover:translate-x-3 hover:dark:border-neutral-600/50">
                          <div className="relative justify-items-center">
                              <div className="w-16 h-16 rounded-full overflow-hidden">
                                  <Image
                                      src={
                                          post.metadata.image ||
                                          '/images/bg-noise.png'
                                      }
                                      alt="Background"
                                      className="w-full h-full rounded-full object-contain overflow-hidden"
                                      fill={true}
                                  />
                              </div>
                          </div>
                          <div className="flex flex-col w-full place-self-center ml-2">
                              <div className="font-semibold">
                                  {post.metadata.title}
                              </div>
                              <div className="text-sm text-zinc-500">
                                  {post.metadata.summary}
                              </div>
                          </div>
                      </div>
                  </Link>
              ))}
      </>
  )
}
