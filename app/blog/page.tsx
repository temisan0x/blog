import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from './utils'
import Sound from '../components/Sound'

function page() {
    return (
        <section className="min-h-screen">
            <p className="pt-12">Blog Archive</p>
            <BlogPosts />
        </section>
    )
}

export default page

const BlogPosts = async () => {
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
                    <Sound
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        soundScr='../sound/clickSound.mp3'
                    >
                        <div className="group flex p-4 mb-4  bg-zinc-900 border border-transparent rounded-md duration-200 cursor-pointer hover:translate-x-3 hover:dark:border-neutral-600/50">
                            <div className="relative justify-items-center">
                                <div className="w-16 h-16 overflow-hidden rounded-full">
                                    <Image
                                        src={
                                            post.metadata.image ||
                                            '/images/bg-noise.png'
                                        }
                                        alt="Background"
                                        className="w-full h-full rounded-full object-cover"
                                        width={200}
                                        height={200}
                                        quality={90}
                                        loading="lazy"
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
                    </Sound>
                ))}
        </>
    )
}
