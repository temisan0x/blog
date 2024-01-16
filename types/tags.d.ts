import { IPost } from "./post";

export interface ITags {
    posts:IPost[];
    name: string;
    slug: string;
}