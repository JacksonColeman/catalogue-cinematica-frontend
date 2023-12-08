import { Link } from "react-router-dom";
import "./MovieThumbnailComponent.css";

const MovieThumbnailComponent = ({ movie }) => {
  return (
    <div key={movie.id} className="movie-item">
      {
        <Link to={`/movie/${movie.id}`}>
          <img
            className="movie-thumbnail-img"
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`
                : "/img/popcorn.jpg"
            }
            alt={`${movie.title} Poster`}
          />
          <div className="movie-item-title">{movie.title.toUpperCase()}</div>
        </Link>
      }
    </div>
  );
};

export default MovieThumbnailComponent;
