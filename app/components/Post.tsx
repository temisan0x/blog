import React from 'react';

interface PostProps {
    id: string;
    title: string;
    content: string | null;
    authorName: string | null;
}

const Post: React.FC<PostProps> = ({ id, title, content, authorName }) => {
    return (
        <div style={{border: "1px solid black", padding: "15px", margin: "10px auto", width:"30%"}}>
            <h3>{authorName ?? 'Unknown Author'}</h3>
            <h4>{title}</h4>
            <p>{content}</p>
        </div>
    );
};

export default Post;
