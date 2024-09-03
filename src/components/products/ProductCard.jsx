import React, { useEffect, useState } from "react";
import { categories } from "../../data/data";
import contentService from "../../services/content.service";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import CustomLoader from "../CustomLoader";
import Tabs from "../Tabs";
import { LiaComments } from "react-icons/lia";

const EcoFriendlyProducts = () => {
  const [activeTab, setActiveTab] = useState(categories.product[0].name);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const api = async () => {
      setLoading(true);

      setProducts([]);
      try {
        const response = await contentService.getAll({
          type: "PRODUCT",
          category: activeTab.toLocaleLowerCase().split(" ").join(""),
        });
        if (response.data) {
          setProducts(response.data.result);
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
        <h1 className="text-4xl font-bold">Eco-Friendly Products</h1>
        <p className="mt-2 text-lg">
          Explore our collection of sustainable and eco-friendly products.
        </p>
      </header>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Tabs */}
        <Tabs
          type="product"
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
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 capitalize">
              {activeTab}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products && products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={product._id}
                    className="bg-white z-10 relative p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <LikeButton post={product} setPost={setProducts} />
                    <div className="z-30 absolute top-2 right-2 bg-[#ffd700] text-white text-xs lg:text-sm font-bold py-1 px-2 rounded-lg">
                      {product?.rating} ★
                    </div>
                    <img
                      className="w-full h-48 object-cover rounded-md mb-4 select-none"
                      src={product?.thumbnail}
                      alt={product?.title}
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 select-none">
                      {product?.title}
                    </h3>
                    <div className="text-gray-700 mb-4 select-none">
                      {" "}
                      {product?.description?.length > 80 ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product?.description?.slice(0, 80) + " ...",
                          }}
                        ></div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product?.description,
                          }}
                        ></div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className=" flex  justify-center items-center my-auto gap-1">
                        <LiaComments  className=" text-lg"/>
                        {product?.comments.length}
                        {/* {Array(Math.round(product?.rating)).fill("★").join("")} */}
                      </span>
                      <span className="text-gray-800 font-semibold">
                        $ {product?.price}
                      </span>
                    </div>
                    <Link
                      to={`/products/${product._id}`}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 block text-center"
                    >
                      Buy
                    </Link>
                  </div>
                ))
              ) : (
                <p>No Products in this Category </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default EcoFriendlyProducts;
