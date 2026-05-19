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
import React from 'react'

function Table({ data, ...props }: { data: { headers: string[]; rows: string[][] } }) {
    return (
        <table {...props} className="w-full table-auto border-collapse">
            <thead>
                <tr>
                    {data.headers.map((h) => (
                        <th key={h} className="border px-2 py-1 text-left">
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((r, i) => (
                    <tr key={i}>
                        {r.map((c, j) => (
                            <td key={j} className="border px-2 py-1">
                                {c}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

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

    let currentIndex = posts.findIndex((post) => post.slug === params.slug)

    const tableData = {
        headers: ['Option', 'Action', 'Outcome'],
        rows: [
            ['Option A', 'Fire 90% of your team, use AI alone', 'Same output as before'],
            ['Option B', 'Keep your team + use AI as a multiplier', 'Ship 10x more than competitors'],
        ],
    };

   return (
        <article className="prose prose-quoteless prose-neutral dark:prose-invert mb-10">
            <CustomMdx 
                source={post.content} 
                components={{
                    Table: (props: any) => <Table {...props} data={tableData} />
                }}
            />
        </article>
    )
}

export default FetchPost
