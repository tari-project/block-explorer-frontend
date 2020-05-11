import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import "./TopBar.css";

export default function TopBar() {
  return (
    <div className="TopBar">
      <div className="TopBar-logoContainer">
        <Logo fill="#9330ff" />
      </div>
      <div className="TopBar-searchContainer"></div>
    </div>
  );
}
