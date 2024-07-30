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
        thumbnail: "/uploads/TDTB.jpg",
        href: "https://temycodes.vercel.app/",
        imgSrc: "/uploads/TDTB.jpg",
        tooltip: "xploring The World Of Technology And Coding",
    },
    {
        title: 'Sign Up Form using Next js, Tailwindcss',
        tags: '',
        description: `Signup using Nexjs to Code Review`,
        thumbnail: '/images/art/hopplatemplate.png',
        href: 'work/hoppla',
        imgSrc: "/uploads/author.png",
        tooltip: "xploring The World Of Technology And Coding",

      },
      {
        title: 'Starwars characters ~ Api',
        tags: 'Reactjs, Typescript, react-lottie, react-redux and styled-components',
        description: `Signup using Nexjs to Code Review`,
        thumbnail: '/images/art/starwars.png',
        href: 'https://starwars-topaz.vercel.app/',
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