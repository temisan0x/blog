import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

interface SignInButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LoginForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<string | null>(null);

  const handleSignInClick: SignInButtonProps["onClick"] = (e) => {
    e.preventDefault();
    signIn("google");
  };

  const createUser = useCallback(async () => {
    try {
      const response = await axios.get("/api/auth/session"); // Fetch the session separately
      const sessionData = response.data;

      console.log("Session:", sessionData); // Log the session data to check its structure

      const accessToken = sessionData.accessToken;

      const createUserResponse = await axios.post(`/api/users`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data } = createUserResponse;

      // Redirect after user creation
      if (data && data.user) {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error creating user", error);
    }
  }, [router]);

  useEffect(() => {
    if (session) {
      const checkUsernameExists = async () => {
        try {
          if (session?.user?.email) {
            const response = await axios.get(
              `/api/usernames?userId=${session?.user.email}`
            );
            const { data } = response;

            if (data.error === "Username not found") {
              // Redirect to create username page
              router.push("/create-username");
            } else {
              // Set user data if username is found
              setUserData(data?.username);
            }
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      };

      checkUsernameExists();
      createUser();
    }
  }, [createUser, router, session]);

  useEffect(() => {
    if (session && userData) {
      const isAdmin = session.user?.email === "temycodes@gmail.com";
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    }
  }, [router, session, userData]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome 
        </h1>
        <p className="text-gray-600 text-center mt-2">
          {session
            ? userData
              ? "Welcome back, " + userData + "!"
              : "Username not created. Please create one below."
            : "Please sign in to continue"}
        </p>
        <div className="mt-4">
          {!session && (
            <button
              onClick={handleSignInClick}
              className="w-full flex items-center justify-center px-4 py-2 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              aria-label="Sign in with Google"
            >
              Sign in with Google
            </button>
          )}
          {session && !userData && (
            <button
              onClick={() => router.push("/create-username")}
              className="w-full mt-2 flex items-center justify-center px-4 py-2 rounded-md bg-gray-400 text-gray-800 font-semibold hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
              aria-label="Create Username"
            >
              Create Username
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
