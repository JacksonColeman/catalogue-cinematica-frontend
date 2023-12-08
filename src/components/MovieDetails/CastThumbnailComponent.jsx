import React from "react";
import "./CastThumbnailComponent.css"; // Import the CSS file

const CastThumbnailComponent = ({ actor }) => {
  return (
    <div className="cast-thumbnail">
      <img
        className="cast-thumbnail-img"
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/h632/${actor.profile_path}`
            : "/img/cast-placeholder.jpg"
        }
        alt={`${actor.name} Thumbnail`}
      />
      <div className="cast-text">
        <span className="actor-name">{actor.name}</span>
        <span className="actor-character">{actor.character}</span>
      </div>
    </div>
  );
};

export default CastThumbnailComponent;
