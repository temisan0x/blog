import Blog from "../public/uploads/blogger.png";
import Bookmarked from "../public/uploads/bookmark.png";

export const profileData = [
  {
    id: 1,
    img: Blog,
    subtitle: "My",
    title: "Blog",
    bg: {
      color: "radial-gradient(rgb(219, 149, 97), rgb(197, 87, 2))",
    },
    ref: "/blog"
  },
  {
    id: 2,
    img: Bookmarked,
    subtitle: "check",
    title: "Bookmark",
    bg: {
      color: "linear-gradient(-90deg, rgb(69, 103, 178) 20%, rgb(138, 185, 255) 80%)",
    },
    ref: "/bookmarks"
  },
];
