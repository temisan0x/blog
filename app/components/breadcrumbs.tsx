'use client'

import { CaretRightIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import React from 'react'

type BreadcrumbsProps = {
    post?: { metadata: { title: string } }
}

export function Breadcrumbs({ post }: BreadcrumbsProps) {
    const pathname = usePathname();
    //Extract the last part of the URL path if the post metadata title is not specified
    const title = post?.metadata?.title || pathname.split('/').pop();

    return (
        <div className="flex relative items-center font-mono rounded bg-black/30 backdrop-blur-lg backdrop-saturate-50 mb-4 p-2 border border-zinc-800">
            <a href="/blog" className='text-teal-400 underline whitespace-nowrap'>dir ..</a>
            <span className="mx-2 text-yellow-400">
                <CaretRightIcon />
            </span>
            <p className='hover:text-clip truncate text-neutral-600 overflow-hidden'>{title}.mdx</p>
        </div>
    )
}
