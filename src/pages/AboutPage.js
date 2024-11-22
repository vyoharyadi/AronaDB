import React from "react";
import { FaGithub } from "react-icons/fa";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-section">
        <h1>About App</h1>
        <p>
          This app serves as a comprehensive database for the game Blue Archive,
          offering detailed information about characters, banners, and raid
          events. It aims to assist players in staying updated with the latest
          game data and strategies.
        </p>
      </div>

      <div className="credit-section">
        <h1>Credit</h1>
        <ul>
          <li>
            <a
              href="https://github.com/vyoharyadi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="icon" /> My GitHub
            </a>
          </li>
        </ul>
      </div>

      <div className="credit-section">
        <h1>Credit</h1>
        <ul>
          <li>
            <a
              href="https://github.com/torikushiii/BlueArchiveAPI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="icon" /> BlueArchiveAPI by torikushiii
            </a>
          </li>
          <li>
            <a
              href="https://github.com/arufars/api-blue-archive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="icon" /> BlueArchiveAPI by arufars
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
