import React from "react";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";
import { truncateText } from "../../data/func";
import { MdEdit } from "react-icons/md";

const TipsCard = ({ tip, setTips }) => {
  return (
    <div className=" min-h-full relative border rounded-lg py-4 px-4 cursor-pointer flex flex-col items-center text-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <LikeButton post={tip} setPost={setTips} />

      {/* Rating Badge */}
      <div className=" z-30 absolute top-2 right-2 flex flex-col gap-1">
        <div className=" bg-[#ffd700] cursor-default text-white text-xs lg:text-sm font-bold py-1 px-2 rounded-lg">
          {tip.rating || 0} ★
        </div>
        <Link
          to={`/add?type=tip&id=${tip._id}`}
          className="  flex justify-center cursor-pointer bg-gray-100 border text-black text-xs lg:text-sm font-bold py-1 rounded-lg"
        >
          {/* {tip.rating || 0} ★ */}
          <MdEdit className=" text-2xl items-center text-center flex justify-center self-center" />
        </Link>
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
          {tip?.description?.length > 70 ? (
            <div
              dangerouslySetInnerHTML={{
                __html: tip?.description?.slice(0, 70) + " ...",
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
  );
};

export default TipsCard;
