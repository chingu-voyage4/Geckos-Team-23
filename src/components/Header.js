import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div id="header" className="header header-bar">
    <div className="header-brand">Chingu Master Tab</div>
      <div>
        <ul className="ul-no-bullet">
          <li className="header-li">
            <Link to={`/`} className="header-link">Home</Link>
          </li>
          <li className="header-li">
            <Link to={`/about`} className="header-link">About</Link>
          </li>          
        </ul>
      </div>
  </div>
);

export default Header;
