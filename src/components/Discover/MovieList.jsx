// MovieList.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MovieList.css"; // Import the CSS file for styling
import MovieThumbnailComponent from "./MovieThumbnailComponent";

const MovieList = ({}) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch discover movies when the component mounts
    fetchDiscoverMovies();
  }, []);

  useEffect(() => {
    // Fetch discover movies when the user returns to '/'
    fetchDiscoverMovies();
  }, [navigate]);

  const fetchDiscoverMovies = async () => {
    try {
      const apiEndpoint = "https://api.themoviedb.org/3/discover/movie";
      const response = await fetch(
        `${apiEndpoint}?api_key=${"67efd9f8bb8609b38ab7599192991049"}&append_to_response=credits`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching discover movies:", error);
    }
  };

  return (
    <div className="movie-container">
      <h2 className="movie-grid-header">Discover Your New Favorite Film</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieThumbnailComponent movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
