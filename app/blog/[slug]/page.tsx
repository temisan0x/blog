import { formatDate, getBlogPosts } from '../utils'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import {
    ArrowRightIcon,
    CalendarIcon,
    ChatBubbleIcon,
} from '@radix-ui/react-icons'
import { CustomMdx } from '@/app/components/mdx'
import Comments from '@/app/components/Comment'
import Link from 'next/link'


export async function generateStaticParams() {
    let posts = getBlogPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

const FetchPost = ({ params }: { params: { slug: string } }) => {
    let posts = getBlogPosts()
    let post = posts.find((post) => post.slug === params.slug)
    if (!post) {
        notFound()
    }

    // Find the index of the current post
    let currentIndex = posts.findIndex((post) => post.slug === params.slug)

    // Determine the next post (if it exists)
    let nextPost = posts[currentIndex + 1]
    return (
        <div className="min-h-screen">
            <Breadcrumbs post={post} />
            <div className="flex items-center gap-x-2 font-mono dark:text-neutral-400 mb-2 text-sm">
                <CalendarIcon />
                <time
                    className="oldstyle-nums"
                    dateTime={post.metadata.publishedAt}
                >
                    {formatDate(post.metadata.publishedAt)}
                </time>
                <ChatBubbleIcon />
                <Link href="#comments">
                    <p className="text-teal-400">Comments</p>
                </Link>
            </div>
            <h1 className="font-medium text-2xl tracking-tighter ">
                {post.metadata.title}
            </h1>
            {/* <p className="my-4 italic">{post.metadata.summary}</p> */}

            <article className="prose prose-quoteless prose-neutral dark:prose-invert mb-10">
                <CustomMdx source={post.content} />
            </article>
            {nextPost && (
                <div className="my-8">
                    <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <Link href={`/blog/${nextPost?.slug}`}>
                        <div className="link-card p-4 bg-zinc-900 rounded-md transition duration-200 delay-300 no-underline">
                            <h3 className="text-lg font-semibold">
                                {nextPost.metadata.title}
                            </h3>
                            <div className="flex">
                                <p className="text-sm text-gray-400">
                                    {nextPost.metadata.summary}
                                </p>
                                <div className="continue-link flex items-center ml-2 text-sm no-underline">
                                    <span>Continue</span>
                                    <ArrowRightIcon />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
            {/* <Comments /> */}
        </div>
    )
}

export default FetchPost
