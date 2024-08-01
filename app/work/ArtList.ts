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
      title: "Temycodes Tech Blog",
      tags: "Next.js, TypeScript, MongoDB",
      description: "A comprehensive tech blog project built with Next.js, TypeScript, and MongoDB, featuring articles and tutorials.",
      thumbnail: "/images/art/temyblog2.png",
      href: "https://temycodes.vercel.app/",
      imgSrc: "/images/art/temyblog.png",
      tooltip: "Tech Blog built with Next.js, TypeScript, and MongoDB",
  },
  {
      title: "Multi-Step Sign Up Form",
      tags: "Next.js, JavaScript, Tailwind CSS",
      description: "A dynamic multi-step form using Next.js, axios, react-hook-form, react-redux, and Tailwind CSS.",
      thumbnail: "/images/art/sign-up-form.png",
      href: "https://nextjs-step-form.vercel.app/",
      imgSrc:"/images/art/sign-up-form.png",
      tooltip: "Multi-step form with Next.js, axios, react-hook-form, react-redux, and Tailwind CSS",
  },
  {
      title: "Star Wars Characters API",
      tags: "React.js, TypeScript, Star Wars API",
      description: "An interactive app displaying Star Wars characters, built with React.js, TypeScript, axios, react-lottie, react-redux, and styled-components.",
      thumbnail: '/images/art/starwars.png',
      href: 'https://starwars-topaz.vercel.app/',
      imgSrc:'/images/art/starwars.png',
      tooltip: "Star Wars character viewer built with React.js, TypeScript, and styled-components",
  },
  {
      title: "CSS-Tricks Card Carousel",
      tags: "HTML, CSS",
      description: "A responsive card carousel implemented using pure HTML and CSS, inspired by CSS-Tricks.",
      thumbnail: '/images/art/card-carousel.png',
      href: 'https://codepen.io/heytemisan/pen/YzJzamK',
      imgSrc: '/images/art/card-carousel.png',
      tooltip: "Responsive card carousel using HTML and CSS",
  },
  {
      title: "First Yumaj Nigeria Limited",
      tags: "WordPress",
      description: "Corporate website for an integrated services company, built with WordPress.",
      thumbnail: '/images/art/firstyumaj.png',
      href: 'https://firstyumaj.org/',
      imgSrc: '/images/art/firstyumaj.png',
      tooltip: "Corporate website built with WordPress",
  },
  {
      title: "Modipac for Peace & Charity",
      tags: "WordPress",
      description: "A non-profit organization website focused on peace and charity, built with WordPress.",
      thumbnail: '/images/art/modipac.png',
      href: 'https://www.modipac.org.ng/',
      imgSrc: '/images/art/modipac.png',
      tooltip: "Non-profit organization website built with WordPress",
  },
  {
      title: "Mazoachi Integrated Services",
      tags: "WordPress",
      description: "A business website for Mazoachi Integrated Services, built with WordPress.",
      thumbnail: '/images/art/mazoachi.png',
      href: 'https://mazoachi.com',
      imgSrc: '/images/art/mazoachi.png',
      tooltip: "Business website built with WordPress",
  },
];

export default ProjectsData;
