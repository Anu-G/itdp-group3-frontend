import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { navItems } from "./NavItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { UserLogoutAction } from "../../../pages/Login/state/AuthAction";
import { UseDep } from "../../context/ContextDep";

function Navbar() {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const dispatch = useDispatch();
  const { authService } = UseDep();

  const onLogout = async _ => {
    try {
      const response = await authService.doLogout();
      if (response.status === 200) {
        dispatch(UserLogoutAction());
      }
    } catch (err) {
      alert(`${err.response.data.responseMessage}`);
    }
  }

  return (
    <>
      <div className="navbar">
        <Link to="#" className="nav-menu-icon" onClick={_ => showSidebar()}>
          <FontAwesomeIcon icon={faBars} />
        </Link>
        <button to="#" className="btn btn-warning btn-profile" type="submit">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
      <div
        className={sidebar ? "sidebar-container active" : "sidebar-container"}
      >
        <ul className="sidebar-items">
          <li className="sidebar-toggle">
            <Link to="#" className="nav-menu-icon" onClick={_ => showSidebar()}>
              <div>
                <img src="/logo-toktok.png" width="185.08" height="60" className="d-inline-block align-top" alt="logo-toktok" />
                <span>
                  <FontAwesomeIcon icon={faBars} />
                </span>
              </div>
            </Link>
          </li>
          {navItems.map((sidebaritem) => {
            return (
              <li
                key={sidebaritem.id}
                className={sidebaritem.sName}
                onClick={_ => showSidebar()}
              >
                <Link to={sidebaritem.path}>
                  {sidebaritem.icon}
                  <span onClick={sidebaritem.id === 'logout' ? onLogout : null}>{sidebaritem.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Navbar;