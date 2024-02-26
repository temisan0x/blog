'use client';

import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeletePostButton({postId}:any) {
    const router = useRouter();

    const handleClick = async() => {
        try {
            await axios(`/api/post/${postId}`, {
                method: 'DELETE',
            })
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <button onClick={handleClick} className="btn">Delete Post</button>
        </div>
    )
}