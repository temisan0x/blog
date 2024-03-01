'use client';

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState<string | null>(null);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSignInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      signIn("google");
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        // Use the correct API endpoint for user registration
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        const data = await response.json();
  
        // Handle the response, you might want to redirect or show a message to the user
        console.log(data);
      } catch (error) {
        console.error("Error registering user", error);
      }
    };
  
    useEffect(() => {
        // Fetch user data if session exists
        if (session) {
          const fetchUserData = async () => {
            try {
              const response = await axios.get("/api/auth/session");
              const sessionData = response.data;
              console.log("Session:", sessionData);
              const { userData } = sessionData;
              setUserData(userData);
            } catch (error) {
              console.error("Error fetching user data", error);
            }
          };
      
          fetchUserData();
        }
      }, [session]);
      
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Welcome
          </h1>
          <p className="text-gray-600 text-center mb-4">
            {session
              ? userData
                ? `Welcome back, ${userData}!`
                : "Username not created. Please create one below."
              : "Please sign in to continue"}
          </p>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                 
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </label>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </label>
            </div>
  
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }