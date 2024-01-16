import React from 'react';
import Image from 'next/image';

interface AdminPostsProps {
  posts: Post[];
  currentPage: number;
  postsPerPage: number;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
  };
}

const MAX_CONTENT_LENGTH = 100;

const truncateHTMLContent = (html: string | undefined, maxLength: number): string => {
  if (!html) {
    return '';
  }
  const truncatedHTML = html.replace(/(<([^>]+)>)/gi, ''); // Remove HTML tags

  if (truncatedHTML.length <= maxLength) {
    return html;
  }
  const truncatedText = truncatedHTML.slice(0, maxLength) + '...';
  return html.replace(html, truncatedText);
};

const AdminPosts: React.FC<AdminPostsProps> = ({ posts, currentPage, postsPerPage }) => {
  return (
    <div className="text-white">
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <td className="border-bottom px-4 py-2">#</td>
            <th className="border-bottom px-4 py-2">Title</th>
            <th className="border-bottom px-4 py-2">Content</th>
            <th className="border-bottom px-4 py-2">Author</th>
            <th className="border-bottom px-4 py-2">Images</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post: Post, index: number) => {
            const truncatedContent = truncateHTMLContent(post.content, MAX_CONTENT_LENGTH);

            return (
              <tr key={post._id}>
                <td className="border-bottom px-4 py-2">{(currentPage - 1) * postsPerPage + index + 1}</td>
                <td className="border-bottom px-4 py-2">{post.title}</td>
                <td className="border-bottom px-4 py-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncatedContent,
                    }}
                    className="text-sm text-gray-400 mb-2 mt-1"
                  />
                </td>
                <td className="border-bottom px-4 py-2">{post.author?.name ?? "Temisan Momodu"}</td>
                <td className="border-bottom px-4 py-2">
                  <Image src={post.image} height={200} width={200} alt="Post Image" objectFit="cover" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPosts;
