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
        title: 'E-commerce Interface',
        tags: 'React.js, JavaScript, Tailwind CSS',
        description:
            'A responsive e-commerce frontend designed to simulate a modern shopping experience with optimized UI flow and usability-focused design.',
        thumbnail: '/images/art/fintec.png',
        href: 'https://fintech-fe.netlify.app/',
        imgSrc: '/images/art/fintec.png',
        tooltip: 'Modern responsive e-commerce UI.',
    },
    {
        title: 'Multi-Step Sign-Up Flow',
        tags: 'Next.js, React Hook Form, Redux, Tailwind CSS',
        description:
            'A structured onboarding system that guides users through multi-step data collection with validation, state persistence, and clean UX.',
        thumbnail: '/images/art/sign-up-form.png',
        href: 'https://nextjs-step-form.vercel.app/',
        imgSrc: '/images/art/sign-up-form.png',
        tooltip: 'Multi-step onboarding with validation and state management.',
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
    {
        title: 'Admin Dashboard',
        tags: 'React.js, Recharts, React Day Picker',
        description:
            'A lightweight analytics dashboard for visualizing structured data with charts, filters, and calendar-based interaction.',
        thumbnail: '/images/art/dashboard.png',
        href: 'https://admin-dashboard-pied-chi.vercel.app/',
        imgSrc: '/images/art/dashboard.png',
        tooltip: 'Data visualization dashboard with charts and filters.',
    },
    {
        title: 'WordPress Client Projects',
        tags: 'WordPress',
        description:
            'A collection of production websites built for businesses and non-profits, focused on delivering responsive design, strong structure, and reliable content management.',
        thumbnail: '/images/art/mazoachi.png',
        href: 'https://mazoachi.com',
        imgSrc: '/images/art/mazoachi.png',
        tooltip: 'Business and NGO websites built with WordPress.',
    },
]

export default ProjectsData