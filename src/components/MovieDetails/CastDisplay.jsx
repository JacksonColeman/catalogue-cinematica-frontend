import React, { useState } from "react";
import CastThumbnailComponent from "./CastThumbnailComponent";
import "./CastDisplay.css";

const CastDisplay = ({ credits }) => {
  const [showFullCast, setShowFullCast] = useState(false);

  const cast = showFullCast ? credits.cast : credits.cast.slice(0, 6);
  const crew = credits.crew;

  const handleShowFullCastClick = () => {
    setShowFullCast(!showFullCast);
  };

  return (
    <div className="cast-container" id="cast">
      <div className="cast-header">
        <h3 className="cast-title movie-details-header">Cast</h3>
        {credits.cast.length > 6 ? (
          <a className="full-cast-link" onClick={handleShowFullCastClick}>
            {showFullCast ? "Hide Full Cast" : "Show Full Cast"}
          </a>
        ) : null}
      </div>
      <div className="cast-list">
        {cast.map((actor) => (
          <CastThumbnailComponent key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  );
};

export default CastDisplay;
