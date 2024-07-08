interface ArtList {
    title: string;
    tags: string;
    description: string;
    thumbnail: string;
    href?: string;
    imgScr: string;
}

const ProjectsData: ArtList[] = [
    {
        title: "Temycodes Tech Studio",
        tags: "blog",
        description: "Exploring The World Of Technology And Coding",
        thumbnail: "/uploads/author.png",
        href: "https://temycodes.vercel.app/",
        imgScr: "/uploads/author.png",
    },
    {
        title: 'Sign Up Form For Code Review',
        tags: 'Template Blogger',
        description: `Signup using Nexjs to Code Review`,
        thumbnail: '/images/art/hopplatemplate.png',
        href: 'work/hoppla',
        imgScr: "/uploads/author.png",
      },
];