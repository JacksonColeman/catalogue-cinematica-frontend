import React, { useState } from "react";
import MovieThumbnailComponent from "../MovieDetails/MovieDetailsComponent";
import "./MovieCarousel.css";

const Carousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const VISIBLE_MOVIES = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - VISIBLE_MOVIES : prevIndex - 3
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - VISIBLE_MOVIES ? 0 : prevIndex + 3
    );
  };

  return (
    <div className="carousel-container">
      <button onClick={handlePrev} className="carousel-arrow">
        &lt; Prev
      </button>
      <div className="carousel">
        {movies
          .slice(currentIndex, currentIndex + VISIBLE_MOVIES)
          .map((movie, index) => (
            <div key={index} className="carousel-item">
              <MovieThumbnailComponent movie={movie} />
            </div>
          ))}
      </div>
      <button onClick={handleNext} className="carousel-arrow">
        Next &gt;
      </button>
    </div>
  );
};

export default Carousel;
