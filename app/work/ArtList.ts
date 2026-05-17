interface ArtList {
    title: string
    tags: string
    description: string
    thumbnail: string
    href?: string
    imgSrc: string
    tooltip: string
}

const ProjectsData: ArtList[] = [
    {
        title: 'StripIt - Metadata Remover',
        tags: 'React, Node.js, Express, Cloudinary',
        description:
            'Built a privacy-first tool that removes embedded metadata from images and videos before sharing. Full-stack system with React frontend and Node.js backend, integrated with Cloudinary for secure media processing.',
        thumbnail: '/images/art/stripit.png',
        href: 'https://stripit-fe.vercel.app/',
        imgSrc: '/images/art/stripit.png',
        tooltip: 'Privacy tool that removes hidden metadata from media files.',
    },
    {
        title: 'Node Clip - Short-Form Video Generator',
        tags: 'React, API Integration',
        description:
            'A browser-based system for generating, managing, and exporting short-form video clips using the Clip Generator API. Built to streamline content production workflows.',
        thumbnail: '/images/art/clip-generator.png',
        href: 'https://nodeclip.vercel.app/',
        imgSrc: '/images/art/clip-generator.png',
        tooltip: 'Create and export short-form video clips in the browser.',
    },
    {
        title: 'Temycodes Tech Blog',
        tags: 'Next.js, TypeScript, MongoDB',
        description:
            'A scalable content platform for publishing technical articles and tutorials. Built for structured content delivery and developer education.',
        thumbnail: '/images/art/temyblog2.png',
        href: 'https://temycodes.vercel.app/',
        imgSrc: '/images/art/temyblog.png',
        tooltip: 'Developer-focused tech blog platform.',
    },
    {
        title: 'Star Wars API Explorer',
        tags: 'React.js, TypeScript, API Integration',
        description:
            'An interactive data exploration app that consumes and displays structured API data with advanced state handling and dynamic UI rendering.',
        thumbnail: '/images/art/starwars.png',
        href: 'https://starwars-topaz.vercel.app/',
        imgSrc: '/images/art/starwars.png',
        tooltip: 'Explore Star Wars character data via API.',
    },
]

export default ProjectsData
