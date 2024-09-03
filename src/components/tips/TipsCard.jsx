import React, { useEffect, useState } from "react";
import { categories } from "../../data/data";
import CustomLoader from "../CustomLoader";
import contentService from "../../services/content.service";
import { truncateText } from "../../data/func";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";
import Tabs from "../Tabs";

const TipsCard = () => {
  const [activeTab, setActiveTab] = useState(categories.tip[0].name);
  const [loading, setLoading] = useState(true);

  const [tips, setTips] = useState([]);

  useEffect(() => {
    const api = async () => {
      setLoading(true);

      setTips([]);
      try {
        const response = await contentService.getAll({
          type: "TIP",
          category: activeTab.toLocaleLowerCase().split(" ").join(""),
        });
        if (response.data) {
          setTips(response.data.result);
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
      <header className="bg-custom-btn-2 text-white z-30 py-8 text-center">
        <h1 className="text-4xl font-bold">Tips</h1>
        <p className="mt-2 text-lg">Explore our collection of Tips.</p>
      </header>

      {/* Tip Categories */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Tabs */}
        <Tabs type="tip" activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tips Section */}
        <div className="py-10 px-5 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Green Living Tips
          </h2>
          {loading ? (
            <div className=" my-auto flex justify-center items-center">
              {" "}
              <CustomLoader loading={loading} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tips && tips.length > 0 ? (
                tips.map((tip, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg py-4 px-4 cursor-pointer flex flex-col items-center text-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <LikeButton post={tip} setPost={setTips} />

                    {/* Rating Badge */}
                    <div className="z-30 absolute top-2 right-2 bg-[#ffd700] text-white text-xs lg:text-sm font-bold py-1 px-2 rounded-lg">
                      {tip.rating || 0} ★
                    </div>
                    <Link to={`/tips/${tip._id}`} className="flex flex-col">
                      <img
                        className="z-10 h-40 w-full rounded-md object-contain mb-4"
                        src={tip?.thumbnail}
                        alt={tip?._id}
                      />
                      <h1 className="text-lg lg:text-2xl font-semibold">
                        {truncateText(tip?.title, 30)}
                      </h1>
                      <p className="w-full text-sm lg:text-base text-gray-600 mt-2">
                        {tip?.description?.length > 80 ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: tip?.description?.slice(0, 80) + " ...",
                            }}
                          ></div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: tip?.description,
                            }}
                          ></div>
                        )}
                      </p>
                    </Link>
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

export default TipsCard;
