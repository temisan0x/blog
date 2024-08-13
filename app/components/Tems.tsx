'use client'
import { MagicWandIcon } from '@radix-ui/react-icons'
import { ProfileImageLarge } from './ui/adminImg'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Uq() {

    return (
        <div className="py-12">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-start space-x-8 w-full flex-col gap-5 md:gap-0"
            >
                <div className="flex justify-normal space-x-5 w-full">
                    <motion.a
                        href="https://github.com/temisan0x"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative"
                    >
                        <ProfileImageLarge />
                        <div className="absolute h-8 w-8 bottom-2 -right-2 z-20">
                            <Image
                                src="/images/github.png"
                                alt="GitHub"
                                width={32}
                                height={32}
                                className="bg-white overflow-hidden rounded-full"
                            />
                        </div>
                    </motion.a>
                    <div>
                        <h2 className="text-xl font-medium leading-none">
                            Temisan Momodu
                        </h2>
                        <p className="text-gray-400 leading-none">
                            Jos, Nigeria
                        </p>
                        <span className="flex text-xs items-center leading-none text-emerald-400 border bg-emerald-900/50 rounded-full border-emerald-800 px-2 gap-2 w-36">
                            <MagicWandIcon/>
                            <p className="text-center">Web Developer</p>
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
