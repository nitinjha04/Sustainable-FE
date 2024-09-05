import React, { useEffect, useState } from "react";
import { categories } from "../data/data";
import CustomLoader from "../components/CustomLoader";
import contentService from "../services/content.service";
import Tabs from "../components/Tabs";
import TipsCard from "../components/tips/TipsCard";

const TipsPage = () => {
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
                  <TipsCard key={tip._id} tip={tip} setTips={setTips} />
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

export default TipsPage;
