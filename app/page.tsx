import Uq from './components/Tems'
import Link from 'next/link'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { getBlogPosts } from './blog/utils'
import Image from 'next/image'
import ArtList from './work/ArtList'
import Sound from './components/Sound'

export default function Home() {

    return (
        <div className="min-h-screen">
            <Uq />
            <div className="flex justify-between mb-4">
                <div className="place-self-center text-xl font-bold">
                    <h2 className="text-gray-200 ">Recent Post:</h2>
                </div>
                <div>
                    <Link href="/blog">
                        <button className="dark:bg-neutral-900 px-5 py-2 border border-transparent transition duration-300 ease-in-out rounded-sm hover:border-zinc-800">
                            <CaretRightIcon className="h-4 w-4 transition-transform transform hover:translate-x-1" />
                        </button>
                    </Link>
                </div>
            </div>
            <FeaturedBlogPostsList />
            <div className="flex justify-between my-4">
                <div className="place-self-center text-xl font-bold">
                    <h2 className="text-gray-200 ">Recent Work:</h2>
                </div>
                <div>
                    <Sound>
                    <Link href="/work">
                        <button className="dark:bg-neutral-900 px-5 py-2 border border-transparent transition duration-300 ease-in-out rounded-sm hover:border-zinc-800">
                            <CaretRightIcon className="h-4 w-4 transition-transform transform hover:translate-x-1" />
                        </button>
                    </Link>
                    </Sound>
                </div>
            </div>
            <RecentWork />
        </div>
    )
}

const FeaturedBlogPostsList = async () => {
    const featuredPosts = await getBlogPosts()
    return (
        <>
            {featuredPosts
                .sort((a, b) => {
                    if (
                        new Date(a.metadata.publishedAt) >
                        new Date(b.metadata.publishedAt)
                    ) {
                        return -1
                    }
                    return 1
                })
                .slice(0, 3)
                .map((post) => (
                    <Link
                        key={post.slug}
                        className="group"
                        href={`/blog/${post.slug}`}
                    >
                        <div className="flex p-4 mb-4 bg-zinc-900 border border-transparent rounded-md duration-200 cursor-pointer  hover:dark:border-zinc-800">
                            <div className="relative justify-items-center">
                                <div className="w-16 h-16 overflow-hidden rounded-full">
                                    <Image
                                        src={
                                            post.metadata.image ||
                                            '/images/bg-noise.png'
                                        }
                                        alt="Background"
                                        className="w-full h-full rounded-full object-cover"
                                        width={200}
                                        height={200}
                                        quality={90}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full place-self-center ml-2">
                                <div className="font-semibold">
                                    {post.metadata.title}
                                </div>
                                <div className="text-sm text-zinc-500">
                                    {post.metadata.summary}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
        </>
    )
}

const RecentWork = () => {
    return (
        <figure>
            {ArtList.slice(0, 1).map((id) => (
                <Link
                    href="https://temycodes.vercel.app/"
                    key={id.title}
                    className="group"
                >
                    <div className="flex opacity-80 group-hover:opacity-100 mb-4 rounded-md">
                        <div className="w-full relative h-[240px] min-h-[240px] overflow-hidden place-self-center">
                            <div className="absolute left-8 bottom-4 z-10 py-2 px-4 text-xs md:text-sm font-semibold block rounded bg-black/70">
                                {id.title}
                            </div>
                            <Image
                                src={id.thumbnail || '/images/'}
                                alt={id.title}
                                className="object-center object-cover  rounded group-hover:scale-125 duration-300"
                                fill={true}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </figure>
    )
}
