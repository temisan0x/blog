import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Image from 'next/image'
import { DrawingPinFilledIcon } from '@radix-ui/react-icons'

interface TableData {
    headers: string[]
    rows: string[][]
}

interface PinnedMessageData {
    href?: string;
    source?: string;
    children: React.ReactNode;
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

function PinnedMessage({ href, source, children }:PinnedMessageData) {
    return (
        <div className="relative border tracking-tight text-pretty rounded-md border-zinc-800 my-8">
            <span className="absolute flex -right-4 h-12 w-12 overflow-hidden rounded-full -top-4 justify-center items-center">
                <span className="bg-blue-400 absolute h-full w-full rounded-full animate-ping inline-flex"></span>
                <span className='bg-blue-500 h-8 w-8 relative inline-flex justify-center items-center rounded-full'>
                    <DrawingPinFilledIcon />
                </span>
            </span>
            <div className='p-8'>{children}</div>
            <div>

            </div>
        </div>
    )
}

function ImgLg() {}

function Relatepost() {}

function blueHighlighter() {}

let components = {
    Table,
    PinnedMessage,
    ImgLg,
    Relatepost,
    blueHighlighter,
}

export function CustomMdx(props: any) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || []) }}
        />
    )
}
