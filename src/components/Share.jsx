import React, { useEffect, useRef } from "react";
import { FacebookShareButton, FacebookIcon } from "next-share";
import { useStateContext } from "../context/ContextProvider";

const Share = ({ post }) => {
  const { shareModal, setShareModal, postDetails, setPostDetails } =
    useStateContext();
  if (!shareModal) return null;

  const shareModalRef = useRef(null);

  const openModal = () => {
    setShareModal(true);
  };

  const closeModal = () => {
    setShareModal(false);
  };

  const handleClickOutside = (event) => {
    if (
      shareModalRef.current &&
      !shareModalRef.current.contains(event.target)
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    if (shareModalRef) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareModalRef]);
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={shareModalRef}
        className="bg-custom-bg p-8 rounded-lg shadow-lg max-w-[22rem] lg:max-w-md w-fit relative"
      >
        <div className=" flex flex-wrap  mx-auto justify-center items-center my-auto  gap-2">
          <FacebookShareButton
            url={"https://github.com/next-share"}
            quote={
              "next-share is a social share buttons for your next React apps."
            }
            hashtag={"#nextshare"}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
};

export default Share;
