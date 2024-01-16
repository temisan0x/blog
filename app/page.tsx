"use client"

import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import ProfileCard from "../components/ProfileCard";

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <ProfileCard />
    </Layout>
  );
};

export default HomePage;
