import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Modal.css";

const Modal = ({ isOpen, onClose, characterName }) => {
  const [characterData, setCharacterData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch character data whenever characterName changes
  useEffect(() => {
    if (!characterName) return;

    const fetchCharacterData = async () => {
      setIsLoading(true);
      setError(null);
      setCharacterData(null); // Reset data before loading new data
      try {
        const response = await axios.get(
          `https://api.ennead.cc/buruaka/character/${characterName}`
        );
        setCharacterData(response.data);
      } catch (err) {
        setError("Failed to fetch character data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacterData();
  }, [characterName]);

  // Handler for closing the modal
  const handleClose = () => {
    setCharacterData(null); // Reset character data on close
    setIsLoading(false); // Reset loading state
    setError(null); // Clear any existing error
    onClose(); // Call the parent close handler
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        <button className="modal-close-button" onClick={handleClose}>
          &times;
        </button>

        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {characterData && (
          <div className="modal-body">
            <h2 className="modal-title">
              {characterData.character.name} ({characterData.character.fullname}
              )
            </h2>
            <img
              src={characterData.image.portrait}
              alt={characterData.character.name}
              className="character-portrait"
            />
            <div className="character-details">
              <p>
                <strong>Base Star:</strong> {characterData.character.baseStar}
              </p>
              <p>
                <strong>Rarity:</strong> {characterData.character.rarity}
              </p>
              <p>
                <strong>Armor Type:</strong> {characterData.character.armorType}
              </p>
              <p>
                <strong>Bullet Type:</strong>{" "}
                {characterData.character.bulletType}
              </p>
              <p>
                <strong>Position:</strong> {characterData.character.position}
              </p>
              <p>
                <strong>Role:</strong> {characterData.character.role}
              </p>
              <p>
                <strong>Squad Type:</strong> {characterData.character.squadType}
              </p>
              <p>
                <strong>Weapon Type:</strong>{" "}
                {characterData.character.weaponType}
              </p>
              <p>
                <strong>Profile:</strong> {characterData.character.profile}
              </p>

              <h3>Additional Info</h3>
              <p>
                <strong>Age:</strong> {characterData.info.age}
              </p>
              <p>
                <strong>Birth Date:</strong> {characterData.info.birthDate}
              </p>
              <p>
                <strong>Height:</strong> {characterData.info.height}
              </p>
              <p>
                <strong>Artist:</strong> {characterData.info.artist}
              </p>
              <p>
                <strong>Club:</strong> {characterData.info.club}
              </p>
              <p>
                <strong>School:</strong> {characterData.info.school}
              </p>
              <p>
                <strong>Voice Actor:</strong> {characterData.info.voiceActor}
              </p>

              <h3>Stats</h3>
              <p>
                <strong>Attack Level 1:</strong>{" "}
                {characterData.stat.attackLevel1}
              </p>
              <p>
                <strong>Attack Level 100:</strong>{" "}
                {characterData.stat.attackLevel100}
              </p>
              <p>
                <strong>Max HP Level 1:</strong>{" "}
                {characterData.stat.maxHPLevel1}
              </p>
              <p>
                <strong>Max HP Level 100:</strong>{" "}
                {characterData.stat.maxHPLevel100}
              </p>
              <p>
                <strong>Defense Level 1:</strong>{" "}
                {characterData.stat.defenseLevel1}
              </p>
              <p>
                <strong>Defense Level 100:</strong>{" "}
                {characterData.stat.defenseLevel100}
              </p>
              <p>
                <strong>Move Speed:</strong> {characterData.stat.moveSpeed}
              </p>

              <h3>Terrains</h3>
              <p>
                <strong>Urban:</strong>{" "}
                {characterData.terrain.urban.DamageDealt} Damage,{" "}
                {characterData.terrain.urban.ShieldBlockRate} Shield Block Rate
              </p>
              <p>
                <strong>Outdoor:</strong>{" "}
                {characterData.terrain.outdoor.DamageDealt} Damage,{" "}
                {characterData.terrain.outdoor.ShieldBlockRate} Shield Block
                Rate
              </p>
              <p>
                <strong>Indoor:</strong>{" "}
                {characterData.terrain.indoor.DamageDealt} Damage,{" "}
                {characterData.terrain.indoor.ShieldBlockRate} Shield Block Rate
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
