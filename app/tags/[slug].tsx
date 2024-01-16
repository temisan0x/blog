import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../../components/Layout";
import PageLoader from "../../../components/PageLoader";
import { IPost } from "../../../types/post";
import { ITags } from "../../../types/tags";
import TagsCard from "../../../components/TagsCard";

const TagsPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [tags, setTags] = useState<ITags[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<ITags[]>(`/api/tags/${slug}`);
        const { data } = response;
        console.log(data);
        if (Array.isArray(data)) {
          setTags(data);
          setPosts(data[0]?.posts || []); // Assuming the first tag in the array contains the desired posts
        } else {
          console.error("Invalid tag data", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchTags();
    }
  }, [slug]);
  console.log("Tags fetched", posts);

  return (
    <Layout>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <h1 className="text-white">
            Posts with Tag: {tags.length > 0 && tags[0].name}
          </h1>
          <div className="flex flex-wrap text-white  mt-20">
            <TagsCard posts={posts} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default TagsPage;
