import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaFlag,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <FaHome />, route: "/home", className: "home" },
    {
      name: "Character",
      icon: <FaUser />,
      route: "/character",
      className: "character",
    },
    {
      name: "Banner",
      icon: <FaFlag />,
      route: "/banner",
      className: "banner",
    },
    { name: "Raid", icon: <FaShieldAlt />, route: "/raid", className: "raid" },
    {
      name: "About",
      icon: <FaInfoCircle />,
      route: "/about",
      className: "about",
    },
  ];

  // Tentukan menu aktif berdasarkan URL saat ini
  const activeMenu = menuItems
    .find((item) => location.pathname === item.route)
    ?.name.toLowerCase();

  return (
    <nav className="tabbar">
      <ul className="tab-style">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`${item.className} ${
              activeMenu === item.name.toLowerCase() ? "active" : ""
            }`}
            onClick={() =>
              setCurrentPage &&
              activeMenu !== item.name.toLowerCase() &&
              setCurrentPage(item.name.toLowerCase())
            }
          >
            <Link to={item.route} className="icon">
              {item.icon}
            </Link>
          </li>
        ))}
        {/* Posisi follow diatur berdasarkan index menu yang aktif */}
        <li
          className="follow"
          style={{
            left: `calc(50% - ${menuItems.length * 34.5}px + ${
              menuItems.findIndex(
                (item) => activeMenu === item.name.toLowerCase()
              ) * 65
            }px)`,
          }}
        ></li>
      </ul>
    </nav>
  );
};

export default Navbar;
