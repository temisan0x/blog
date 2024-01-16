import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

const Custom404: React.FC = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <p className="text-xl text-white mt-4">
            Oops! The page youre looking for doesnt exist.
          </p>
          <p className="text-xl text-white mt-2">
            Lets get you back to the homepage.
          </p>
          <div className="mt-4">
            <Link href="/" className="text-white font-semibold">
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Custom404;
