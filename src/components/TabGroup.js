import React, { Component } from 'react';
import { Link } from 'react-router-dom';

  const getTabGroup = ( category ) => {
    if (category === 'React') {
      return [
        {
          tabKey: 1,
          categoryKey: 1,
          tabName: "My Favorite React Tutorial",
          tabURL: "https://www.somedomain.com"
        },
        {
          tabKey: 2,
          categoryKey: 1,
          tabName: "My Second Favorite React Tutorial",
          tabURL: "https://www.somedomain2.com"
        },
        {
          tabKey: 3,
          categoryKey: 1,
          tabName: "The Best React Tutorial Ever",
          tabURL: "https://www.somedomain2.com"
        },
      ];
    }
    else if(category === 'JavaScript') {
      return [
        {
          tabKey: 3,
          categoryKey: 2,
          tabName: "My Favorite JavaScript Tutorial",
          tabURL: "https://www.somedomain3.com"
        },
        {
          tabKey: 4,
          categoryKey: 2,
          tabName: "My Second Favorite JavaScript Tutorial",
          tabURL: "https://www.somedomain4.com"
        }
      ];
    }
    else {
        return [];
    }
  }

class TabGroup extends Component {
  constructor(props){
    super(props);

    this.sortTabs = this.sortTabs.bind(this);
    this.openAllTabs = this.openAllTabs.bind(this);
    this.deleteAllTabs = this.deleteAllTabs.bind(this);
    this.deleteThisTab = this.deleteThisTab.bind(this);
  }

  sortTabs = () => (
    console.log("sortTabs")
  );

  openAllTabs = () => (
    console.log("openAllTabs")
  );

  deleteAllTabs = () => (
    console.log("deleteAllTabs")
  );

  deleteThisTab = () => (
    console.log("deleteThisTab")
  );

  render() {
    let category = this.props.match.params.categoryName;
    let tabs = getTabGroup(category);
    return(
      <div id="tab-group" className="main">
        <div className="row">
          <div className="btn-group btn-center">
            <button id='clickableSortArrow' onClick={this.sortTabs} className="button"><i className="fas fa-sort"></i></button>
            <button id='openAllTabs' onClick={this.openAllTabs} className="button">Open all</button>
            <button id='openAllTabs' onClick={this.deleteAllTabs} className="button">Delete all</button>
          </div>
          <div className="clear">
              {
                tabs.length === 0 ? (
                  <p>You haven't added any pages to {category} yet.</p>
                ) : (
                <ul className="ul-no-bullet tab-group">
                {
                  tabs.map((group) =>
                  <li key={group.tabKey}>
                  <button 
                    id={group.tabKey} 
                    name={group.tabName} 
                    onClick={this.deleteThisTab} 
                    className="btn-tab delete-icon"
                    >
                    <i className="fa fa-times" aria-hidden="true" ></i>
                  </button>
                    <Link to={`${group.tabURL}`} className="link">{group.tabName}</Link>
                  </li>)
                }
                </ul>
                )
              }
            </div>
        </div>
      </div>
    );
  }
}

export default TabGroup;
