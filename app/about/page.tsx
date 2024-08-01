import React from 'react';
import Uq from '../components/Tems';

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <Uq />
            <About />
            <div className="p-4">
                <EduTL />
            </div>
        </div>
    );
}

function About() {
    return (
        <div className="p-4 border border-zinc-800 rounded-md">
            <h2 className="font-semibold">About</h2>
            <p className="text-sm prose">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                cum neque possimus odit voluptates assumenda magnam dolorum id
                minus aliquam magni temporibus, quidem officiis facilis quisquam
                repellendus iure ad provident.
            </p>
        </div>
    );
}

const eduData = [
    {
        title: 'Technology Training Program',
        desc: 'A Year at Brytosoft: Garnered Experience in HTML, CSS, and PHP',
        year: '2020 - 2021',
        place: 'Nigeria',
    },
];

function EduTL() {
    return (
        <div className="grid gap-4 grid-cols-12">
            <div className="col-span-3">
                <div className="text-center text-left mb-14">
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
                                {desc} at {title}
                            </h3>
                            <p className="text-zinc-400 text-sm">{place}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
