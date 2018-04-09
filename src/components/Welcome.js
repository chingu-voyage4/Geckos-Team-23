import React from 'react';

const Welcome = () => (
  <div id="welcome" className="main">
    <h1>Welcome to OneTab ++!</h1>
    <p>OneTab++ will help you organize your favorite pages into categories for easy access.</p>
    <ul className="welcome-list">
      <li>First you'll need to create a category to group your pages</li>
      <li>You can have as many categories as you'd like, but every page must belong to a category</li>
      <li>When you visit a web page you'd like to add, right-click and add it to a category</li>
    </ul>
    <p>You can customize your experience from the Settings menu.</p>
    <p>To get started, create your first category!</p>
  </div>
);

export default Welcome;