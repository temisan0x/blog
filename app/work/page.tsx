import React from 'react'
import Card from '../components/Card'
import ProjectsData from './ArtList'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Work',
    description: 'The list of my work.',
}

export default function WorkPage() {
    return (
        <div className="min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-200">My Work</h1>
                <p className="prose text-base/[18px] text-gray-200 font-normal text">
                    Explore some of the projects I've worked on and
                    created over the years...
                </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {ProjectsData.map((p, index) => (
                    <Card
                        key={index}
                        title={p.title}
                        description={p.description}
                        projectType={p.tags}
                        projectImg={p.imgSrc}
                        href={p.href}
                        tooltip={p.description}
                    />
                ))}
            </div>
        </div>
    )
}
