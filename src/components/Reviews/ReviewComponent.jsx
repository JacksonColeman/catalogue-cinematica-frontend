import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import "./ReviewComponent.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ReviewComponent = ({ review, showMovie }) => {
  const [reviewData, setReviewData] = useState(review);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // method to like review
  const handleLike = async () => {
    if (reviewData.liked_by_current_user == null) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const response = await fetch(`/api/reviews/${review.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authentication headers
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the review data and likes count
        setReviewData({
          ...reviewData,
          liked_by_current_user: data.liked_by_current_user,
          likes_count: data.likes_count,
        });
        console.log(data);
        // Handle success, e.g., display a message to the user
      } else {
        // Handle error response
        console.error("Failed to like review:", response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error liking review:", error.message);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(`/api/reviews/${review.id}/unlike`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authentication headers
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the review data and likes count
        setReviewData({
          ...reviewData,
          liked_by_current_user: data.liked_by_current_user,
          likes_count: data.likes_count,
        });
        console.log(data);
        // Handle success, e.g., display a message to the user
      } else {
        // Handle error response
        console.error("Failed to unlike review:", response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error unliking review:", error.message);
    }
  };

  if (showMovie) {
    return (
      <div className="review-item sm-review-item">
        <div className="review-poster-container">
          <img
            className="movie-poster-img"
            src={
              reviewData.movie.poster_path
                ? `https://image.tmdb.org/t/p/w185/${reviewData.movie.poster_path}`
                : "/img/poster-placeholder.jpg"
            }
            alt={`${reviewData.movie.title} Poster`}
          />
        </div>
        <div className="review-body">
          <a
            className="review-comp-movie-title"
            href={`/movie/${reviewData.movie.tmdb_id}`}
          >
            {reviewData.movie.title}
          </a>
          <header className="review-header">
            <span className="review-username">{reviewData.user.username}</span>{" "}
            <Rating
              className="review-rating"
              value={reviewData.rating / 2}
              precision={0.5}
              readOnly
            />
            <p className="review-date">
              {new Date(reviewData.created_at).toLocaleDateString()}
            </p>
          </header>
          <p className="review-text">{reviewData.text}</p>
          <footer className="review-footer">
            {reviewData.liked_by_current_user ? (
              <AiFillHeart className="heart-fill-icon" onClick={handleUnlike} />
            ) : (
              <AiOutlineHeart
                className="heart-outline-icon"
                onClick={handleLike}
              />
            )}
            <span>{reviewData.likes_count} likes</span>
            {/* <a href="#" className="reply-button">
          Reply
        </a> */}
          </footer>
          {isLoggedIn ? null : (
            <p className="like-error-msg">Must be logged in to like a review</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="review-item">
      <header className="review-header">
        <span className="review-username">{reviewData.user.username}</span>{" "}
        <Rating
          className="review-rating"
          value={reviewData.rating / 2}
          precision={0.5}
          readOnly
        />
        <p className="review-date">
          {new Date(reviewData.created_at).toLocaleDateString()}
        </p>
      </header>
      <p className="review-text">{reviewData.text}</p>
      <footer className="review-footer">
        {reviewData.liked_by_current_user ? (
          <AiFillHeart className="heart-fill-icon" onClick={handleUnlike} />
        ) : (
          <AiOutlineHeart className="heart-outline-icon" onClick={handleLike} />
        )}
        <span>{reviewData.likes_count} likes</span>
      </footer>
      {isLoggedIn ? null : (
        <p className="like-error-msg">Must be logged in to like a review</p>
      )}
    </div>
  );
};

export default ReviewComponent;
