import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleCreateUsername = async () => {
    console.log("Username to be created:", username);
  
    try {
      if (!username) {
        console.error("Username is required");
        return;
      }
      const response = await axios.post("/api/usernames", {username });
      console.log("API Response:", response.data);
  
      // Assuming the API response includes the created user and username
      const { user, username: createdUsername } = response.data;
      console.log("API Response", JSON.stringify(user, createdUsername));
  
      // Redirect to the user's dashboard
      router.push("/admin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("API Error:", error.response);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  
  

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Username
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleCreateUsername}
          className="w-full bg-gray-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Create Username
        </button>
      </div>
    </div>
    </>
  );
};

export default CreateUser;