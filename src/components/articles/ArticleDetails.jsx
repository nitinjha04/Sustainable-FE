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
          <div className="max-w-7xl mx-auto p-2 py-4 lg:p-8">
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
                subCustomCss="  shadow-lg bg-white "
                post={article}
                setPost={setArticle}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetailFullWidth;
