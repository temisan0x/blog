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
        title: 'Temycodes Tech Blog',
        tags: 'Next.js, TypeScript, MongoDB',
        description:
            'A comprehensive tech blog project built with Next.js, TypeScript, and MongoDB, featuring articles and tutorials.',
        thumbnail: '/images/art/temyblog2.png',
        href: 'https://temycodes.vercel.app/',
        imgSrc: '/images/art/temyblog.png',
        tooltip: 'Tech blog built with Next.js, TypeScript, and MongoDB.',
    },
    {
        title: 'E-commerce Website',
        tags: 'React.js, JavaScript, Tailwind CSS',
        description:
            'A responsive e-commerce website built using React.js, JavaScript, and Tailwind CSS.',
        thumbnail: '/images/art/fintec.png',
        href: 'https://fintech-fe.netlify.app/',
        imgSrc: '/images/art/fintec.png',
        tooltip: 'Responsive e-commerce site built with React.js and Tailwind CSS.',
    },
    {
        title: 'Todo List App',
        tags: 'HTML, CSS, JavaScript',
        description:
            'A todo list app built with vanilla JavaScript, using the JSONPlaceholder API for demo data.',
        thumbnail: '/images/art/fintec.png',
        href: 'https://minimalist-todo-azure.vercel.app/',
        imgSrc: '/images/art/todo.png',
        tooltip: 'Simple todo list app built with vanilla JavaScript.',
    },
    {
        title: 'Calculator App',
        tags: 'HTML, CSS, JavaScript',
        description:
            'A dynamic calculator application built using HTML, CSS, and JavaScript.',
        thumbnail: 'https://calculate-js-azure.vercel.app/',
        imgSrc: '/images/art/calculator.png',
        tooltip: 'Dynamic calculator app built with HTML, CSS, and JavaScript.',
    },
    {
        title: 'Admin Dashboard',
        tags: 'React.js, JavaScript, Tailwind CSS',
        description:
            'A simple dashboard built with React.js, React Day Picker, and Recharts.',
        thumbnail: '/images/art/dashboard.png',
        href: 'https://admin-dashboard-pied-chi.vercel.app/',
        imgSrc: '/images/art/dashboard.png',
        tooltip: 'Dashboard built with React.js, Day Picker, and Recharts.',
    },
    {
        title: 'Bonsai Clone',
        tags: 'HTML, CSS, JavaScript',
        description:
            'A desktop-only clone of the Bonsai website, focused on pricing plans, navigation, and UI elements.',
        thumbnail: 'https://bonsai-ui.netlify.app/',
        imgSrc: '/images/art/Bonsai.png',
        tooltip: 'Bonsai website clone focused on UI, pricing, and navigation.',
    },
    {
        title: 'Multi-Step Sign-Up Form',
        tags: 'Next.js, JavaScript, Tailwind CSS',
        description:
            'A dynamic multi-step form built with Next.js, Axios, React Hook Form, Redux, and Tailwind CSS.',
        thumbnail: '/images/art/sign-up-form.png',
        href: 'https://nextjs-step-form.vercel.app/',
        imgSrc: '/images/art/sign-up-form.png',
        tooltip: 'Multi-step form built with Next.js, Axios, Redux, and Tailwind CSS.',
    },
    {
        title: 'Star Wars Characters API',
        tags: 'React.js, TypeScript, Star Wars API',
        description:
            'An interactive app displaying Star Wars characters, built with React.js, TypeScript, Axios, Lottie, Redux, and styled-components.',
        thumbnail: '/images/art/starwars.png',
        href: 'https://starwars-topaz.vercel.app/',
        imgSrc: '/images/art/starwars.png',
        tooltip: 'Star Wars character viewer built with React.js and styled-components.',
    },
    {
        title: 'CSS-Tricks Card Carousel',
        tags: 'HTML, CSS',
        description:
            'A responsive card carousel built with pure HTML and CSS, inspired by CSS-Tricks.',
        thumbnail: '/images/art/card-carousel.png',
        href: 'https://codepen.io/heytemisan/pen/YzJzamK',
        imgSrc: '/images/art/card-carousel.png',
        tooltip: 'Responsive card carousel using only HTML and CSS.',
    },
    {
        title: 'First Yumaj Nigeria Limited',
        tags: 'WordPress',
        description:
            'Corporate website for an integrated services company, built with WordPress.',
        thumbnail: '/images/art/firstyumaj.png',
        href: 'https://firstyumaj.org/',
        imgSrc: '/images/art/firstyumaj.png',
        tooltip: 'Corporate site built with WordPress.',
    },
    {
        title: 'Modipac for Peace & Charity',
        tags: 'WordPress',
        description:
            'Non-profit organization website focused on peace and charity, built with WordPress.',
        thumbnail: '/images/art/modipac.png',
        href: 'https://www.modipac.org.ng/',
        imgSrc: '/images/art/modipac.png',
        tooltip: 'Non-profit site built with WordPress.',
    },
    {
        title: 'Mazoachi Integrated Services',
        tags: 'WordPress',
        description:
            'Business website for Mazoachi Integrated Services, built with WordPress.',
        thumbnail: '/images/art/mazoachi.png',
        href: 'https://mazoachi.com',
        imgSrc: '/images/art/mazoachi.png',
        tooltip: 'Business website built with WordPress.',
    },
]

export default ProjectsData
