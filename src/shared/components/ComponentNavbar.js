import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Component.css';

function ComponentNavbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
      <img src="/logo-toktok.png" width="185.08" height="60" className="d-inline-block align-top" alt="logo-toktok"/>
      </a>
      <button className="btn btn-warning btn-circle" type="submit">
      <FontAwesomeIcon icon={faUser} />
      </button>
    </nav>
  )
}

export default ComponentNavbar;