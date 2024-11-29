import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import "./HomePage.css";
import splashArt from "../assets/splashart.png";
import arona from "../assets/arona.png";

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCharacters = async () => {
    setIsLoading(true);
    setError(null);
    setCharacters([]);
    try {
      const response = await axios.get(
        "https://api-blue-archive.vercel.app/api/character/random?count=9"
      );
      setCharacters(response.data.data);
    } catch (err) {
      setError("Failed to fetch characters.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const openModal = (characterName) => {
    setSelectedCharacter(characterName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
    setIsModalOpen(false);
  };

  return (
    <div className="homepage">
      <div className="splashart-section">
        <img src={splashArt} alt="Splashart" className="splashart-image" />
        <img src={arona} alt="Arona" className="arona-image" />
        <h1 className="welcome-message">
          Welcome, Sensei!<br></br> Arona is here to assist you.
        </h1>
      </div>

      <section className="homepage-section characters">
        <h1>Character</h1>
        <button className="refresh-button" onClick={fetchCharacters}>
          Refresh Characters
        </button>
        {isLoading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="character-cards">
          {!isLoading &&
            characters.map((character) => (
              <div
                className="character-card"
                key={character._id}
                onClick={() => openModal(character.name)}
              >
                <img
                  src={character.photoUrl}
                  alt={character.name}
                  className="character-image"
                />
                <h2 className="character-name">{character.name}</h2>
                <p className="character-school">
                  {character.school}{" "}
                  <img
                    src={
                      character.imageSchool ||
                      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                    }
                    alt={`${character.school} logo`}
                    className="school-logo"
                  />
                </p>
              </div>
            ))}
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        characterName={selectedCharacter}
      />
    </div>
  );
};

export default HomePage;
