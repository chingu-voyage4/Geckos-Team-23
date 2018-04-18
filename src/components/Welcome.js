import React, {Component} from 'react';

const Welcome = () => (
      <div id="welcome" className="main">
        <h1>Welcome to Chingu MasterTab!</h1>
        <p>Chingu MasterTab will help you organize your favorite pages into categories for easy access.</p>
        <ol className="ol-decimal">
          <li>First you'll need to create a category to group your pages</li>
          <li>You can have as many categories as you'd like, but every page must belong to a category</li>
          <li>When you visit a web page you'd like to add, right-click and add it to a category</li>
        </ol>
      </div>
    );

export default Welcome;