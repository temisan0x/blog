import Uq from './components/tems'
import Link from 'next/link'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { getBlogPosts } from './blog/utils'
import Image from 'next/image'
// import FeaturedBlogPostsList from './components/FeaturedBlogPostsList'

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
                        <button className="dark:bg-neutral-900 px-5 py-2 hover:dark:border-neutral-600/5 border border-transparent transition duration-300 ease-in-out rounded-sm">
                            <CaretRightIcon />
                        </button>
                    </Link>
                </div>
            </div>
            <FeaturedBlogPostsList />
            <div className='flex justify-between my-4'>
                <div className="place-self-center text-xl font-bold">
                    <h2 className="text-gray-200 ">Recent Work:</h2>
                </div>
                <div>
                    <Link href="/blog">
                        <button className="dark:bg-neutral-900 px-5 py-2 hover:dark:border-neutral-600/5 border border-transparent transition duration-300 ease-in-out rounded-sm">
                            <CaretRightIcon />
                        </button>
                    </Link>
                </div>
            </div>
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
                .slice(0, 2)
                .map((post) => (
                    <Link
                        key={post.slug}
                        className="group"
                        href={`/blog/${post.slug}`}
                    >
                        <div className="flex p-4 mb-4  bg-white/5 border border-transparent rounded-md duration-200 cursor-pointer hover:translate-x-3 hover:dark:border-neutral-600/50">
                            <div className="relative justify-items-center">
                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                    <Image
                                        src={
                                            post.metadata.image ||
                                            '/images/bg-noise.png'
                                        }
                                        alt="Background"
                                        className="w-full h-full rounded-full object-contain overflow-hidden"
                                        fill={true}
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
