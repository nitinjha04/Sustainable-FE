import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import contentService from "../../services/content.service";
import CustomLoader from "../CustomLoader";
import LikeButton from "../LikeButton";
import CommentDialog from "../CommentDialog";
import parse from "html-react-parser";

const TipsDetails = () => {
  const params = useParams();
  const [tip, setTip] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const api = async () => {
      setTip({});
      try {
        const response = await contentService.getParticular(params.id);
        if (response.data) {
          setLoading(false);

          setTip(response.data.result);
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
        <div className="max-w-5xl mx-auto p-8 my-5 bg-white border  rounded-lg">
          {/* Tip Image */}
          <div className="w-full h-96 mb-8 overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-contain"
              src={tip.thumbnail}
              alt={tip.title}
            />
          </div>

          <div className=" py-4 relative flex justify-between w-full">
            <LikeButton
              customCss=" top-0 left-2"
              particular={true}
              post={tip}
              setPost={setTip}
            />
            <div></div>
            <ReactStars
              count={5}
              value={tip.rating || 0}
              isHalf={true}
              size={24}
              activeColor="#ffd700"
              edit={false}
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{tip.title}</h1>

          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <span>By {tip.authorId.name}</span>
            <span>
              {" "}
              {new Date(tip.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Description */}
          <div className="text-gray-800 text-xl leading-relaxed mb-12">
            <div className=" prose min-w-full pt-5">
              {" "}
              {parse(`${tip?.description}`)}
            </div>
          </div>
          {/* Content */}
          <div className="text-gray-800 text-xl leading-relaxed mb-12">
            {tip.tips.map((paragraph, index) => (
              <p key={index} className="mb-6">
                - {paragraph.content}
              </p>
            ))}
          </div>

          <CommentDialog
            customCss=""
            subCustomCss="  shadow-lg bg-gray-100 "
            post={tip}
            setPost={setTip}
          />
        </div>
      )}
    </div>
  );
};

export default TipsDetails;
