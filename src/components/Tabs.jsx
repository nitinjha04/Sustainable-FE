import React from "react";
import { categories } from "../data/data";

const Tabs = ({ type,activeTab,setActiveTab }) => {
  return (
    <div className="flex flex-wrap  gap-4 mb-8">
      {categories[type].map((category) => (
        <button
        type="button"
          key={category.name}
          className={` text-sm lg:text-base py-2 px-4 rounded-t-lg focus:outline-none ${
            activeTab === category.name
              ? "bg-custom-btn text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
