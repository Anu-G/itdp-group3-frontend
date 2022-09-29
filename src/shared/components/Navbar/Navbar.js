import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Text32White } from "../Label/Label";
import { ButtonComponent } from "../Button/Button";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../selectors/Selectors";
import { InputTextLabelMd } from "../InputWithLabel/InputWithLabel";
import { SearchColumn } from "../SearchColumn/SearchColumn";
import { UseDep } from "../../context/ContextDep";
import { AppErrorAuth } from "../../../utils/AppErrors";
import { LoadingScreenSm } from "../LoadingScreen/LoadingScreen";
import { SearchDetail } from "../../../pages/Search/SearchDetail";
import { DetailProductCard } from "../../../pages/DetailProductCard/DetailProductCard";

function Navbar({ title, navItems, buttons }) {
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

  return (
    <>

      <div
        // className={sidebar ? "sidebar-container active" : "sidebar-container"}
        className="sidebar-container"
      >
        <div className="sidebar-ctn-itm">
          <ul className="sidebar-items">
            <li className="sidebar-toggle">
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
                <ButtonComponent label={btn.label} onClick={btn.onClick} isLoading={btn.isLoading} />
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}

export default Navbar;

export const HeaderBar = () => {

  const navigate = useNavigate();
  const homeClick = _ => {
    navigate('/')
  }

  const profileClick = _ => {
    navigate('/profile')
  }

  const searchClick = _ =>{
    navigate('/feeds/search')
  }

  const [value, setSearchValue] = useState('')

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <>
    <div className="navbar">
        <div className="navbar-ctn">
        <div className="web-logo" onClick={homeClick}>
          <img src="/Toktok-Logo-Wide.png" height={'48px'} className="d-inline-block align-top img-logo-corner" alt="logo-toktok" />
        </div>

        <div className="search-ctn-wrp">
          <SearchColumn value={value} handleOnChange={handleChange} />
          <div className="search-btn" onClick={searchClick}>
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>
        </div>
        <button className="btn btn-warning btn-profile" type="submit" onClick={profileClick}>
          <FontAwesomeIcon icon={faUser} />
        </button>
        </div>
      </div>
    </>
  )
}