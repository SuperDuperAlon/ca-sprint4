import { useState } from "react";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

// import { removeFromCart, checkout } from '../store/car.actions'
import { UserMsg } from "./user-msg.jsx";

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="author">
        <div className="name">Alon Mlievski</div>
        <div className="flex row justify-center">
          {" "}
          <div className="li-icon">
            <Link to="https://www.linkedin.com/in/alon-mlievski-6756aa74/">
              <FaLinkedin />
            </Link>
          </div>
          <div className="gh-icon">
            <Link to="https://github.com/SuperDuperAlon/">
              <FaGithubSquare />
            </Link>
          </div>
        </div>
      </div>
      <div className="author">
        <div className="name">Noah Markovich</div>
        <div className="flex row justify-center">
          <div className="li-icon">
            <FaLinkedin />
          </div>
          <div className="gh-icon">
            <FaGithubSquare />
          </div>
        </div>
      </div>

      <div className="author">
        <div className="name">Yarden Zeron</div>
        <div className="flex row justify-center">
          <div className="li-icon">
            <FaLinkedin />
          </div>
          <div className="gh-icon">
            <FaGithubSquare />
          </div>
        </div>
      </div>
    </footer>
  );
}
