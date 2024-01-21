"use client"

import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import ProfileCard from "../components/ProfileCard";

const HomePage = async() => {
  let data = await fetch("http://localhost:3000/api/");
  let json = await data.json();

  return (
    <Layout>
      <HeroSection />
      <ProfileCard /> 
    </Layout>
  );
};

export default HomePage;
