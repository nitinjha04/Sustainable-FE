import React from "react";
import { truncateText } from "../../data/func";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { ShareButton } from "../Share";

const ArticleCard = ({ article, setArticles }) => {
  return (
    <div className=" min-h-full relative bg-custom-bg-2 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <LikeButton post={article} setPost={setArticles} />
      <ShareButton post={article} />

       {/* Rating Badge */}
       <div className=" z-30 absolute top-2 right-2 flex flex-col gap-1">
        <div className=" bg-[#ffd700] cursor-default text-white text-xs lg:text-sm font-bold py-1 px-2 rounded-lg">
          {article.rating || 0} ★
        </div>
        <Link
          to={`/add?type=article&id=${article._id}`}
          className="  flex justify-center cursor-pointer bg-gray-100 border text-black text-xs lg:text-sm font-bold py-1 rounded-lg"
        >
          {/* {tip.rating || 0} ★ */}
          <MdEdit className=" text-2xl items-center text-center flex justify-center self-center" />
        </Link>
      </div>
      <Link to={`/articles/${article._id}`}>
        <img
          className="w-full h-48 object-cover"
          src={article.thumbnail}
          alt={article._id}
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            {truncateText(article?.title, 25)}
          </h2>
          <div className="text-gray-700 mb-4">
            {article?.description?.length > 70 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: article?.description?.slice(0, 70) + " ...",
                }}
              ></div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: article?.description,
                }}
              ></div>
            )}
          </div>
          <Link
            to={`/articles/${article._id}`}
            className="text-custom-btn  underline
            underline-offset-4 font-semibold"
          >
            {" "}
            Read More
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
