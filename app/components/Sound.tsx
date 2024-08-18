'use client'

import Link from 'next/link'
import React, { useRef } from 'react'

interface SoundProps {
    children: React.ReactNode
    href: string
}

function Sound({ children, href }: SoundProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    //function to play the sound
    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error('Failed to play audio', error)
            })
        }
    }

    return (
        <Link href={href} onClick={playSound}>
            {children}
            <audio ref={audioRef} src="../sound/clickSound.mp3" />
        </Link>
    )
}

export default Sound
