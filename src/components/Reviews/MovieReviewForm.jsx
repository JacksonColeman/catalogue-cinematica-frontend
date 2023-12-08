import React, { useState } from "react";
import "./MovieReviewForm.css";
import StarRating from "../Sandbox Elements/StarRating";
import "../Sandbox Elements/StarRating.css";
import Rating from "@mui/material/Rating";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";

const MovieReviewForm = ({ movie, postMovie, active, handleCloseModal }) => {
  const [reviewText, setReviewText] = useState("");
  const [rateValue, setRateValue] = useState(0);
  const [reviewErrors, setReviewErrors] = useState(null);
  // const [isActive, setIsActive] = useState(active);

  if (!active) {
    return null;
  }

  const checkIfMovieExists = async () => {
    try {
      const response = await fetch(`/api/movies/${movie.id}`);
      if (!response.ok) {
        // Movie does not exist, post it
        await postMovie();
      }
    } catch (error) {
      console.error("Error checking if movie exists:", error);
    }
  };

  const isSubmitDisabled = rateValue == 0 || reviewText.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    await checkIfMovieExists();

    const reviewData = {
      rating: rateValue,
      text: reviewText,
      tmdb_id: movie.id,
      spoilers: false,
    };

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you might need, e.g., authorization headers
        },
        body: JSON.stringify({ review: reviewData }),
      });

      if (!response.ok) {
        const resp = await response.json();
        console.log(resp);
        setReviewErrors(resp);
        throw new Error("Review submission failed");
      }

      const data = await response.json();
      console.log("Review submitted successfully:", data);
      window.location.reload(false);

      // Do something with the response, like displaying a success message
    } catch (error) {
      console.error("Review submission error:", error);
    }
  };

  const onModalClose = () => {
    setRateValue(0);
    setReviewText("");
    handleCloseModal();
  };

  return (
    <div className="movie-review-form">
      <div className="overlay" onClick={onModalClose}></div>
      <div className="review-modal">
        <div className="review-flex-container">
          <AiOutlineClose className="btn--close-modal" onClick={onModalClose} />
          <div className="review-modal-left">
            <img
              className="review-movie-poster"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
                  : "/img/poster-placeholder.jpg"
              }
              alt="Movie poster"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <p className="review-prompt">
                Add a review for{" "}
                <span className="review-movie-title">{movie.title}</span>
              </p>
            </label>
            <textarea
              className="review-text-area"
              id="reviewText"
              name="reviewText"
              rows="4"
              cols="50"
              value={reviewText}
              placeholder="Write a review..."
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>

            <br />

            <div className="star-rating-component" value={rateValue}>
              <p>Rating</p>
              <Rating
                precision={0.5}
                onChange={(e, value) => setRateValue(value * 2)}
              />
            </div>

            <br />

            <button
              className="modal-button-main review-button"
              type="submit"
              disabled={isSubmitDisabled}
            >
              Submit Review
            </button>
            <p className="review-error-message">{reviewErrors?.error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieReviewForm;
