import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import SearchPosts from "../../components/SearchedPost";
import { useRouter } from "next/router";
import { IPost } from "../../types/post";

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<IPost[]>([]);
  const router = useRouter();
  const searchQuery = router.query.q as string;

  useEffect(() => {
    if (searchQuery) {
      fetch(`/api/search?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.posts);
        })
        .catch((err) => {
          console.error("Error fetching search results", err);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <Layout>
      <div className="container mx-auto" style={{ marginTop: "30px" }}>
        <h1 className="text-gray-400 text-2xl py-7">Searched Results: ({searchResults.length})</h1>
        {searchResults.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 blog-container py-4"
            style={{ gap: "10px" }}
          >
            {searchResults.map((post) => (
              <SearchPosts key={post._id} posts={[post]} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-600 py-4">
              No matching blog posts found.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
