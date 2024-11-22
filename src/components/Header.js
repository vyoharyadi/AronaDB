import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaFlag,
  FaShieldAlt,
  FaInfoCircle,
  FaChevronRight,
  FaChevronLeft,
  FaBars,
} from "react-icons/fa";

import "./Header.css";

const Header = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  // Menu items
  const menuItems = [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Character", path: "/character", icon: <FaUser /> },
    { name: "Banner", path: "/banner", icon: <FaFlag /> },
    { name: "Raid", path: "/raid", icon: <FaShieldAlt /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
  ];

  return (
    <>
      <header className="header">
        <h1 className="header-title">Arona DB</h1>
      </header>

      <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h3 className="brand">
            <FaBars className="nav-icon" />
            <span className="nav-text">Menu</span>
          </h3>
          <div className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarCollapsed ? (
              <FaChevronRight className="toggle-icon" />
            ) : (
              <FaChevronLeft className="toggle-icon" />
            )}
          </div>
        </div>
        <ul className="nav-links">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${
                location.pathname.startsWith(item.path) ? "active" : ""
              }`}
            >
              <Link to={item.path}>
                <span className="nav-icon">{item.icon}</span>
                {!isSidebarCollapsed && (
                  <span className="nav-text">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
