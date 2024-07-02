'use client'

import React, { useEffect, useState } from 'react'
import Post from './components/Post'
import styles from '@/app/page.module.css'
import Uq from './components/tems'
import { MagicWandIcon } from '@radix-ui/react-icons'

interface PostProps {
    author: any
    id: string
    title: string
    content: string | ''
    authorName: string | null
    imageData: string | undefined | { url: string } | any
    slug: string
    category: string
}

export default function Home() {
    const [posts, setPosts] = useState([])

    return (
        <>
            <div className="flex items-start justify-start space-x-8">
                <div className="flex items-start space-x-5">
                    <Uq />
                    <div className=''>
                        <h2 className="text-xl font-medium">Temisan Momodu</h2>
                        <p className="text-gray-400">Jos, Nigeria</p>
                        <p className='text-3xl text-slate-300'>❖</p>
                    </div>
                </div>

                <div className=''>
                    <span className="flex space-x-2.5 items-center text-fuchsia-400 border px-2.5 py-0.5 bg-fuchsia-900/50 rounded-full border-fuchsia-800 mb-3">
                        <MagicWandIcon />
                        <p>Front-end web developer</p>
                    </span>
                    <span className="flex space-x-2.5 items-center text-emerald-400 border px-2.5 py-0.5 bg-emerald-900/50 rounded-full border-emerald-800">
                        <MagicWandIcon />
                        <p>Junior Back-end developer</p>
                    </span>
                </div>
            </div>
        </>
    )
}
