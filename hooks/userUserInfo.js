import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [userInfoStatus, setUserInfoStatus] = useState("loading");
  const { data: session, status } = useSession();
  
  useEffect(() => {
    const getUserFromSession = () => {
      if (status === "loading") {
        return;
      }
      if (!session?.user?.id) {
        setUserInfoStatus("unauthenticated");
        return;
      }
      fetch("/api/users?id=" + session.user.id)
        .then((response) => response.json())
        .then((json) => {
          setUserInfo(json.user);
          setUserInfoStatus("authenticated");
          console.log(json);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    };
    
    if (status === "authenticated") {
      getUserFromSession();
    }
  }, [status]);

  // Return the user object and status of userInfo ("ready" or "loading")
  return { userInfo, setUserInfo, userInfoStatus };
}
