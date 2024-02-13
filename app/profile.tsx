'use client' 

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { toggleTheme } from "@/redux/slices/ThemeSlice";

const Profile: React.FC = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [usernameData, setUsernameData] = useState<any>(null);
  const [userCreatedAt, setUserCreatedAt] = useState<string | null>(null);

  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  

  const handleDeleteAccount = () => {
    setDeleteModalOpen(false);
  };

  const { data: session } = useSession();
  const router = useRouter();

  const fetchUsername = useCallback(async () => {
    try {
      if (session?.user?.email) {
        const response = await axios.get(
          `/api/usernames?userId=${session?.user.email}`
        );
        if (response.status === 400) {
          router.push("/");
        } else {
          const { data } = response;
          setUsernameData(data?.username);
          console.log("checking user name...", data?.username);
        }
      }
    } catch (error) {}
  }, [router, session?.user.email]);

  const fetchDateCreated = useCallback(async () => {
    try {
      if (session?.user?.email) {
        const response = await axios.get(`/api/users`);
        const { data } = response;

        if (Array.isArray(data) && data.length > 0 && data[0].createdAt) {
          const createdAtValue = data[0].createdAt;
          const createdAtDate = new Date(createdAtValue);

          if (isNaN(createdAtDate.getTime())) {
            console.error("Invalid createdAt value:", createdAtValue);
          } else {
            const userCreatedAt = createdAtDate.toLocaleDateString();
            setUserCreatedAt(userCreatedAt);
            console.log("User created at:", userCreatedAt);
          }
        } else {
          console.log("User creation date not found in response:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching user creation date:", error);
    }
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Profile effect running...");
        if (!session) {
          router.push("/");
        } else {
          await fetchUsername();
          await fetchDateCreated();
        }
      } catch (error) {
        console.error("An error occurred", error);
        router.push("/");
      }
    };
    fetchData();
  }, [fetchDateCreated, fetchUsername, router, session]);

  return (
    <>
      <div
        className="text-white p-8 m-auto mt-20"
        style={{ maxWidth: "500px" }}
      >
        <div className="flex items-center flex-col">
          <Image
            src={session?.user?.image}
            alt="User Profile"
            width={80}
            height={80}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold text-center">
            Welcome{" "}
            {usernameData &&
              usernameData.charAt(0).toUpperCase() + usernameData.slice(1)}
            !, Here`s your account information
          </h2>
        </div>
        <div className="blog-card mt-5">
          <div className="flex justify-between mt-4">
            <p>Email</p>
            <span className="text-gray-400">{session?.user?.email}</span>
          </div>
          <div className="flex justify-between">
            <p> Member since: </p>
            <span className="text-gray-400">
              {userCreatedAt ? userCreatedAt : "Loading..."}
            </span>
          </div>
          <div className="flex justify-between">
            <p>session expires in:</p>
            <span>{session?.expires}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mb-6">
            <button
              className="bg-gray-800 p-3 rounded-lg"
              onClick={handleToggle}
            >
              Toggle {isDarkMode ? "dark" : "light"}
            </button>
          </div>
          <div>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="bg-red-500 text-white p-3 rounded-md"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-md">
            <p className="text-xl font-bold mb-4">Confirm Deletion</p>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="mr-4 text-gray-600 hover:text-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="text-red-500 font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
