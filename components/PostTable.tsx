import Image from "next/image";
import React from "react";
import PageLoader from "./PageLoader";

const MAX_CONTENT_LENGTH = 100; // Maximum number of characters for content

const PostTable = ({
  posts,
  handleDeletePost,
  handleEditPost,
  fetchPosts,
  currentPage,
  setCurrentPage,
  totalPages,
  status,
}: any) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPosts();
  };

  const postsPerPage = 10;

  if (status === "loading") {
    return <PageLoader />;
  }

  const confirmDeletePost = (postId: string) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (shouldDelete) {
      handleDeletePost(postId);
    }
  };

  return (
    <div className=" p-0 sm:p-8 z-10 overflow-x-auto shadow-md sm:rounded-lg ml-2">
      <table className="w-full rounded-lg">
        <thead>
          <tr className="text-gray-400">
            <td className="border-bottom px-4 py-2">#</td>
            <th className="border-bottom px-4 py-2">Title</th>
            <th className="border-bottom px-4 py-2">Content</th>
            <th className="border-bottom px-4 py-2">Author</th>
            <th className="border-bottom px-4 py-2">images</th>
            <th className="border-bottom px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post: any, index: number) => {
            const truncatedContent = truncateHTMLContent(
              post.content,
              MAX_CONTENT_LENGTH
            );

            return (
              <tr key={post._id}>
                <td className="border-bottom px-4 py-2 text-gray-400">
                  {(currentPage - 1) * postsPerPage + index + 1}
                </td>
                <td className="border-bottom px-4 text-gray-400 py-2">
                  {post.title}
                </td>
                <td className="border-bottom px-4 text-gray-400 py-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: truncatedContent }}
                    className="text-sm text-gray-400 mb-2 mt-1"
                  />
                </td>
                <td className="border-bottom px-4 text-gray-400 py-2">
                  {post.author?.name ?? "Temycodes"}
                </td>
                <td className="border-bottom">
                  <Image
                    src={post.image}
                    height={200}
                    width={200}
                    alt="Post Image"
                    object-fit="cover"
                  />
                </td>
                <td className="border-bottom over px-4 py-2">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="text-blue-500 hover:text-white button-transparent-edit hover:border-transparent-edit mb-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDeletePost(post._id)}
                    className="text-red-400 hover:border-transparent-red hover:text-white button-transparent-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center hero-action-inputmt-4 mt-5">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            handlePrevPage();
            fetchPosts();
          }}
          className="mr-2 bg-gray-200 hover:bg-gray-900 text-gray-700 button p-3"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 py-1 px-2 rounded ${
              currentPage === index + 1
                ? "bg-gray-900 text-white"
                : "bg-gray-600"
            }`}
            onClick={() => {
              handlePageChange(index + 1);
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            handleNextPage();
            fetchPosts();
          }}
          className="bg-gray-800 button mx-1 text-gray-700 font-bold py-2 p-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostTable;

function truncateHTMLContent(
  html: string | undefined,
  maxLength: number
): string {
  if (!html) {
    return "";
  }
  const truncatedHTML = html.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags

  if (truncatedHTML.length <= maxLength) {
    return html;
  }
  const truncatedText = truncatedHTML.slice(0, maxLength) + "...";
  return html.replace(html, truncatedText);
}
