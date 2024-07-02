import React from "react";
import Image from "next/image"; 
import TemisanProfile from "@/public/uploads/myimage.png"

const Temisan = () => {
    return (
        <Image 
        src={TemisanProfile}
        quality={95}
        width={300}
        height={300}
        alt="A photo of Temisan"
        className="rounded-full"
    />
    )
}

export const ProfileImageLarge = () => {
    return (
        <div className="group overflow-hidden transform transition">
            <div className="h-20 w-20 overflow-hidden rounded-full transition">
               <Temisan />
            </div>
        </div>
    );
};
