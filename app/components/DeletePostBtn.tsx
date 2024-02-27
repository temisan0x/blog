'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePostButton({ postId }: any) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        try {
            setIsDeleting(true);
            await axios(`/api/post/${postId}`, {
                method: 'DELETE',
            });
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <button onClick={handleClick} className="btn" disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Post'}
            </button>
        </div>
    );
}
