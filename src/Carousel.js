import React, { useState, useEffect } from "react";

const Carousel = ({ media }) => {
  const large = media[0].medium;

  return (
    <div className="carousel">
      <div className="carousel-smaller">
        <img src={large} alt="animal thumbnail" />
      </div>
    </div>
  );
};

export default Carousel;
