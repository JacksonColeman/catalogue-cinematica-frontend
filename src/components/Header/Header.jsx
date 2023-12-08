// components/Header.js
import React from "react";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import "./Header.css"; // Import your stylesheet
import LoginModal from "../LoginModal/LoginModal";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";

const Header = ({ isLoggedIn }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSearch = async (query) => {
    // Call the API to search for movies
    if (query === "") {
      // Handle clearing the search results or fetching default movies
      return;
    }

    try {
      const apiEndpoint = "https://api.themoviedb.org/3/search/movie";
      const response = await fetch(
        `${apiEndpoint}?&append_to_response=credits&include_adult=false&query=${query}&api_key=${"67efd9f8bb8609b38ab7599192991049"}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
  };

  const handleSearchInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleOverlayClick = () => {
    handleSearchIconClick();
  };

  const toggleNavOpen = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header" id="top">
      <div
        className={`overlay-search ${
          searchQuery != "" && searchResults.length > 0 ? "active" : ""
        }`}
        onClick={handleOverlayClick}
      ></div>
      {/* <Link className="home-link" to="/">
        Catalogue Cinematica
      </Link> */}
      <a className="home-link" href="/">
        <p className="home-link-text">Catalogue</p>
        <p className="home-link-text">Cinematica</p>
      </a>
      <nav className="header-nav">
        <ul className={`header-links ${isNavOpen ? "nav-open" : ""}`}>
          <div className="search-container">
            <li onClick={handleSearchIconClick}>
              <FaSearch className="search-icon" />
            </li>
            {isSearchOpen && (
              <div className="search-bar">
                <input
                  className="search-bar-input"
                  type="text"
                  placeholder="Search for a film"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  autoFocus={true}
                />

                {searchQuery != "" && searchResults.length > 0 && (
                  <ul className="search-results-dropdown">
                    {searchResults.slice(0, 8).map((movie) => (
                      <a
                        className="search-result-item"
                        key={movie.id}
                        href={`/movie/${movie.id}`}
                      >
                        <img
                          className="dropdown-thumbnail-img"
                          src={
                            movie.backdrop_path
                              ? `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`
                              : "/img/popcorn.jpg"
                          }
                          alt={`${movie.title} Poster`}
                        />
                        <div className="dropdown-movie-details">
                          <span className="dropdown-movie-title">
                            {movie.title}
                          </span>
                          <span className="dropdown-movie-year">
                            {movie.release_date.slice(0, 4)}
                          </span>
                        </div>
                      </a>
                    ))}
                  </ul>
                )}
                <AiOutlineClose
                  className="close-search-icon"
                  onClick={handleSearchIconClick}
                />
              </div>
            )}
          </div>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/account" onClick={() => setIsNavOpen(false)}>
                  Account
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <a onClick={() => setOpenModal(true)}>Sign In</a>
                <LoginModal
                  open={openModal}
                  handleCloseModal={() => setOpenModal(false)}
                />
              </li>
            </>
          )}
          <li>
            <Link to="/films" onClick={() => setIsNavOpen(false)}>
              Discover
            </Link>
          </li>
          <li>
            <Link to="/reviews" onClick={() => setIsNavOpen(false)}>
              Reviews
            </Link>
          </li>
          {/* <li>
            <Link to="/lists">Lists</Link>
          </li> */}
        </ul>
        <AiOutlineMenu
          className={`menu-icon ${isNavOpen ? "nav-open" : ""}`}
          onClick={toggleNavOpen}
        />
        <AiOutlineClose
          className={`close-menu-icon ${isNavOpen ? "nav-open" : ""}`}
          onClick={toggleNavOpen}
        />
      </nav>
    </header>
  );
};

export default Header;
