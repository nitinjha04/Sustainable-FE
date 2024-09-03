import React from "react";
import { FacebookShareButton, FacebookIcon } from "next-share";

const Share = ({ post }) => {
  const { shareModal, setShareModal, postDetails, setPostDetails } =
    useStateContext();

  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <div className=" flex flex-wrap  mx-auto justify-center items-center my-auto  gap-2">
      <FacebookShareButton
        url={"https://github.com/next-share"}
        quote={"next-share is a social share buttons for your next React apps."}
        hashtag={"#nextshare"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
};

export default Share;
