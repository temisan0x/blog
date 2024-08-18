'use client'

import Link from 'next/link'
import React, { useRef } from 'react'

interface SoundProps {
    children: React.ReactNode
}

function Sound({ children }: SoundProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    //function to play the sound
    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play()
        }
    }

    return (
        <Link href={'/work'} onClick={playSound}>
            {children}
            <audio ref={audioRef} src="/public/sound/clickSound.mp3" />
        </Link>
    )
}

export default Sound
