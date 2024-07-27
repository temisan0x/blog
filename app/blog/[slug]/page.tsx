import { motion } from 'framer-motion'
import styles from '@/app/page.module.css'
import { BlogPosts } from '@/app/components/posts'
import { formatDate, getBlogPosts } from '../utils'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import { CalendarIcon, ChatBubbleIcon } from '@radix-ui/react-icons'
import { CustomMdx } from '@/app/components/mdx'
import Comments from '@/app/components/Comment'

export async function generateStaticParams() {
    let posts = getBlogPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

const FetchPost = ({ params }: { params: { slug: string } }) => {
    let post = getBlogPosts().find((post) => post.slug === params.slug)
    if (!post) {
        notFound()
    }
    return (
        <div>
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
                <p className="text-teal-400">Comment</p>
            </div>
            <h1 className="font-medium text-2xl tracking-tighter ">
                {post.metadata.title}
            </h1>
            <p className='my-4 italic'>{post.metadata.summary} Okay Okay</p>

            <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                <CustomMdx source={post.content}/>
                <hr className="mb-4" />
                <Comments/>
            </article>
        </div>
    )
}

export default FetchPost
