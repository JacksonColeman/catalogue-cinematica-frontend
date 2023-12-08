import React from "react";
import "./MoviePostersDisplay.css";
import { useState } from "react";

const MoviePostersDisplay = ({ collectionName, movies }) => {
  const [showAllMovies, setShowAllMovies] = useState(false);

  const handleSeeMoreClick = () => {
    setShowAllMovies(!showAllMovies);
  };

  const displayedMovies = showAllMovies ? movies : movies.slice(0, 4);

  return (
    <div className="movie-posters-display-container">
      <div className="posters-header cast-header">
        <h4>{collectionName}</h4>
        {movies.length > 4 ? (
          <p className="see-more" onClick={handleSeeMoreClick}>
            {!showAllMovies ? "Show More" : "Show Less"}
          </p>
        ) : null}
      </div>
      <div className="movie-posters-display">
        {movies.length == 0 ? "No movies yet!" : null}
        {displayedMovies.map((m, index) => (
          <div className="movie-poster-item" key={index}>
            <img
              className="movie-poster-display-img"
              src={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w185/${m.poster_path}`
                  : "/img/poster-placeholder.jpg"
              }
              alt={`${m.title} Poster`}
            />
            <a
              className="review-comp-movie-title posters-display-title"
              href={`/movie/${m.tmdb_id}`}
            >
              {m.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePostersDisplay;
