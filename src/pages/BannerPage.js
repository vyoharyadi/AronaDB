import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./BannerPage.css";
import splashArt from "../assets/splashart.png";

const BannerPage = () => {
  const [banners, setBanners] = useState({
    current: [],
    upcoming: [],
    ended: [],
  });
  const [activeAccordions, setActiveAccordions] = useState({});
  const contentRef = useRef([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "https://api.ennead.cc/buruaka/banner"
        );
        setBanners(response.data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const toggleAccordion = (section, index) => {
    const key = `${section}-${index}`;
    setActiveAccordions((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderAccordion = (sectionTitle, bannerData, sectionKey) => (
    <div className="accordion-container" key={sectionKey}>
      <h2>{sectionTitle}</h2>
      <div className="accordion">
        {bannerData.map((banner, index) => {
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
                <span className="accordion-title">
                  Rateup: {banner.rateups.join(", ")}
                </span>
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
                <p>Gacha Type: {banner.gachaType}</p>
                <p>Start At: {new Date(banner.startAt).toLocaleString()}</p>
                <p>End At: {new Date(banner.endAt).toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="banner-page">
      <div className="splashart">
        <img src={splashArt} alt="splashart" className="splashart-image" />
      </div>
      {renderAccordion("Current", banners.current, "current")}
      {renderAccordion("Upcoming", banners.upcoming, "upcoming")}
      {renderAccordion("Ended", banners.ended, "ended")}
    </div>
  );
};

export default BannerPage;
