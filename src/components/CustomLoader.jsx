import React from "react";
import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const CustomLoader = ({ color = "#5F6921", loading = false }) => {
  return (
    <BarLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={250}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default CustomLoader;
