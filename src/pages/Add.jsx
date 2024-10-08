import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaImage, FaTrash } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { categories } from "../data/data";
import contentService from "../services/content.service";
import toast from "react-hot-toast";
import fileUploadService from "../services/fileUpload.service";
import { useStateContext } from "../context/ContextProvider";
import Tabs from "../components/Tabs";
import CustomLoader from "../components/CustomLoader";

const Add = () => {
  const navigate = useNavigate();
  const { user } = useStateContext();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const postId = queryParams.get("id");

  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, setValue } = useForm();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState();
  const [editorContent, setEditorContent] = useState("");

  // State for tips
  const [tipInput, setTipInput] = useState("");
  const [tips, setTips] = useState([]);

  // State for categories
  const [selectedCategory, setSelectedCategory] = useState(
    categories[type][0].name||""
  );

  // state for products

  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  const [proInput, setProInput] = useState("");
  const [conInput, setConInput] = useState("");

  const onSubmit = async (data) => {
    if (!editorContent || !image || !selectedCategory) {
      toast.error("Please Fill All Details");
      return;
    }

    data.description = editorContent;
    data.file = file;
    data.category = selectedCategory.toLowerCase().split(" ").join("");

    if (type === "product") {
      if (pros.length === 0 || cons.length === 0) {
        toast.error("please add pros and cons");
        return;
      }

      data.pros = pros;
      data.cons = cons;
    }

    if (type === "tip") {
      if (tips.length === 0) {
        toast.error("Please enter tips");
        return;
      }
      data.tips = tips;
    }

    console.log({ data });

    const loadingToastId = toast.loading("Loading...");
    try {
      if (file) {
        const imageUpload = await fileUploadService.upload(file);
        if (imageUpload?.data?.result?.url) {
          data.thumbnail = imageUpload.data.result.url;
        }
      }

      let response;
      if (postId) {
        response = await contentService.update(postId, {
          ...data,
        });

        console.log({ response });
      } else {
        response = await contentService.create({
          ...data,
          type: type.toUpperCase(),
          authorId: user._id,
        });
        console.log({ response });
      }
      toast.dismiss(loadingToastId);
      toast.success(
        `${type?.charAt(0)?.toUpperCase() + type?.slice(1)} Uploaded`
      );
      navigate(`/${type}s/${response.data.result._id}`);
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(error.response.data.message);
      console.log({ error });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await contentService.delete(postId);
      toast.success("Post Deleted");
      window.history.back();
    } catch (error) {
      console.log({ error });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(URL.createObjectURL(file));
      console.log({ file });
      setFile(file);
    },
  });

  const addPro = () => {
    const trimmedPro = proInput.trim();
    if (trimmedPro) {
      setPros([...pros, trimmedPro]);
      setProInput("");
    }
  };

  const addCon = () => {
    const trimmedCon = conInput.trim();
    if (trimmedCon) {
      setCons([...cons, trimmedCon]);
      setConInput("");
    }
  };

  const deletePro = (index) => {
    const updatedPros = [...pros];
    updatedPros.splice(index, 1);
    setPros(updatedPros);
  };

  const deleteCon = (index) => {
    const updatedCons = [...cons];
    updatedCons.splice(index, 1);
    setCons(updatedCons);
  };

  const addTip = () => {
    const trimmedTip = tipInput.trim();
    if (trimmedTip) {
      setTips([...tips, { id: Date.now().toString(), content: trimmedTip }]);
      setTipInput("");
    }
  };

  const deleteTip = (id) => {
    setTips(tips.filter((tip) => tip.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTips = Array.from(tips);
    const [movedTip] = reorderedTips.splice(result.source.index, 1);
    reorderedTips.splice(result.destination.index, 0, movedTip);

    setTips(reorderedTips);
  };

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (postId) {
      const api = async () => {
        setLoading(true);
        try {
          const response = await contentService.getParticular(postId);
          const result = response.data.result;
          setValue("title", result.title);

          setImage(result.thumbnail);
          setEditorContent(result.description);

          const normalizedResultCategory = result.category
            .toLowerCase()
            .replace(/\s+/g, ""); // Convert to lowercase and remove spaces

          const matchingCategory = categories[type].find(
            (cat) =>
              cat.name.toLowerCase().replace(/\s+/g, "") ===
              normalizedResultCategory
          );

          setSelectedCategory(matchingCategory.name); // Set the matching category name

          if (type === "tip") {
            setTips(result.tips);
          }

          if (type === "product") {
            setValue("price", result.price);
            setValue("productLink", result.productLink);
            setPros(result.pros);
            setCons(result.cons);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };

      api();
    } else {
      setLoading(false);

      setImage(null);
      setValue("title", "");
      setEditorContent("");
      setSelectedCategory(categories[type][0].name);
      setTips([]);
      setValue("price", 0);
      setValue("productLink", "");
      setPros([]);
      setCons([]);
    }
  }, [postId]);

  return (
    <div className=" lg:py-6 py-0  ">
      <div className="max-w-7xl border border-solid border-gray-200 mx-auto p-8  bg-custom-bg-2 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Add {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
        </h1>

        {loading ? (
          <div className=" my-auto flex justify-center items-center h-[70vh]">
            {" "}
            <CustomLoader loading={loading} />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Input with Dropzone */}
            <div className="flex flex-col items-start mb-4">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image
              </label>
              <div
                {...getRootProps()}
                className={`cursor-pointer outline-none bg-custom-bg p-2 border rounded-md w-full h-56 flex items-center justify-center ${
                  image ? "border-gray-300" : "border-gray-500"
                }`}
              >
                <input {...getInputProps()} />
                {image ? (
                  <img
                    src={image}
                    alt="Selected"
                    className="w-full h-52 object-contain rounded-md"
                  />
                ) : (
                  <div className="text-center">
                    <FaImage className="text-gray-500 text-4xl mx-auto mb-2" />
                    <p className="text-gray-500">
                      Drag & drop an image, or click to select one
                    </p>
                  </div>
                )}
              </div>
            </div>

            {type === "product" ? (
              <div className=" flex flex-col lg:flex-row gap-5">
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="outline-none bg-custom-bg w-full p-2 border rounded-md"
                        placeholder="Enter the title"
                      />
                    )}
                    rules={{ required: "Title is required" }}
                  />
                </div>
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        className="outline-none bg-custom-bg w-full p-2 border rounded-md"
                        placeholder="Enter the Price"
                      />
                    )}
                    rules={{ required: "Price is required" }}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4 ">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="outline-none bg-custom-bg w-full p-2 border rounded-md"
                      placeholder="Enter the title"
                    />
                  )}
                  rules={{ required: "Title is required" }}
                />
              </div>
            )}

            {type === "product" && (
              <div className="mb-4 ">
                <label className="block text-sm font-medium text-gray-700">
                  Product Link
                </label>
                <Controller
                  name="productLink"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="url"
                      {...field}
                      className="outline-none bg-custom-bg w-full p-2 border rounded-md"
                      placeholder="Enter the Product Link"
                    />
                  )}
                  rules={{ required: "Product Url is required" }}
                />
              </div>
            )}

            {/* Category buttons */}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select a Category
              </label>
              <Tabs
                activeTab={selectedCategory}
                setActiveTab={setSelectedCategory}
                type={type}
              />
            </div>

            {/* React Quill Editor for Articles */}
            <div className="mb-6 pb-8">
              <label className="block text-sm font-medium text-gray-700 pb-2">
                {type === "article" ? <p>Content</p> : <p>Description</p>}
              </label>
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={setEditorContent}
                className="h-96  bg-custom-bg "
              />
            </div>

            {/* Tip Input and List */}
            {type === "tip" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a Tip
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={tipInput}
                    onChange={(e) => setTipInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTip();
                      }
                    }}
                    className="flex-1 p-2 bg-custom-bg border rounded-md mr-2 outline-none"
                    placeholder="Enter a tip"
                  />
                  <button
                    type="button"
                    onClick={addTip}
                    className="bg-custom-btn-3 hover:bg-custom-btn-4 text-white py-2 px-4 rounded-md "
                  >
                    Save
                  </button>
                </div>

                {/* Tips List with Drag and Drop */}
                {tips.length > 0 && (
                  <div className="mt-4">
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="tipsDroppable">
                        {(provided) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-2"
                          >
                            {tips.map((tip, index) => (
                              <Draggable
                                key={tip._id || tip.id}
                                draggableId={tip._id || tip.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex items-center justify-between p-2 border rounded-md ${
                                      snapshot.isDragging
                                        ? "bg-blue-100"
                                        : "bg-custom-bg"
                                    }`}
                                  >
                                    <span>{tip.content}</span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteTip(tip._id || tip.id)
                                      }
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <FaTrash />
                                    </button>
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                )}
              </div>
            )}

            {type === "product" && (
              <div className="flex space-x-0 lg:space-x-8 lg:flex-row flex-col">
                {/* Pros Section */}
                <div className=" w-full lg:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pros
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={proInput}
                      onChange={(e) => setProInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addPro();
                        }
                      }}
                      className="flex-1 p-2 border bg-custom-bg rounded-md mr-2 outline-none"
                      placeholder="Enter a pro"
                    />
                    <button
                      type="button"
                      onClick={addPro}
                      className="bg-custom-btn-3 hover:bg-custom-btn-4 text-white py-2 px-4 rounded-md "
                    >
                      Add
                    </button>
                  </div>
                  <ul className="list-disc ml-5">
                    {pros.map((pro, index) => (
                      <div key={index} className=" flex justify-between">
                        <li className="mb-1 w-full">{pro}</li>{" "}
                        <button
                          type="button"
                          onClick={() => deletePro(index)}
                          className="text-red-800 ml-2 "
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </ul>
                </div>

                {/* Cons Section */}
                <div className=" w-full lg:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cons
                  </label>
                  <div className="flex mb-2 gap-3">
                    <input
                      type="text"
                      value={conInput}
                      onChange={(e) => setConInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCon();
                        }
                      }}
                      className="flex-1 p-2 border bg-custom-bg rounded-md mr-0 lg:mr-2 outline-none"
                      placeholder="Enter a con"
                    />
                    <button
                      type="button"
                      onClick={addCon}
                      className="bg-custom-btn-3 hover:bg-custom-btn-4 text-white py-2 px-4 rounded-md"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="list-disc ml-5">
                    {cons.map((con, index) => (
                      <div key={index} className=" flex justify-between">
                        <li className="mb-1">{con}</li>
                        <button
                          type="button"
                          onClick={() => deleteCon(index)}
                          className="text-red-800 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-8">
              <button
                className="bg-custom-btn-3 hover:bg-custom-btn-4 text-white py-2 px-4 rounded-md "
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  if (postId) {
                    handleDelete();
                  } else {
                    window.history.back();
                  }
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                {postId ? <p>Delete</p> : <p>Cancel</p>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Add;
