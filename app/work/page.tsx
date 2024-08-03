import React from 'react'
import Card from '../components/Card'
import ProjectsData from './ArtList'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Work',
    description: 'The list of my work.'
}

export default function WorkPage() {
    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
