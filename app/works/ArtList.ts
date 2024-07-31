interface ArtList {
    title: string;
    tags: string;
    description: string;
    thumbnail: string;
    href?: string;
    imgSrc: string;
    tooltip: string;
}

const ProjectsData: ArtList[] = [
    {
        title: "Temycodes Tech Studio",
        tags: "blog",
        description: "Exploring The World Of Technology And Coding",
        thumbnail: "/images/art/temyblog.png",
        href: "https://temycodes.vercel.app/",
        imgSrc: "/images/art/temyblog.png",
        tooltip: "xploring The World Of Technology And Coding",
    },
    {
        title: 'Sign Up Form using Next js',
        tags: 'reactjs, axios, react-hook-form and react-redux',
        description: `Multi step form built with Nextjs and Tailwind CSS`,
        thumbnail: '/images/art/sign-up-form.png',
        href: 'https://nextjs-step-form.vercel.app/',
        imgSrc: "/images/art/sign-up-form.png",
        tooltip: "xploring The World Of Technology And Coding",

      },
      {
        title: 'Starwars characters ~ Api',
        tags: 'Reactjs, Typescript, axios, react-lottie, react-redux and styled-components',
        description: `Signup using Nexjs to Code Review`,
        thumbnail: '/images/art/starwars.png',
        href: 'https://starwars-topaz.vercel.app/',
        imgSrc: "/uploads/author.png",
        tooltip: "xploring The World Of Technology And Coding",

      },
      {
        title: 'Sign Up Form For Code Review',
        tags: 'wordpress',
        description: `CSS-Tricks Card Carousel`,
        thumbnail: '/images/art/card-carousel.png',
        href: 'https://codepen.io/heytemisan/pen/YzJzamK',
        imgSrc: "/uploads/author.png",
        tooltip: "xploring The World Of Technology And Coding",

      },
      {
        title: 'Sign Up Form For Code Review',
        tags: 'wordpress',
        description: `Signup using Nexjs to Code Review`,
        thumbnail: '/images/art/hopplatemplate.png',
        href: 'work/hoppla',
        imgSrc: "/uploads/author.png",
        tooltip: "xploring The World Of Technology And Coding",
      },
];

export default ProjectsData;