import React from "react";
import "./LoadingIndicator.css";

const LoadingIndicator = () => {
  return (
    <div className="loading">
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </div>
  );
};

export default LoadingIndicator;
