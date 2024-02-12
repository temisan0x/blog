import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import RestrictSection from "@/components/RestrictSection";
import Dashboard from "@/components/Dashboard";
import AdminPosts from "@/components/AdminPosts";
import PaginationControls from "@/components/PaginationControls";
import { useRouter } from "next/router";

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
  author: {
    name: string;
  };
}

const AdminPage: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<string>("loading");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  console.log("User Data from Session:", session?.user);
  const postsPerPage = 10;

  const fetchPosts = useCallback(async () => {
    setStatus("loading");

    try {
      const response = await axios.get(`/api/posts?page=${currentPage}`);
      const { data } = response;
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }, [currentPage]);

  const fetchUserData = useCallback(async () => {
    try {
      if (session?.user?.email) {
        console.log("Fetching user", session.user.email);
        const response = await axios.get(
          `/api/usernames?userId=${session?.user.email}`
        );
        if (response.status === 400) {
          console.log("User not found. Redirect");
        } else {
          const { data } = response;
          setUserData(data?.username);
          console.log("checking user name...", data?.username);
        }
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }, [session]);

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

  useEffect(() => {
    console.log("Effect is running");
    fetchPosts();
    fetchUserData();
  }, [fetchPosts, fetchUserData]);

  return (
    <>
      {session ? (
        <Dashboard>
          <div style={{ marginTop: "30px" }}>
            <h1
              className="text-2xl md:text-medium text-white mb-1 font-semibold leading-tight tracking-tight"
              style={{ marginTop: "100px", zIndex: "100" }}
            >
              Admin Page
            </h1>
            <p style={{ color: "green" }}>{status} </p>
            {userData && (
              <p className="text-white mb-4">Welcome, {userData}!</p>
            )}
            <div className="text-white mb">
              <AdminPosts
                posts={posts}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
              />
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </Dashboard>
      ) : (
        <RestrictSection />
      )}
    </>
  );
};

export default AdminPage;
