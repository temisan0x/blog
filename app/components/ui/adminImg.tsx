import React from 'react'
import Image from 'next/image'
import TemisanProfile from '@/public/uploads/author.png'

const Temisan = () => {
    return (
        <Image
            src={TemisanProfile}
            quality={100}
            width={300}
            height={300}
            alt="A photo of Temisan"
            className="rounded-full object-fill"
        />
    )
}

export const ProfileImageLarge = () => {
    return (
        <div className="h-20 w-20 rounded-full transition group overflow-hidden transform relative justify-center group-hover:rotate-360 duration-200 items-center flex hover:border-zinc-900 border-zinc-700 border-2">
                <Temisan />
        </div>
    )
}
