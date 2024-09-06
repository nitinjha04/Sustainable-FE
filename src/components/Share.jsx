import React, { useEffect, useRef, useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { GoShareAndroid } from "react-icons/go";
import { FaCopy } from "react-icons/fa";
import { useStateContext } from "../context/ContextProvider";

const Share = () => {
  const { shareModal, setShareModal, postDetails, setPostDetails } =
    useStateContext();

  const currentUrl = () => {
    const baseUrl = window.location.href;
    const hasIdPattern = /(\/articles\/|\/tips\/|\/products\/)[^/]+$/;
    if (hasIdPattern.test(baseUrl)) {
      return baseUrl;
    } else {
      return `${baseUrl}/${postDetails?._id}`;
    }
  };
  const shareModalRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const closeModal = () => {
    setShareModal(false);
    setPostDetails(null);
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

  if (!shareModal || !postDetails) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={shareModalRef}
        className="bg-custom-bg p-3 rounded-lg shadow-lg max-w-[22rem] lg:max-w-md w-fit relative"
      >
        <div className=" flex flex-col gap-2">
          <div className=" flex flex-wrap  mx-auto justify-around w-full items-center my-auto ">
            {/* Facebook */}
            <FacebookShareButton
              blankTarget={true}
              url={currentUrl}
              quote={"Look At This !"}
              hashtag={`#${postDetails.type.toLowerCase()}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            {/* Email */}
            <EmailShareButton
              blankTarget={true}
              url={currentUrl}
              // url={postDetails.url}
              subject={"Look at this !"}
              body=""
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            {/* LinkedIn */}
            <LinkedinShareButton
              blankTarget={true}
              children={"<p>Look At this ! </p>"}
              url={currentUrl}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            {/* Twitter */}
            <TwitterShareButton
              blankTarget={true}
              url={currentUrl}
              title={"Look at this !"}
              hashtag={"#article"}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton
              blankTarget
              url={currentUrl}
              title={"Look At This !"}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
          <div className=" flex justify-around bg-white w-full rounded-lg">
            <input
              readOnly
              className=" outline-none rounded-lg p-2 w-11/12"
              value={currentUrl()}
              type="text"
            />
            <div className="relative my-auto flex pr-2 justify-center mx-auto  group">
              <FaCopy
                onClick={() => {
                  setCopied(true);
                  navigator.clipboard.writeText(currentUrl());
                  setTimeout(() => setCopied(false), 5000);
                }}
                className="bg-white text-xl cursor-pointer"
              />

              {/* Tooltip with triangle */}
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {copied ? <p>Copied</p> : <p>Copy</p>}
                {/* Triangle */}
                <span className="absolute rotate-180 left-1/2 transform -translate-x-1/2 -bottom-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-700"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShareButton = ({ post, position = "top-12 left-2" }) => {
  const { setShareModal, setPostDetails } = useStateContext();

  return (
    <div
      onClick={() => {
        setPostDetails(post);
        setShareModal(true);
      }}
      className={` ${position}  cursor-pointer absolute  z-50 p-1 rounded-full bg-gray-100`}
    >
      <GoShareAndroid className=" text-2xl   " />
    </div>
  );
};

export default Share;
