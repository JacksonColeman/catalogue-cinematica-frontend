// MovieDetailsComponent.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CastThumbnailComponent from "./CastThumbnailComponent";
import "./MovieDetailsComponent.css"; // Import the CSS file

import LoginModal from "../LoginModal/LoginModal";

import { BiCameraMovie } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { RiVideoAddLine } from "@react-icons/all-files/ri/RiVideoAddLine";
import { RiVidiconFill } from "@react-icons/all-files/ri/RiVidiconFill";

import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { AiOutlineCalendar } from "@react-icons/all-files/ai/AiOutlineCalendar";
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";

import MovieReviewForm from "../Reviews/MovieReviewForm";
import ReviewContainer from "../Reviews/ReviewContainer";
import CastDisplay from "./CastDisplay";

const MovieDetailsComponent = ({ isLoggedIn }) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { id } = useParams();

  const [inDb, setInDb] = useState(false);
  const [backendMovieData, setBackendMovieData] = useState(null);

  const checkIfMovieExists = async (tmdbID) => {
    try {
      const response = await fetch(`/api/movies/${tmdbID}`);
      if (response.ok) {
        const movieData = await response.json();
        setBackendMovieData(movieData);
        setInDb(true);
        return true;
      } else {
        setInDb(false);
        return false;
      }
    } catch (error) {
      console.error("Error checking if movie exists:", error);
    }
  };

  const postMovie = async (movieData) => {
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "true",
        },
        body: JSON.stringify({ movie: movieData }),
      });

      if (!response.ok) {
        throw new Error("Movie creation failed");
      }

      const data = await response.json();
      console.log("Movie created successfully:", data);
      setBackendMovieData(data); // Update the state with the created movie data
      setInDb(true);
    } catch (error) {
      console.error("Movie creation error:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`
          https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&api_key=${"67efd9f8bb8609b38ab7599192991049"}`);
        const data = await response.json();
        setMovieDetails(data);

        const movieData = {
          tmdb_id: data.id,
          title: data.title,
          backdrop_path: data.backdrop_path,
          poster_path: data.poster_path,
        };

        // If the movie doesn't exist, post it to the database

        if (data.id) {
          await postMovie(movieData);
        } else {
          console.error("Movie data is not available for posting.");
        }
      } catch (error) {}
    };

    // Fetch movie details and check/post to the database
    fetchMovieDetails();
    checkIfMovieExists(id);
  }, [id]);

  useEffect(() => {
    setInDb(!!backendMovieData); // Set inDb to true when backendMovieData is truthy
  }, [backendMovieData]);

  if (!movieDetails || !inDb) {
    return <div>Loading...</div>;
  }

  const director = movieDetails.credits.crew.filter(
    ({ job }) => job === "Director"
  );
  const credits = movieDetails.credits;
  const cast = movieDetails.credits.cast;
  const backdrop = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
    : "fish";

  const poster_path = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`
    : "fish";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, transparent 40%, var(--cc-dark-grey)),linear-gradient(to top, transparent 90%, rgba(0, 0, 0, 1)),linear-gradient(to left, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 1)),linear-gradient(to right, transparent 90%, rgba(0, 0, 0, 1)), url(${backdrop})`,
  };

  // add to list
  const addToList = async (movieId, listName) => {
    try {
      const response = await fetch("/api/movie_lists/add_to_list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie_id: movieId,
          list_name: listName,
        }),
      });

      const data = await response.json();
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  const removeFromList = async (movieId, listName) => {
    try {
      const response = await fetch("/api/movie_lists/remove_from_list", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie_id: movieId,
          list_name: listName,
        }),
      });

      const data = await response.json();
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error("Error removing from list:", error);
    }
  };

  const handleAddToList = async (listName) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }
    console.log("Calling handle add to list");
    console.log(backendMovieData);
    await addToList(backendMovieData.movie.tmdb_id, listName).then(() =>
      checkIfMovieExists(id)
    );
  };

  const handleRemoveFromList = async (listName) => {
    // Assuming you have the listName from somewhere
    await removeFromList(backendMovieData.movie.tmdb_id, listName).then(() =>
      checkIfMovieExists(id)
    );
  };

  const handleOpenReviewModal = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    setOpenReviewModal(true);
  };

  return (
    <div className="movie-details-container">
      {isLoginOpen ? (
        <LoginModal
          open={true}
          handleCloseModal={() => setIsLoginOpen(false)}
        />
      ) : null}
      <MovieReviewForm
        movie={movieDetails}
        postMovie={postMovie}
        active={openReviewModal}
        handleCloseModal={() => setOpenReviewModal(false)}
      />
      <div style={backgroundImageStyle} className="backdrop-img-container">
        <div className="movie-details-text">
          <p className="movie-title">{movieDetails.title.toUpperCase()}</p>
          <div className="text-container">
            {director[0] ? (
              <p className="director">
                <BiCameraMovie className="camera-icon" /> Directed by{" "}
                <strong>{director[0]?.name}</strong>
              </p>
            ) : null}
            <p className="release-date">
              <AiOutlineCalendar className="cal-icon" />
              <span>{movieDetails.release_date.slice(0, 4)}</span>
            </p>
            <p className="runtime">
              <AiOutlineClockCircle className="clock-icon" />
              <span className="runtime-text">{movieDetails.runtime} mins</span>
            </p>
          </div>
          <div className="btn-group">
            <a
              href="#top"
              onClick={handleOpenReviewModal}
              className="movie-btn"
            >
              <BsPencilSquare />
              <span className="movie-btn-text">Review</span>
            </a>
            {backendMovieData && backendMovieData?.check?.is_favorite ? (
              <a
                href="#top"
                className="movie-btn"
                onClick={() => handleRemoveFromList("Favorites")}
              >
                {" "}
                <AiFillHeart className="favorite-btn-filled" />
                <span className="movie-btn-text">Favorite</span>
              </a>
            ) : (
              <a
                href="#top"
                className="movie-btn"
                onClick={() => handleAddToList("Favorites")}
              >
                {" "}
                <AiOutlineHeart />
                <span className="movie-btn-text">Favorite</span>
              </a>
            )}
            {backendMovieData && backendMovieData.check?.is_watchlist ? (
              <a
                href="#top"
                className="movie-btn "
                onClick={() => handleRemoveFromList("Watchlist")}
              >
                <RiVidiconFill className="favorite-btn-filled" />
                <span className="movie-btn-text">Watchlist</span>
              </a>
            ) : (
              <a
                href="#top"
                className="movie-btn"
                onClick={() => handleAddToList("Watchlist")}
              >
                <RiVideoAddLine />
                <span className="movie-btn-text">Watchlist</span>
              </a>
            )}
          </div>
        </div>

        <div className="overview-container">
          <p className="tagline">{movieDetails.tagline.toUpperCase()}</p>
          <p className="overview">{movieDetails.overview}</p>
        </div>
      </div>

      {/* Container for text elements */}

      <div className="movie-more-details-container">
        <CastDisplay credits={credits} />

        {/* <MovieReviewForm movie={movieDetails}  /> */}
        <ReviewContainer movie={movieDetails} />
      </div>
    </div>
  );
};

export default MovieDetailsComponent;
