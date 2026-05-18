import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Image from 'next/image'
import { DrawingPinFilledIcon, Link2Icon } from '@radix-ui/react-icons'
import React from 'react'

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

interface ChildProps {
    children: React.ReactNode
}

interface ImgfullProps {
    alt: string
    src: string
    width: number
    height: number
}

interface FNProps {
    href: string
    id: string
    children: React.ReactNode
}

interface MiddleQuoteProps {
    children: React.ReactNode
    cite: string
}

function Table({ data }: { data: TableData }) {
    let headers = data?.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ))

    let rows = data?.rows.map((row, index) => (
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

function Imgfull({ src, alt, height, width }: ImgfullProps) {
    return (
        <div>
            <Image alt={alt} src={src} width={width} height={height}  loading="lazy"/>
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
            {source && (
                <div className="flex px-8 py-2 bg-neutral-900 border-t border-zinc-700">
                    <a href={href} className="text-blue-400 hover:underline flex items-center">
                        <Link2Icon className="inline mr-1" />
                        {source}
                    </a>
                </div>
            )}
        </div>
    );
}


function ImgLg(props: ImgProps) {
    return (
        <div className="my-8 w-full">
            <figure className="w-full relative">
                <img
                    src={props.src}
                    alt={props.alt}
                    className="w-full h-auto object-contain"
                />
                {props.caption && (
                    <figcaption className="mt-2 text-right text-sm dark:text-gray-500">
                        {props.caption}
                    </figcaption>
                )}
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

function BlueHighlighter({ children }: ChildProps) {
    return (
        <span className="italic text-white font-semibold border-b-2 border-sky-600">
            {children}
        </span>
    )
}

function FN({ id, href, children }: FNProps) {
    return (
        <a href={href} id={id} aria-describedby="footnote-label">
            {children}
        </a>
    )
}

function MiddleQuote({ children, cite }: MiddleQuoteProps) {
    return (
        <blockquote className="italic font-semibold text-center mb-4 text-gray-900 dark:text-white">
            {children}
            <cite className="text-sm">-{cite}</cite>
        </blockquote>
    )
}

function FNlist({ id, href, children }: FNProps) {
    return (
        <li id={id}>
            {children}
            <a href={href}>↩</a>
        </li>
    )
}

function Footarea({ children, id }: FNProps) {
    return (
        <div className="px-8 border-t border-b border-t-zinc-600 italic overflow-hidden tracking-tight footnote relative">
            <h2 id={id} className="footnote hidden invisible">
                {' '}
                Footnotes:{' '}
            </h2>
            <ol className="list-decimal italic">{children}</ol>
        </div>
    )
}

let components = {
    Table,
    PinnedMessage,
    ImgLg,
    Image: Imgfull,
    Relatepost,
    BlueHighlighter,
    MiddleQuote,
    FN,
    FNlist,
    Footarea,
}

export function CustomMdx(props: any) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || []) }}
        />
    )
}
