import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Text32White } from "../Label/Label";
import { ButtonComponent } from "../Button/Button";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../selectors/Selectors";

function Navbar({ title, navItems, buttons }) {
  const [sidebar, setSidebar] = useState(true);
  const authRed = useSelector(AuthSelector)
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const [active, setActive] = useState(0);
  const showActive = (id) => {
    setActive(id);
  };

  const navigate = useNavigate();

  useEffect(_ => {
    if (title === "Timeline") {
      setActive(1);
    }
  }, []);

  const profileClick = _ => {
    navigate('/profile')
  }

  const homeClick = _ => {
    navigate('/')
  }

  return (
    <>
      <div className="navbar">
        <div className="web-logo" onClick={homeClick}>
          <img src="/logo-toktok.png" width="124px" className="d-inline-block align-top" alt="logo-toktok" />
        </div>
        {/* <Link to="#" className="nav-menu-icon" onClick={_ => showSidebar()}>
          <FontAwesomeIcon icon={faBars} />
        </Link> */}
        <button className="btn btn-warning btn-profile" type="submit" onClick={profileClick}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
      <div
        className={sidebar ? "sidebar-container active" : "sidebar-container"}
      >
        <ul className="sidebar-items">
          <li className="sidebar-toggle">
            {/* <Link to="#" className="nav-menu-icon" onClick={_ => showSidebar()}>
              <div>
                <img src="/logo-toktok.png" width="185.08" height="60" className="d-inline-block align-top" alt="logo-toktok" />
                <span>
                  <FontAwesomeIcon icon={faBars} />
                </span>
              </div>
            </Link> */}
            <div style={{ opacity: '0.8', marginBottom: '-1rem' }}>
              <Text32White text={title} />
            </div>

          </li>
          {navItems && navItems.map((sidebaritem) => {
            return (
              <li
                key={sidebaritem.id}
                className={sidebaritem.id === active ? `${sidebaritem.sName} sidebar-item-active` : `${sidebaritem.sName}`}
                onClick={_ => showActive(sidebaritem.id)}
              >
                <Link to={sidebaritem.path}>
                  <span className="sidebar-item-title">{sidebaritem.title}</span>
                </Link>
              </li>
            );
          })}
          {buttons && buttons.map((btn) => (
            <li key={btn.id} className={btn.className}>
              <ButtonComponent label={btn.label} onClick={btn.onClick} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;