import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import OneTab from './components/OneTab';
import 'normalize.css/normalize.css'
import './styles/styles.scss'

ReactDOM.render((
  <BrowserRouter>
    <OneTab />
  </BrowserRouter>
), document.getElementById('app'));