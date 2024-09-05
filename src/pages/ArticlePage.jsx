import React, { useEffect, useState } from "react";
import { categories } from "../data/data";
import CustomLoader from "../components/CustomLoader";
import contentService from "../services/content.service";
import Tabs from "../components/Tabs";
import ArticleCard from "../components/articles/ArticleCard";

const ArticlePage = () => {
  const [activeTab, setActiveTab] = useState(categories.article[0].name);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const api = async () => {
      setLoading(true);

      setArticles([]);
      try {
        const response = await contentService.getAll({
          type: "ARTICLE",
          category: activeTab.toLocaleLowerCase().split(" ").join(""),
        });
        if (response.data) {
          setArticles(response.data.result);
          setLoading(false);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    api();
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen bg-custom-bg">
      {/* Page Header */}
      <header className="bg-custom-btn-2 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Articles</h1>
        <p className="mt-2 text-lg">Explore our collection of Articles.</p>
      </header>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto p-2 py-4 lg:p-8">
        {/* Tabs */}
        <Tabs
          type="article"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tab Content */}
        {loading ? (
          <div className=" my-auto flex justify-center items-center  h-[90vh]">
            {" "}
            <CustomLoader loading={loading} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Latest Articles
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles && articles.length > 0 ? (
                articles.map((article, index) => (
                  <ArticleCard
                    key={article._id}
                    article={article}
                    setArticles={setArticles}
                  />
                ))
              ) : (
                <p>No Articles in this Category </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
