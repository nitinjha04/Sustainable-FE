import React, { useEffect, useState } from "react";
import { categories } from "../../data/data";
import CustomLoader from "../CustomLoader";
import contentService from "../../services/content.service";
import { truncateText } from "../../data/func";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";
import Tabs from "../Tabs";

const articlesData = [
  {
    title: "10 Ways to Reduce Your Carbon Footprint",
    imageUrl: "https://images.unsplash.com/photo-1695712551762-4788429015f1",
    excerpt:
      "Learn how small changes can make a big impact on the environment.",
    link: "/articles/reduce-carbon-footprint",
  },
  {
    title: "Sustainable Living: A Beginner's Guide",
    imageUrl: "https://images.unsplash.com/photo-1695712551762-4788429015f1",
    excerpt: "Start your journey towards a more sustainable lifestyle today.",
    link: "/articles/sustainable-living-guide",
  },
  {
    title: "The Best Eco-Friendly Products of 2024",
    imageUrl: "https://images.unsplash.com/photo-1695712551762-4788429015f1",
    excerpt:
      "Discover the top eco-friendly products that are worth your investment.",
    link: "/articles/best-eco-friendly-products-2024",
  },
  // Add more articles as needed
];

const ArticlesGrid = () => {
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
    <div className="w-full min-h-screen bg-gray-100">
      {/* Page Header */}
      <header className="bg-green-900 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Articles</h1>
        <p className="mt-2 text-lg">Explore our collection of Articles.</p>
      </header>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto p-2 lg:p-8">
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
                  <div
                    key={index}
                    className=" relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <LikeButton post={article} setPost={setArticles} />
                    {/* Rating Badge */}
                    <div className="z-30 absolute top-2 right-2 bg-[#ffd700] text-white text-xs lg:text-sm font-bold py-1 px-2 rounded-lg">
                      {article.rating || 0} ★
                    </div>

                    <Link to={`/articles/${article._id}`}>
                      <img
                        className="w-full h-48 object-cover"
                        src={article.thumbnail}
                        alt={article._id}
                      />
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">
                          {truncateText(article?.title, 30)}
                        </h2>
                        <p className="text-gray-700 mb-4">
                          {article?.description?.length > 80 ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  article?.description?.slice(0, 80) + " ...",
                              }}
                            ></div>
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: article?.description,
                              }}
                            ></div>
                          )}
                        </p>
                        <a
                          href={article.link}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Read More
                        </a>
                      </div>
                    </Link>
                  </div>
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

export default ArticlesGrid;
