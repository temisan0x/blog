import { MagicWandIcon } from '@radix-ui/react-icons'
import { ProfileImageLarge } from '../ui/adminImg'

export default function Uq() {
    return (
        <div className='py-12'>
            <div className="flex items-center justify-start space-x-8">
                <div className="flex items-center space-x-5">
                        <a href="/about">
                            <div>
                                <ProfileImageLarge />
                            </div>
                        </a>
                    <div className="">
                        <h2 className="text-xl font-medium leading-none">
                            Temisan Momodu
                        </h2>
                        <p className="text-gray-400 mt-1 leading-none">
                            Jos, Nigeria
                        </p>
                        <p className="text-3xl text-slate-300 mt-1 leading-none">
                            ❖
                        </p>
                    </div>
                </div>

                <div className="">
                    <span className="flex text-xs space-x-2.5 items-center leading-none text-fuchsia-400 border px-2.5 py-0.5 bg-fuchsia-900/50 rounded-full border-fuchsia-800 mb-3">
                        <MagicWandIcon />
                        <p>Front-end web developer</p>
                    </span>
                    <span className="flex space-x-2.5 text-xs items-center leading-none text-emerald-400 border px-2.5 py-0.5 bg-emerald-900/50 rounded-full border-emerald-800">
                        <MagicWandIcon />
                        <p>Junior Back-end developer</p>
                    </span>
                </div>
            </div>
        </div>
    )
}
