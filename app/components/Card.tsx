'use client';

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';

interface Card {
    title: string
    description: string
    projectType: string
    projectImg: string
    href?: string
}

export default function Card({
    title,
    description,
    projectType,
    projectImg,
    href,
}: Card) {
    const content = (
        <motion.div
        whileHover={{ scale: 1.05 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-800 p-4 rounded-md shadow-md transition-shadow duration-300 hover:bg-gray-500/5 ease-in-out">
                <div className="flex justify-center items-center relative">
                    <Image
                        alt={title}
                        src={projectImg}
                        className="inset-0 object-cover bg-clip-border bg-black shadow-lg absolute h-full w-full"
                        width={544}
                        height={506}
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h4 className="text-sm font-semibold mb-2">{title}</h4>
                    <p className='text-sm prose tracking-tighter'>{description}</p>
                    <div className='text-sm'>
                        <p className='bg-slate-700 p-1 rounded-sm inline'>{projectType}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
    return href ? <a href={href}>{content}</a> : content
}
