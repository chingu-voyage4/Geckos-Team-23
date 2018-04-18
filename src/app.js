import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ChinguMasterTab from './components/ChinguMasterTab';
import 'normalize.css/normalize.css'
import './styles/styles.scss'

ReactDOM.render((
  <BrowserRouter>
    <ChinguMasterTab />
  </BrowserRouter>
), document.getElementById('app'));