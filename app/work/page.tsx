import React from 'react'
import Card from '../components/Card'
import ProjectsData from './ArtList'

export default function WorkPage() {
    return (
        <div className='min-h-screen'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ProjectsData.map((p, index) => (
                    <Card
                        key={index}
                        title={p.title}
                        description={p.tags}
                        projectType={p.tags}
                        projectImg={p.thumbnail}
                        href={p.href}
                    />
                ))}
            </div>
        </div>
    )
}
