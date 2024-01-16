export interface IPost {
  map(arg0: (post: any) => import("react").JSX.Element): import("react").ReactNode;
  createdAt: string | number | Date;
  image: string | StaticImport; 
  _id: string;
  title: string;
  content: string;
  tags: { _id: string; name: string }[]; // Updated property name from "tag" to "tags"
  category: string[];
  author: string | { name: string };
  date: string;
  slug: string;
}
