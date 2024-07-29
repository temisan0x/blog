interface ArtList {
    title: string;
    tags: string;
    description: string;
    thumbnail: string;
    href?: string;
    imgSrc: string;
}

const ProjectsData: ArtList[] = [
    {
        title: "Temycodes Tech Studio",
        tags: "blog",
        description: "Exploring The World Of Technology And Coding",
        thumbnail: "/uploads/TDTB.jpg",
        href: "https://temycodes.vercel.app/",
        imgSrc: "/uploads/TDTB.jpg",
    },
    {
        title: 'Sign Up Form For Code Review',
        tags: 'Temr',
        description: `Signup using Nexjs to Code Review`,
        thumbnail: '/images/art/hopplatemplate.png',
        href: 'work/hoppla',
        imgSrc: "/uploads/author.png",
      },
      {
        title: 'Sign Up Form For Code Review',
        tags: 'sol',
        description: `Signup using Nexjs to Code Review`,
        thumbnail: '/images/art/hopplatemplate.png',
        href: 'work/hoppla',
        imgSrc: "/uploads/author.png",
      },
      {
        title: 'Sign Up Form For Code Review',
        tags: 'jonz',
        description: `Signup using Nexjs to Code Review`,
        thumbnail: '/images/art/hopplatemplate.png',
        href: 'work/hoppla',
        imgSrc: "/uploads/author.png",
      },
      {
        title: 'Sign Up Form For Code Review',
        tags: 'jonz',
        description: `Signup using Nexjs to Code Review`,
        thumbnail: '/images/art/hopplatemplate.png',
        href: 'work/hoppla',
        imgSrc: "/uploads/author.png",
      },
];

export default ProjectsData;