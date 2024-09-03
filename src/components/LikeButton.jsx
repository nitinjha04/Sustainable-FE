import React from "react";
import { FaHeart } from "react-icons/fa";
import contentService from "../services/content.service";
import { useThemeContext } from "../context/ThemeProvider";
import toast from "react-hot-toast";

const LikeButton = ({
  post,
  setPost,
  particular = false,
  customCss = "top-2 left-2",
}) => {
  const { setLoginModal, setModalType, user } = useThemeContext();

  console.log({ post });

  const formatLikes = (count) => {
    if (count < 1000) return count;
    return `${Math.floor(count / 1000)}k`;
  };

  const handleLikeClick = async (productId) => {
    try {
      if (!user) {
        toast.error("Please log in first");
        setModalType("login");
        setLoginModal(true);
        return;
      }

      console.log({ user });

      let updatedLikedIds = [];

      if (particular) {
        if (Array.isArray(post.likedIds)) {
          updatedLikedIds = post.likedIds.includes(user._id)
            ? post.likedIds.filter((id) => id !== user._id)
            : [...post.likedIds, user._id];
        } else {
          updatedLikedIds = [user._id];
        }
        setPost((prevProduct) => ({
          ...prevProduct,
          likedIds: updatedLikedIds,
        }));
      } else {
        setPost((prevProducts) =>
          prevProducts.map((product) => {
            if (product._id === productId) {
              const isArray = Array.isArray(product.likedIds);
              const isLiked = isArray && product.likedIds.includes(user._id);

              const ids = isLiked
                ? product.likedIds.filter((id) => id !== user._id)
                : [...(isArray ? product.likedIds : []), user._id];

              updatedLikedIds = ids;
              return {
                ...product,
                likedIds: ids,
              };
            }
            return product;
          })
        );
      }

      debounce(async () => {
        const response = await contentService.like({
          id: productId,
          likedIds: updatedLikedIds,
        });

        if (!response.data) {
          console.log("Error updating likes");
        }

        console.log("Like request successful");
      }, 500)();
    } catch (error) {
      console.log("Error updating likedIds:", error);
    }
  };

  // Utility function to debounce the API call
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const checkLiked = (product) => {
    if (user) {
      const likedIds = Array.isArray(product?.likedIds) ? product.likedIds : [];
      return likedIds.includes(user._id);
    } else {
      return false;
    }
  };
  return (
    <div className={` ${customCss} absolute bg-gray-50 p-2 text-center items-center  z-30 flex flex-row gap-2 rounded-md border `}>
      <FaHeart
        className={`text-3xl ${
          checkLiked(post) ? "text-red-500" : "text-gray-400"
        }`}
        onClick={() => handleLikeClick(post._id)}
      />
      {post && post?.likedIds && post.likedIds.length > 0 && (
        <p className="select-none">{formatLikes(post.likedIds.length)}</p>
      )}
    </div>
  );
};

export default LikeButton;
