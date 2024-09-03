import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomLoader from "../CustomLoader";
import contentService from "../../services/content.service";
import CommentDialog from "../CommentDialog";
import LikeButton from "../LikeButton";
import ReactStars from "react-rating-stars-component";

const ArticleDetailFullWidth = () => {

  const params = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const api = async () => {
      setArticle({});
      try {
        const response = await contentService.getParticular(params.id);
        if (response.data) {
          setLoading(false);

          setArticle(response.data.result);
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
        <div className="w-full min-h-screen bg-gray-100">
          {/* Article Header */}
          <div
            className="relative w-full h-[60vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${article?.thumbnail})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {article?.title}
              </h1>
              <div className="text-lg md:text-xl items-center mx-auto flex flex-col justify-between">
                {article?.author?.name} -{" "}
                {new Date(article?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                <ReactStars
                  count={5}
                  value={article.rating || 0}
                  isHalf={true}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-7xl mx-auto p-8">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <div className=" relative text-gray-800 text-lg md:text-xl leading-relaxed">
                <LikeButton
                  customCss=" right-2"
                  particular={true}
                  post={article}
                  setPost={setArticle}
                />
                <div
                  className=" pt-5"
                  dangerouslySetInnerHTML={{
                    __html: article?.description,
                  }}
                ></div>
              </div>
            </div>

            {article && (
              <CommentDialog
                customCss=""
                subCustomCss="  shadow-lg bg-gray-100 "
                post={article}
                setPost={setArticle}
              />
            )}
            {/* Reviews Section */}
            {/* <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                User Reviews
              </h2>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="flex flex-col mb-6 border-b pb-6">
                    <div className="flex items-center justify-between mb-2">
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
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  No reviews yet. Be the first to leave one!
                </p>
              )}
            </div> */}

            {/* Add Review Section */}
            {/* <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Add Your Review
              </h2>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`cursor-pointer text-2xl ${
                          newRating > i ? "text-yellow-500" : "text-gray-400"
                        }`}
                        onClick={() => setNewRating(i + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows="5"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="What did you like or dislike about this article?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-200"
                >
                  Submit Review
                </button>
              </form>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetailFullWidth;
