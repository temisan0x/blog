// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & { id: string };
  }
}

export interface UserInfo {
    id: number | string | any | undefined;
    name: string | null;
    email: string | null;
    image: string | null;
    isAdmin: boolean;
  }
  