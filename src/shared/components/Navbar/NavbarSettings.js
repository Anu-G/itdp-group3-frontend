import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { navItemsSettings } from "./NavItemsSettings";

function NavbarSettings() {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="navbar">
        <Link to="#" className="nav-menu-icon" onClick={showSidebar}>
          <FontAwesomeIcon icon={faBars}/>
        </Link>
        <button to="#" className="btn btn-warning " type="submit">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
      <div
        className={sidebar ? "sidebar-container active" : "sidebar-container"}
      >
        <ul className="sidebar-items">
          <li className="sidebar-toggle">
            <Link to="#" className="nav-menu-icon" onClick={showSidebar}>
              <div>
              <img src="/logo-toktok.png" width="185.08" height="60" className="d-inline-block align-top" alt="logo-toktok"/>
              <span>
              <FontAwesomeIcon icon={faBars}/>
              </span>
              </div>
            </Link>
          </li>
          {navItemsSettings.map((sidebaritem) => {
            return (
              <li
                key={sidebaritem.id}
                className={sidebaritem.sName}
                onClick={showSidebar}
              >
                <Link to={sidebaritem.path}>
                  {sidebaritem.icon}
                  <span>{sidebaritem.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default NavbarSettings;