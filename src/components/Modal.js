import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";

const Modal = ({ isOpen, onClose, characterName }) => {
  const [characterData, setCharacterData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!characterName) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [data1, data2] = await Promise.allSettled([
          axios.get(`https://api.ennead.cc/buruaka/character/${characterName}`),
          axios.get(
            `https://api-blue-archive.vercel.app/api/characters/students?name=${characterName}`
          ),
        ]);

        const primaryData =
          data1.status === "fulfilled" ? data1.value.data : null;

        const secondaryData =
          data2.status === "fulfilled" && data2.value.data?.data?.length > 0
            ? data2.value.data.data[0]
            : null;

        const mergedData = {
          ...primaryData,
          char: secondaryData
            ? {
                photoUrl: secondaryData.photoUrl || null,
                background: secondaryData.background || null,
                hobbies: secondaryData.hobbies || [],
                affinities: secondaryData.affinity || [],
                voiceSample: secondaryData.voices || null,
                names: secondaryData.names || {},
                voice: secondaryData.voice || null,
                weaponUnique: secondaryData.weaponUnique || null,
                realeaseDate: secondaryData.realeaseDate || null,
                imageSchool: secondaryData.imageSchool || null,
              }
            : {},
        };

        setCharacterData(mergedData);
      } catch (err) {
        setError("Failed to fetch character data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [characterName]);

  const handleClose = () => {
    setCharacterData(null);
    setIsLoading(false);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={handleClose}>
          &times;
        </button>

        {isLoading && <p>Loading...</p>}
        {error && !characterData && <p className="error-message">{error}</p>}
        {characterData && (
          <div className="modal-body">
            {characterData.character && characterData.char && (
              <>
                <h2 className="modal-title">
                  {characterData.character.name} (
                  {characterData.character.fullname})
                </h2>
                <img
                  src={characterData.image.portrait}
                  alt={characterData.character.name}
                  className="character-portrait"
                />
                <div className="character-details">
                  {characterData.char.realeaseDate && (
                    <p>
                      <strong>Release Date:</strong>{" "}
                      {characterData.char.realeaseDate}
                    </p>
                  )}
                  <p>
                    <strong>Base Star:</strong>{" "}
                    {characterData.character.baseStar}
                  </p>
                  <p>
                    <strong>Rarity:</strong> {characterData.character.rarity}
                  </p>
                  <p>
                    <strong>Armor Type:</strong>{" "}
                    {characterData.character.armorType}
                  </p>
                  <p>
                    <strong>Bullet Type:</strong>{" "}
                    {characterData.character.bulletType}
                  </p>
                  <p>
                    <strong>Position:</strong>{" "}
                    {characterData.character.position}
                  </p>
                  <p>
                    <strong>Role:</strong> {characterData.character.role}
                  </p>
                  <p>
                    <strong>Squad Type:</strong>{" "}
                    {characterData.character.squadType}
                  </p>
                  <p>
                    <strong>Weapon Type:</strong>{" "}
                    {characterData.character.weaponType}
                  </p>
                  {characterData.char.weaponUnique && (
                    <p>
                      <strong>Weapon Unique:</strong>{" "}
                      {characterData.char.weaponUnique}
                    </p>
                  )}
                  <p>
                    <strong>Profile:</strong> {characterData.character.profile}
                  </p>
                  <h3>Additional Info</h3>
                  {characterData.char.photoUrl && (
                    <img
                      src={characterData.char.photoUrl}
                      alt="Additional Character"
                      className="character-detail-image"
                    />
                  )}
                  <img
                    src={characterData.image.lobby}
                    alt={characterData.character.name}
                    className="character-potrait"
                  />
                  {characterData.char.names &&
                    characterData.char.names.firstName && (
                      <p>
                        <strong>First Name:</strong>{" "}
                        {characterData.char.names.firstName}
                      </p>
                    )}
                  {characterData.char.names &&
                    characterData.char.names.lastName && (
                      <p>
                        <strong>Last Name:</strong>{" "}
                        {characterData.char.names.lastName}
                      </p>
                    )}
                  {characterData.char.names &&
                    characterData.char.names.japanName && (
                      <p>
                        <strong>Japan Name:</strong>{" "}
                        {characterData.char.names.japanName}
                      </p>
                    )}
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
                    <strong>Hobbies:</strong>{" "}
                    {Array.isArray(characterData.char.hobbies)
                      ? characterData.char.hobbies.join(", ")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Club:</strong> {characterData.info.club}
                  </p>
                  <p>
                    <strong>School:</strong> {characterData.info.school}
                  </p>
                  <p>
                    <strong>School Year:</strong>{" "}
                    {characterData.info.schoolYear}
                    {characterData.char.imageSchool && (
                      <img
                        src={characterData.char.imageSchool}
                        alt={characterData.character.name}
                        className="character-detail-image"
                      />
                    )}
                  </p>
                  {characterData.char.background && (
                    <p>
                      <strong>Background:</strong>{" "}
                      {characterData.char.background}
                    </p>
                  )}
                  <p>
                    <strong>Artist:</strong> {characterData.info.artist}
                  </p>
                  {characterData.char.voice && (
                    <p>
                      <strong>Voice Actor:</strong>{" "}
                      {characterData.info.voiceActor} (
                      {characterData.char.voice})
                    </p>
                  )}
                  {characterData.char.voiceSample && (
                    <div className="voice-container">
                      <p>
                        <strong>Voice Sample:</strong>
                      </p>
                      <audio controls>
                        <source
                          src={characterData.char.voiceSample}
                          type="audio/ogg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                  {characterData.char.affinities && (
                    <div className="affinities-container">
                      {characterData.char.affinities.map((affinity, index) => (
                        <div key={index} className="affinity-item">
                          {affinity.urban && (
                            <div className="affinity-detail">
                              <img
                                src={affinity.urban}
                                alt="Urban Icon"
                                className="affinity-icon"
                              />
                              {affinity.urbanEmotion && (
                                <img
                                  src={affinity.urbanEmotion}
                                  alt="Urban Emotion Icon"
                                  className="emotion-icon"
                                />
                              )}
                              <p>Urban</p>
                            </div>
                          )}
                          {affinity.outdoors && (
                            <div className="affinity-detail">
                              <img
                                src={affinity.outdoors}
                                alt="Outdoors Icon"
                                className="affinity-icon"
                              />
                              {affinity.outdoorsEmotion && (
                                <img
                                  src={affinity.outdoorsEmotion}
                                  alt="Outdoors Emotion Icon"
                                  className="emotion-icon"
                                />
                              )}
                              <p>Outdoors</p>
                            </div>
                          )}
                          {affinity.indoors && (
                            <div className="affinity-detail">
                              <img
                                src={affinity.indoors}
                                alt="Indoors Icon"
                                className="affinity-icon"
                              />
                              {affinity.indoorsEmotion && (
                                <img
                                  src={affinity.indoorsEmotion}
                                  alt="Indoors Emotion Icon"
                                  className="emotion-icon"
                                />
                              )}
                              <p>Indoors</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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
                    <strong>Heal Power Level 1:</strong>{" "}
                    {characterData.stat.healPowerLevel1}
                  </p>
                  <p>
                    <strong>Heal Power Level 100:</strong>{" "}
                    {characterData.stat.healPowerLevel100}
                  </p>
                  <p>
                    <strong>Defense Penetration Level 1:</strong>{" "}
                    {characterData.stat.defPenetrateLevel1}
                  </p>
                  <p>
                    <strong>Defense Penetration Level 100:</strong>{" "}
                    {characterData.stat.defPenetrateLevel100}
                  </p>
                  <p>
                    <strong>Ammo Count:</strong> {characterData.stat.ammoCount}
                  </p>
                  <p>
                    <strong>Ammo Cost:</strong> {characterData.stat.ammoCost}
                  </p>
                  <p>
                    <strong>Range:</strong> {characterData.stat.range}
                  </p>
                  <p>
                    <strong>Move Speed:</strong> {characterData.stat.moveSpeed}
                  </p>
                  <p>
                    <strong>Street Mood:</strong>{" "}
                    {characterData.stat.streetMood}
                  </p>
                  <p>
                    <strong>Outdoor Mood:</strong>{" "}
                    {characterData.stat.outdoorMood}
                  </p>{" "}
                  <p>
                    <strong>Indoor Mood:</strong>{" "}
                    {characterData.stat.indoorMood}
                  </p>
                  <h3>Terrains</h3>
                  <p>
                    <strong>Urban:</strong>{" "}
                    {characterData.terrain.urban.DamageDealt} Damage,{" "}
                    {characterData.terrain.urban.ShieldBlockRate} Shield Block
                    Rate
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
                    {characterData.terrain.indoor.ShieldBlockRate} Shield Block
                    Rate
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
