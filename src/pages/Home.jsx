import React from "react";
import Carousel from "../components/home/Carousel";
import Services from "../components/home/Services";
import About from "../partials/About";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <Carousel />
      <About />
      <Services />
    </div>
  );
};

export default Home;
