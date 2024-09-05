import React from "react";
import { services } from "../../data/data";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="flex flex-col items-center text-center px-6 lg:px-16 py-16 bg-custom-bg">
      <h1 className=" text-green-900 text-3xl lg:text-5xl font-semibold mb-12">
        What We Offer
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((serv, index) => (
          <Link
            to={serv.link}
            key={index}
            className="flex  rounded-lg flex-col items-center gap-4 transition-transform transform hover:scale-105 duration-300"
          >
            <img
              className="w-11/12 h-60  rounded-lg shadow-lg object-cover"
              src={serv.img}
              alt={serv.title}
            />
            <h1 className="text-xl underline underline-offset-8 lg:text-2xl font-medium text-gray-800">
              {serv.title}
            </h1>
            <p className="text-sm lg:text-base text-gray-600 lg:w-3/4">
              {serv.content}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
