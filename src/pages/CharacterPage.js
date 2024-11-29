import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CharacterPage.css";
import Modal from "../components/Modal";
import splashArt from "../assets/splashart.png";

const CharacterPage = () => {
  const [groupedCharacters, setGroupedCharacters] = useState({});
  const [imageUrls, setImageUrls] = useState({});
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          "https://api.ennead.cc/buruaka/character/"
        );
        const data = response.data;
        groupByAlphabet(data);
        fetchImages(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacters();
  }, []);

  const groupByAlphabet = (data) => {
    const grouped = data.reduce((acc, character) => {
      const firstLetter = character.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(character);
      return acc;
    }, {});
    setGroupedCharacters(grouped);
  };

  const fetchImages = async (characters) => {
    const imageMap = {};
    await Promise.all(
      characters.map(async (character) => {
        try {
          const response = await axios.get(
            `https://api.ennead.cc/buruaka/character/${character.name}`
          );
          const characterData = response.data;
          imageMap[character.name] = {
            photoUrl: characterData?.image?.icon || null,
            imageSchool: characterData?.imageSchool || null,
          };
        } catch (error) {
          console.error(`Error fetching image for ${character.name}:`, error);
          imageMap[character.name] = {
            photoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
            imageSchool: null,
          };
        }
      })
    );
    setImageUrls(imageMap);
  };

  const openModal = (characterName) => {
    setSelectedCharacter(characterName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
    setIsModalOpen(false);
  };

  return (
    <div className="character-page">
      <div className="splashart">
        <img src={splashArt} alt="splashart" className="splashart-image" />
      </div>
      <div className="main-character">
        <div className="alphabet-sidebar">
          {Array.from({ length: 26 }, (_, i) => {
            const letter = String.fromCharCode(65 + i);
            return groupedCharacters[letter] ? (
              <a href={`#${letter}`} className="alphabet-link" key={i}>
                {letter}
              </a>
            ) : null;
          })}
        </div>
        <div className="character-list">
          {Object.keys(groupedCharacters)
            .sort()
            .map((letter) => (
              <div key={letter} id={letter} className="character-section">
                <h2 className="section-heading">{letter}</h2>
                <div className="card-container">
                  {groupedCharacters[letter].map((character) => (
                    <div
                      key={character.id}
                      className="character-card"
                      onClick={() => openModal(character.name)}
                    >
                      <img
                        src={
                          imageUrls[character.name]?.photoUrl ||
                          "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                        }
                        alt={character.name}
                        className="character-image"
                      />
                      <h2 className="character-name">{character.name}</h2>
                      <p className="character-school">
                        {character.school}{" "}
                        {/* <img
                          src={
                            imageUrls[character.name]?.imageSchool ||
                            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                          }
                          alt={`${character.school} logo`}
                          className="school-logo"
                        /> */}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        characterName={selectedCharacter}
      />
    </div>
  );
};

export default CharacterPage;
