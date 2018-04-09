import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <div id="header" className="header header-bar">
        <div className="header-brand">OneTab++</div>
        <div>
            <ul className="ul-no-bullet">
                <li className="header-li">
                    <Link to={`/home`}>Home</Link>
                </li>
                <li className="header-li">
                    <Link to={`/settings`}>Settings</Link>
                </li>
            </ul>
        </div>
    </div>
);

export default Header;
