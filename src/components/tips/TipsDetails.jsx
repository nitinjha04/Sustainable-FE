import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import contentService from "../../services/content.service";
import CustomLoader from "../CustomLoader";
import LikeButton from "../LikeButton";
import CommentDialog from "../CommentDialog";

const TipsDetails = () => {
  // Mock JSON data simulating API response
  const tipData = {
    title: "How to Save Energy at Home",
    imageUrl: "https://earthhero.com/cdn/shop/products/Unpaste_1.jpg",
    content: `Saving energy at home is not only beneficial for your wallet but also for the environment. 
              Here are some tips to get you started:
              - Turn off lights when not in use.
              - Use energy-efficient appliances.
              - Insulate your home to reduce heating and cooling costs.
              - Consider installing solar panels to generate your own electricity.`,
    author: "Jane Doe",
    date: "August 31, 2024",
    reviews: [
      { rating: 5, comment: "Very helpful tips!", user: "John Doe" },
      {
        rating: 4,
        comment: "Great ideas, but some are costly.",
        user: "Emily Smith",
      },
    ],
  };

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
        <div className="max-w-5xl mx-auto p-8 my-5 bg-white shadow-2xl rounded-lg">
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
            <div
              className=" pt-5"
              dangerouslySetInnerHTML={{
                __html: tip?.description,
              }}
            ></div>
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

          {/* User Reviews Section */}
          {/* <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              User Reviews
            </h2>
            {tip.reviews.length > 0 ? (
              tipData.reviews.map((review, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-lg">
                        {Array(review.rating).fill("★").join("")}
                      </span>
                      <span className="ml-2 text-gray-700 font-medium">
                        {review.user}
                      </span>
                    </div>
                    <span className="text-gray-500">{review.rating} ★</span>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No reviews yet. Be the first to leave one!
              </p>
            )}
          </div> */}

          {/* Add Review Section */}
          {/* <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Add Your Review
            </h2>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <ReactStars
                  count={5}
                  onChange={handleRatingChange}
                  size={30}
                  activeColor="#ffd700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Review</label>
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  rows="5"
                  placeholder="What did you like or dislike about this tip?"
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Submit Review
              </button>
            </form>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default TipsDetails;
