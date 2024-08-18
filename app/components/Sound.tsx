'use client'

import Link from 'next/link'
import React, { useRef } from 'react'

interface SoundProps {
    children: React.ReactNode
    href: string
    soundScr: string
}

function Sound({ children, href, soundScr }: SoundProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    //function to play the sound
    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play().catch((error) => {
                console.error('Failed to play audio', error)
            })
        }
    }

    return (
        <Link href={href} onClick={playSound}>
            {children}
            <audio ref={audioRef} src={soundScr} />
        </Link>
    )
}

export default Sound
