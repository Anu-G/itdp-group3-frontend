import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Button.css";

function Button() {
  return (
    <>
      <Link to="profile">
        <button className="btn btn-warning">
          <Icons.FaUser />
          <span>Profile</span>
        </button>
      </Link>
    </>
  );
}

export default Button;