import React, { useEffect, useState } from "react";
import ReviewComponent from "./ReviewComponent";
import "./ReviewPage.css";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from 'api/reviews/all'
    fetch("api/reviews/all")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div className="review-page">
      <h2 className="review-page-header">Recent Reviews</h2>
      <div className="review-page-review-container">
        {reviews &&
          reviews.map((review) => (
            <ReviewComponent key={review.id} review={review} showMovie={true} />
          ))}
      </div>
    </div>
  );
};

export default ReviewPage;
