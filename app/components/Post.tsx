import React from 'react';

interface PostProps {
    id: string;
    title: string;
    content: string | null;
    authorName: string | null;
}

const Post: React.FC<PostProps> = ({ id, title, content, authorName }) => {
    return (
        <div className="border border-cyan-200">
            <h3>{authorName ?? 'Unknown Author'}</h3>
            <h4>{title}</h4>
            <p>{content}</p>
        </div>
    );
};

export default Post;
