import React from 'react'
import Uq from '../components/Tems'
import ProjectsData from '../work/ArtList'
import Image from 'next/image'
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: 'About',
    description: 'A litle about me ',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <Uq />
            <About />
            <div className="p-4">
                <EduTL />
                <WorkList />
            </div>
        </div>
    )
}

function About() {
    return (
        <div className="p-4 border border-zinc-800 rounded-md">
            <h2 className="font-semibold">About Me</h2>
            <p className="text-sm prose dark:prose-invert">
                Hi, I’m Temy, a passionate MERN Stack developer based in Jos, Nigeria. With a love for coding, I specialize in MongoDB, Next.js, React.js, and Node.js. When I'm not diving into code, you might find me moderating the VLaunch community, exploring the latest in cryptocurrency, or writing technical articles.
            </p>
            <p className="text-sm prose mt-2 dark:prose-invert">
                My hobbies include writing, watching movies, and staying  with the evolving world of web3. I’m love to discuss philosophy, politics, or music. I strive to continuously improve my programming skills and stay at the forefront of tech innovations.
            </p>
        </div>
    )
}


const eduData = [
    {
        title: 'Technology Training Program',
        desc: 'A Year at Brytosoft: Garnered Experience in HTML, CSS, and PHP',
        year: '2020 - 2021',
        place: 'Nigeria',
    },
]

function EduTL() {
    return (
        <div className="grid gap-4 grid-cols-12">
            <div className="col-span-3">
                <div className="text-center mb-14">
                    <h3 className="text-lg font-semibold">Education</h3>
                </div>
            </div>
            <div className="relative space-y-6 col-span-9">
                <div className="space-y-12 relative px-4 col-span-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-3 before:dark:bg-neutral-800">
                    {eduData.map(({ title, desc, year, place }) => (
                        <div
                            key={title}
                            className="flex flex-col relative before:absolute before:top-[3px] before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] before:dark:bg-neutral-600"
                        >
                            <time className="text-xs tracking-wide uppercase text-gray-500">
                                {year}
                            </time>
                            <h3 className="text-md font-semibold tracking-wide">
                                {desc} at a {title}
                            </h3>
                            <p className="text-zinc-400 text-sm">{place}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function WorkList() {
    return (
        <div className="grid gap-4 grid-cols-12">
            <div className="col-span-3">
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Projects</h3>
                </div>
            </div>
            <div className="relative col-span-9 space-y-12">
                <div className="space-y-12 relative px-4 col-span-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-3 before:dark:bg-neutral-800">
                    {ProjectsData.slice(0, 3).map(
                        ({ title, href, imgSrc, description }: any) => (
                            <div
                                key={title}
                                className="flex flex-col relative before:absolute before:top-[3px] before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] before:dark:bg-neutral-600"
                            >
                                <Link href={href}>
                                    <h3 className="text-white hover:text-zinc-400 transition ease-in-out delay-100 inline-block">
                                        {title || 'undefined'}
                                    </h3>
                                </Link>
                                <p className="text-zinc-400 text-sm">
                                    {description}
                                </p>
                                <div className="h-24 w-full overflow-hidden rounded-md">
                                    <Image
                                        src={imgSrc || ''}
                                        alt=""
                                        width={400}
                                        height={400}
                                    />
                                </div>
                            </div>
                        )
                    )}
                     <div className="flex flex-col relative before:animate-pulse before:absolute before:top-4 before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] before:dark:bg-neutral-600">
                     <Link href='/work' className='border border-neutral-700 hover:bg-neutral-700/10 transition ease-in-out delay-100 rounded-md w-full text-center'><h3 className="text-md p-2 font-semibold ">See more</h3></Link>
                     </div>
                </div>
            </div>
        </div>
    )
}
