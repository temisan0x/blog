'use client'
import { MagicWandIcon } from '@radix-ui/react-icons'
import { ProfileImageLarge } from './ui/adminImg'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Uq() {
    return (
        <div className="py-12">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-start space-x-8"
            >
                <div className="flex items-center space-x-5">
                    <motion.a
                        href="https://github.com/temisan0x"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative"
                    >
                        <ProfileImageLarge />
                        <div className="absolute h-8 w-8 -bottom-2 -right-2 z-20">
                            <Image
                                src='/images/github.png'
                                alt="GitHub"
                                width={32}  // Adjusted to match h-8 w-8
                                height={32} // Adjusted to match h-8 w-8
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
                    </div>
                </div>

                <div>
                    <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex text-xs space-x-2.5 items-center leading-none text-fuchsia-400 border px-2.5 py-0.5 bg-fuchsia-900/50 rounded-full border-fuchsia-800 mb-3"
                    >
                        <MagicWandIcon />
                        <p>Front-end Web Developer</p>
                    </motion.span>
                    <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex space-x-2.5 text-xs items-center leading-none text-emerald-400 border px-2.5 py-0.5 bg-emerald-900/50 rounded-full border-emerald-800"
                    >
                        <MagicWandIcon />
                        <p>Junior Back-end Developer</p>
                    </motion.span>
                </div>
            </motion.div>
        </div>
    )
}
