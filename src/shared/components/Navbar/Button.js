import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Button() {
  return (
    <>
      <Link to="profile">
        <button className="btn btn-warning">
        <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </button>
      </Link>
    </>
  );
}

export default Button;