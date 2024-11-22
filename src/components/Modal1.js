import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal1.css";

const Modal = ({ name, onClose }) => {
  const [characterData, setCharacterData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api-blue-archive.vercel.app/api/characters/students?name=${name}`
        );
        setCharacterData(response.data.data[0]); // Assuming response returns an array
      } catch (err) {
        setError("Failed to fetch character details.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [name]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {characterData && (
          <div className="character-details">
            <img
              src={characterData.photoUrl}
              alt={characterData.name}
              className="character-detail-image"
            />
            <h2>{characterData.name}</h2>
            <p>
              <b>Age:</b> {characterData.age}
            </p>
            <p>
              <b>School:</b> {characterData.school}
            </p>
            <p>
              <b>Birthday:</b> {characterData.birthday}
            </p>
            <p>
              <b>Background:</b> {characterData.background}
            </p>
            <p>
              <b>Height:</b> {characterData.height}
            </p>
            <p>
              <b>Weapon:</b> {characterData.weapon} (
              {characterData.weaponUnique})
            </p>
            <p>
              <b>Damage Type:</b> {characterData.damageType}
            </p>
            <p>
              <b>Armor Type:</b> {characterData.armorType}
            </p>
            <p>
              <b>Role:</b> {characterData.role.join(", ")}
            </p>
            <p>
              <b>Release Date:</b> {characterData.realeaseDate}
            </p>
            <p>
              <b>Hobbies:</b> {characterData.hobbies.join(", ")}
            </p>
            <div className="voice-container">
              <p>
                <b>Voice Actor:</b> {characterData.voice}
              </p>
              <audio controls>
                <source src={characterData.voices} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="affinities">
              <p>
                <b>Affinities:</b>
              </p>
              <div>
                <img src={characterData.affinity[0]?.urban} alt="Urban Icon" />
                <img
                  src={characterData.affinity[0]?.urbanEmotion}
                  alt="Urban Emotion Icon"
                />
              </div>
              <div>
                <img
                  src={characterData.affinity[1]?.outdoors}
                  alt="Outdoors Icon"
                />
                <img
                  src={characterData.affinity[1]?.outdoorsEmotion}
                  alt="Outdoors Emotion Icon"
                />
              </div>
              <div>
                <img
                  src={characterData.affinity[2]?.indoors}
                  alt="Indoors Icon"
                />
                <img
                  src={characterData.affinity[2]?.indoorsEmotion}
                  alt="Indoors Emotion Icon"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
