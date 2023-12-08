import React, { useState } from "react";
import "./StarRating.css";
import Rating from "@mui/material/Rating";

const StarRating = ({ initValue }) => {
  const [rateValue, setRateValue] = useState(initValue);

  return (
    <div className="star-rating-component" value={rateValue}>
      <Rating
        precision={0.5}
        onChange={(e, value) => setRateValue(value * 2)}
      />
      <p>Rating: {rateValue}</p>
    </div>
  );
};

export default StarRating;
