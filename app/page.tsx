'use client'

import React, { useEffect, useState } from 'react'
import Uq from './components/tems'
import Link from 'next/link'
import { CaretRightIcon } from '@radix-ui/react-icons'

export default function Home() {
    return (
        <div className="min-h-screen">
            <Uq />
            <div className="flex justify-between mb-4">
                <div className='place-self-center text-xl font-bold'>
                    <h2 className='text-gray-200 '>Recent Post:</h2>
                </div>
                <div>
                    <Link href="/blog">
                        <button className="dark:bg-neutral-900 px-5 py-2 hover:dark:border-neutral-600/5 border border-transparent transition duration-300 ease-in-out rounded-sm">
                            <CaretRightIcon />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
