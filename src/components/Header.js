import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <div id="header" className="header">
        OneTab++
        <ul className="ul-no-bullet header-navigation">
            <li >
                <Link to={`/settings`}>Settings</Link>
            </li>
        </ul>
    </div>
);

export default Header;
