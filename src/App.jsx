import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/Discover/MovieList";
import MovieDetailsComponent from "./components/MovieDetails/MovieDetailsComponent";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Account from "./components/Account/Account";
import Hero from "./components/Hero/Hero";
import ReviewPage from "./components/Reviews/ReviewPage";

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const checkLoginStatus = async () => {
    try {
      const response = await fetch(
        "https://catalogue-cinematica-backend-74ab338129b9.herokuapp.com/check",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLoggedIn(data.active_session);
        setUser(data.user);
      } else {
        console.error("Failed to check login status");
      }
    } catch (error) {
      console.error("An error occurred while checking login status:", error);
    }
  };

  useEffect(() => {
    // Fetch discover movies when the component mounts
    checkLoginStatus();
  }, []);

  useEffect(() => {
    // Fetch discover movies when the user returns to '/'
    checkLoginStatus();
  }, [navigate]);

  return (
    <div className="app">
      {/* <img src="../public/img/seats.jpg" /> */}
      <Header isLoggedIn={isLoggedIn} userName={user?.username} />
      <Routes>
        <Route
          path="/movie/:id"
          element={<MovieDetailsComponent isLoggedIn={isLoggedIn} />}
        />
        <Route path="/" element={<Hero isLoggedIn={isLoggedIn} />} />
        <Route path="/films" element={<MovieList />} />
        <Route path="/account" element={<Account userId={user?.id} />} />
        <Route path="/reviews" element={<ReviewPage />} />
      </Routes>
    </div>
  );
};

export default App;
