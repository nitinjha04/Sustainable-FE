import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

import { useParams } from "react-router-dom";
import contentService from "../../services/content.service";
import LikeButton from "../LikeButton";
import CommentDialog from "../CommentDialog";
import CustomLoader from "../CustomLoader";

import { CgArrowTopLeftO } from "react-icons/cg";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const api = async () => {
      setProduct({});
      try {
        const response = await contentService.getParticular(params.id);
        if (response.data) {
          setLoading(false);

          setProduct(response.data.result);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    api();
  }, []);

  

  return (
    <div className=" w-full h-full">
      {loading ? (
        <div className=" my-auto flex justify-center items-center  h-[90vh]">
          {" "}
          <CustomLoader loading={loading} />
        </div>
      ) : (
        <div className="w-full py-8 min-h-screen bg-gray-100">
          {/* Product Details */}
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="flex-1 relative">
              <LikeButton
                particular={true}
                post={product}
                setPost={setProduct}
              />
              <img
                loading="lazy"
                className=" select-none w-full h-96 object-contain rounded-lg bg-white"
                src={product?.thumbnail}
                alt={product?.title}
              />
            </div>

            {/* Product Information */}
            <div className="  select-none flex-1 flex flex-col justify-between">
              <div className=" flex flex-col">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product?.title}
                </h1>
                <h3 className="">Upload By {product?.authorId?.name}</h3>
              </div>
              <div className=" flex flex-col">
                <div className="text-gray-700 mb-4">
                  <p className="text-xl font-semibold">$ {product?.price}</p>
                  {product && (
                    <ReactStars
                      count={5}
                      value={product.rating}
                      isHalf={true}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  )}
                  <p className="text-gray-600">Category: {product?.category}</p>
                </div>
                <a
                  href={product?.productLink}
                  target="_blank"
                  className=" flex justify-center items-center gap-1  bg-green-500 outline-none text-white py-2 px-4 rounded-lg border-white border-solid hover:bg-green-600 transition duration-200 text-center"
                >
                  Buy Now
                  <CgArrowTopLeftO className=" rotate-90" />
                </a>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="max-w-7xl mx-auto p-2 py-4 lg:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Description
            </h2>
            <p className="text-gray-700">
              {" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: product?.description,
                }}
              ></div>
            </p>
          </div>

          {/* Product Details Section */}
          <div className="max-w-5xl mx-auto p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              {/* Pros Section */}
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-semibold text-green-600 mb-2">
                  Pros
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {product &&
                    product?.pros &&
                    product?.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-gray-300 h-32"></div>

              {/* Cons Section */}
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  Cons
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {product &&
                    product?.cons &&
                    product?.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <CommentDialog customCss="p-8 bg-gray-100" subCustomCss=" bg-white " post={product} setPost={setProduct} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
