import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Image from 'next/image'
import { DrawingPinFilledIcon, Link2Icon } from '@radix-ui/react-icons'

interface TableData {
    headers: string[]
    rows: string[][]
}

interface PinnedMessageData {
    href?: string
    source?: string
    children: React.ReactNode
}

interface ImgProps {
    alt: string
    src: string
    caption?: string | JSX.Element
}

interface RelatePostProps {
    href?: any
    title: string
    desc: string
    img?: string
    date: string
}

interface BlueHighlightProps {
   children: React.ReactNode 
}

function Table({ data }: { data: TableData }) {
    let headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ))

    let rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => {
                return <td key={cellIndex}>{cell}</td>
            })}
        </tr>
    ))

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

function Imgfull({ prop }: any) {
    return (
        <div>
            <Image alt={prop} {...prop} />
        </div>
    )
}

function PinnedMessage({ href, source, children }: PinnedMessageData) {
    return (
        <div className="relative border tracking-tight text-pretty rounded-md border-zinc-800 my-8">
            <span className="absolute flex -right-4 h-12 w-12 overflow-hidden rounded-full -top-4 justify-center items-center">
                <span className="bg-blue-400 absolute h-full w-full rounded-full animate-ping inline-flex"></span>
                <span className="bg-blue-500 h-8 w-8 relative inline-flex justify-center items-center rounded-full">
                    <DrawingPinFilledIcon />
                </span>
            </span>
            <div className="p-8">{children}</div>
            <div className="flex px-8 py-2 bg-neutral-900 border-t border-zinc-700">
                <a href={href}>
                    <Link2Icon className="inline mr-1" />
                    {source}
                </a>
            </div>
        </div>
    )
}

function ImgLg(props: ImgProps) {
    return (
        <div className="my-8 md:my-36 md:scale-125 lg:scale-150">
            <figure className="w-full relative h-96">
                <img
                    src={props.src}
                    alt={props.alt}
                    className="w-full h-full object-cover absolute inset-0"
                />
                <figcaption className="mt-2 mr-2 float-right relative p-2 bg-slate-500/4 animate-bounce dark:text-gray-500">
                    <p> {props.caption}</p>
                </figcaption>
            </figure>
        </div>
    )
}

function Relatepost({ title, href, desc, img, date }: RelatePostProps) {
    return (
        <Link href={href} className="no-prose">
            <div className="flex items-center border border-zinc-800 m-auto w-full overflow-hidden rounded-md">
                <div className="flex-none w-48 h-32 relative">
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-full object-fit inset-0 absolute"
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col ml-4">
                    <span className="font-semibold underline">{title}</span>
                    <span className="text-sm">{desc}</span>
                    <time className="text-sm dark:text-gray-500">{date}</time>
                </div>
            </div>
        </Link>
    )
}

function BlueHighlighter({ children }:BlueHighlightProps) {
    return (
        <span className="bg-gray-500 italic text-black font-semibold border-b-2 border-sky-600">
            {children}
        </span>
    )
}

let components = {
    Table,
    PinnedMessage,
    ImgLg,
    Image: Imgfull,
    Relatepost,
    BlueHighlighter,
}

export function CustomMdx(props: any) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || []) }}
        />
    )
}
