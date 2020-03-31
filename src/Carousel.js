import React, { useState, useEffect } from "react";

const Carousel = ({ media }) => {
  return (
    <div className="carousel">
      <div className="carousel-smaller">
        {media.map((photo, index) => (
          <img key={index} src={photo.large} alt="animal thumbnail" />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
