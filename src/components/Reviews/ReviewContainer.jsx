import React, { useEffect, useState } from "react";
import ReviewComponent from "./ReviewComponent.jsx";
import "./ReviewContainer.css";

const ReviewContainer = ({ movie }) => {
  const [reviews, setReviews] = useState([]); // Use 'const' here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/reviews/?tmdb_id=${movie.id}`);
        if (!response.ok) {
          throw new Error("Fetch failed");
        }

        const data = await response.json();
        setReviews(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [movie.id]); // Add movie.id as a dependency to useEffect

  return (
    <div className="review-container" id="reviews">
      <h3 className="movie-details-header reviews-title">Reviews</h3>
      <div className="review-list">
        {reviews
          ? reviews.map((review) => (
              <ReviewComponent key={review.id} review={review} />
            ))
          : ""}
      </div>
    </div>
  );
};

export default ReviewContainer;
