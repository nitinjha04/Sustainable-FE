import React, { useEffect, useState } from "react";
import Tabs from "../components/Tabs";
import { categories } from "../data/data";
import contentService from "../services/content.service";
import CustomLoader from "../components/CustomLoader";
import TipsCard from "../components/tips/TipsCard";
import ProductCard from "../components/products/ProductCard";
import ArticleCard from "../components/articles/ArticleCard";
import { useStateContext } from "../context/ContextProvider";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useStateContext();

  const [activeTab, setActiveTab] = useState(categories.profile[0].name);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const api = async () => {
      setLoading(true);

      setPosts([]);
      try {
        let formattedTab = activeTab.toUpperCase().split(" ");

        if (formattedTab.length > 1) {
          formattedTab = formattedTab.slice(0, -1).join("");
        } else {
          formattedTab = formattedTab.join("");
        }

        if (formattedTab.endsWith("S")) {
          formattedTab = formattedTab.slice(0, -1);
        }

        const response = await contentService.getOwn({
          type: `${formattedTab}`,
        });
        if (response.data) {
          setPosts(response.data.result);
          setLoading(false);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    api();
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen z-30 bg-custom-bg">
      {/* Page Header */}

      {/* Tip Categories */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Tabs */}
        <Tabs
          type="profile"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tips Section */}
        <div className="py-10 px-5 max-w-7xl mx-auto">
          {loading ? (
            <div className=" my-auto flex justify-center items-center">
              {" "}
              <CustomLoader loading={loading} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                  <div key={post._id}>
                    {activeTab === "Tips" ? (
                      <TipsCard key={post._id} tip={post} setTips={setPosts} />
                    ) : activeTab === "Products" ? (
                      <ProductCard
                        key={post._id}
                        product={post}
                        setProducts={setPosts}
                      />
                    ) : (
                      <ArticleCard
                        key={post._id}
                        article={post}
                        setArticles={setPosts}
                      />
                    )}
                  </div>
                ))
              ) : (
                <p>No Tips in this Category </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
