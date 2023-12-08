import SignupModal from "../SignupModal/SignupModal";
import "./Hero.css";
import { useState } from "react";

const Hero = ({ isLoggedIn }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="section-hero">
      <div className="hero container">
        <div className="hero-text">
          <h1 className="hero-main-header">
            Movies{" "}
            <span className="text-color-gold text-semi-bold">Inspire</span> Us
          </h1>
          <p className="hero-subheader">
            Join Catalogue Cinematica today and take your moviegoing experience
            to the next level — Discover, Watch, & Review
          </p>

          {isLoggedIn ? (
            <a className="btn" href="/films">
              Discover
            </a>
          ) : (
            <button className="btn" onClick={() => setOpenModal(true)}>
              Get Started
            </button>
          )}
        </div>
      </div>
      <SignupModal
        open={openModal}
        handleCloseModal={() => setOpenModal(false)}
      />
    </section>
  );
};

export default Hero;
