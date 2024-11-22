import React, { useState, useEffect, useRef } from "react";
import "./RaidPage.css";
import bannerImage from "../assets/splashart.png";

const RaidPage = () => {
  const [raids, setRaids] = useState({ current: [], upcoming: [], ended: [] });
  const [activeAccordions, setActiveAccordions] = useState({});
  const contentRef = useRef([]);

  useEffect(() => {
    const fetchRaids = async () => {
      try {
        const response = await fetch("https://api.ennead.cc/buruaka/raid");
        const data = await response.json();
        setRaids(data);
      } catch (error) {
        console.error("Failed to fetch raids:", error);
      }
    };

    fetchRaids();
  }, []);

  const toggleAccordion = (section, index) => {
    const key = `${section}-${index}`;
    setActiveAccordions((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderAccordion = (sectionTitle, raidsData, sectionKey) => (
    <div className="accordion-container" key={sectionKey}>
      <h2>{sectionTitle}</h2>
      <div className="accordion">
        {raidsData.map((raid, index) => {
          const key = `${sectionKey}-${index}`;
          return (
            <div
              key={key}
              className={`accordion-item ${
                activeAccordions[key] ? "active" : ""
              }`}
            >
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(sectionKey, index)}
              >
                <span className="accordion-title">Season: {raid.seasonId}</span>
                <span className="accordion-icon">+</span>
              </button>
              <div
                className="accordion-content"
                ref={(el) => (contentRef.current[key] = el)}
                style={{
                  maxHeight: activeAccordions[key]
                    ? `${contentRef.current[key]?.scrollHeight}px`
                    : "0",
                  paddingBottom: activeAccordions[key] ? "16px" : "0",
                }}
              >
                <p>Boss Name: {raid.bossName}</p>
                <p>Start At: {new Date(raid.startAt).toLocaleString()}</p>
                <p>End At: {new Date(raid.endAt).toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="raid-page">
      <div className="splashart">
        <img src={bannerImage} alt="splashart" className="splashart-image" />
      </div>
      {renderAccordion("Current", raids.current, "current")}
      {renderAccordion("Upcoming", raids.upcoming, "upcoming")}
      {renderAccordion("Ended", raids.ended, "ended")}
    </div>
  );
};

export default RaidPage;
