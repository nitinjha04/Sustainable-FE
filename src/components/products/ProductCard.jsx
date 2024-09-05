import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import { LiaComments } from "react-icons/lia";
import { truncateText } from "../../data/func";
import { MdEdit } from "react-icons/md";

const ProductCard = ({ product, setProducts }) => {
  return (
    <div className=" min-h-full bg-custom-bg-2 z-10 relative p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <LikeButton post={product} setPost={setProducts} />
      <div className=" z-30 absolute top-2 right-2 flex flex-col gap-1">
        <div className=" bg-[#ffd700] cursor-default text-white text-xs lg:text-sm font-bold py-1 px-2 rounded-lg">
          {product.rating || 0} ★
        </div>
        <Link
          to={`/add?type=product&id=${product._id}`}
          className="  flex justify-center cursor-pointer bg-gray-100 border text-black text-xs lg:text-sm font-bold py-1 rounded-lg"
        >
          {/* {tip.rating || 0} ★ */}
          <MdEdit className=" text-2xl items-center text-center flex justify-center self-center" />
        </Link>
      </div>
      <Link to={`/products/${product._id}`} className=" ">
        <img
          className="w-full h-48 object-cover rounded-md mb-4 select-none"
          src={product?.thumbnail}
          alt={product?._id}
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2 select-none">
          {truncateText(product?.title, 30)}
        </h3>
        <div className="text-gray-700 mb-4 select-none">
          {" "}
          {product?.description?.length > 76 ? (
            <div
              dangerouslySetInnerHTML={{
                __html: product?.description?.slice(0, 76) + " ...",
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
            <LiaComments className=" text-lg" />
            {product?.comments.length}
            {/* {Array(Math.round(product?.rating)).fill("★").join("")} */}
          </span>
          <span className="text-gray-800 font-semibold">
            $ {product?.price}
          </span>
        </div>
        <div className="bg-custom-btn-3 hover:bg-custom-btn-4 text-white py-2 px-4 rounded-lg  transition duration-200 block text-center">
          Buy
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
