import React, { useEffect, useState } from "react";
import { categories } from "../data/data";
import contentService from "../services/content.service";
import CustomLoader from "../components/CustomLoader";
import Tabs from "../components/Tabs";
import ProductCard from "../components/products/ProductCard";

const ProductPage = () => {
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
    <div className="w-full min-h-screen bg-custom-bg">
      {/* Page Header */}
      <header className="bg-custom-btn-2 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Eco-Friendly Products</h1>
        <p className="mt-2 text-lg">
          Explore our collection of sustainable and eco-friendly products.
        </p>
      </header>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
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
                  <ProductCard
                    key={product._id}
                    product={product}
                    setProducts={setProducts}
                  />
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

export default ProductPage;
