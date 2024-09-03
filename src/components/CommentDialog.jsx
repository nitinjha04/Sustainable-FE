import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-hot-toast"; 
import { useStateContext } from "../context/ContextProvider";
import contentService from "../services/content.service";

import { CiUser } from "react-icons/ci";

const CommentDialog = ({
  post,
  setPost,
  customCss = "p-8 bg-white",
  subCustomCss = "s",
}) => {
  const { setLoginModal, setModalType, user } = useStateContext();

  const [rating, setRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in first");
      setModalType("login");
      setLoginModal(true);
      return;
    }

    if (!rating || !userReview) {
      toast.error("Please fill out both the rating and review.");
      return;
    }

    try {
      console.log(post);
      const response = await contentService.comment({
        contentId: post._id,
        rating,
        body: userReview,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          thumbnail: user?.thumbnail,
        },
      });

      if (response.data) {
        toast.success("Review submitted successfully!");
        setPost((prevPost) => ({
          ...prevPost,
          comments: [response.data.result, ...prevPost.comments],
        }));

        const totalRatings =
          response.data.result.rating +
          post.comments.reduce((sum, comment) => sum + comment.rating, 0);

        const newCommentCount = post.comments.length + 1;
        const averageRating = totalRatings / newCommentCount;

        setPost((prevPost) => ({
          ...prevPost,
          rating: averageRating,
        }));

        setRating(0);
        setUserReview("");
      } else {
        toast.error("Failed to submit the review.");
      }
    } catch (error) {
      console.log("Error submitting review:", error);
      toast.error("An error occurred while submitting your review.");
    }
  };

  return (
    <div className={` ${customCss} flex flex-col gap-6 max-w-7xl mx-auto `}>
      <div
        className={` ${subCustomCss}   border border-gray-100 p-6 rounded-lg`}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Add Your Review
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating</label>
            <ReactStars
              count={5}
              onChange={setRating}
              size={30}
              activeColor="#ffd700"
              value={rating}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Review</label>
            <textarea
              className=" resize-none w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-btn-4"
              rows="5"
              placeholder="What did you like or dislike about this product?"
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-custom-btn-3 hover:bg-custom-btn-4 text-white py-2 px-4 rounded-lg  transition duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
      <div
        className={` ${subCustomCss} p-6 rounded-lg max-h-96 overflow-auto  `}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          User Reviews
        </h2>
        {post && post?.comments && post.comments.length > 0 ? (
          post.comments.map((review, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className=" bg-white rounded-full border p-1 text-lg">
                    <CiUser />
                  </span>
                  <span className="ml-2 text-gray-700 font-medium">
                    {review.user.name}
                  </span>
                </div>
                <span className="text-gray-500">{review.rating} ★</span>
              </div>
              <p className="text-gray-700 mt-2">{review.body}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No reviews yet. Be the first to leave one!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentDialog;
