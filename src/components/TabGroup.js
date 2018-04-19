import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TabGroup extends Component {
  constructor(props){
    super(props);

    this.openAllTabs = this.openAllTabs.bind(this);
    this.deleteAllTabs = this.deleteAllTabs.bind(this);
    this.deleteThisTab = this.deleteThisTab.bind(this);
    this.getCategoryName = this.getCategoryName.bind(this);
  }

  openAllTabs = () => (
    console.log("openAllTabs")
  );

  deleteThisTab = (e) => {
    console.log("deleteThisTab");
    e.preventDefault();
    let id = e.target.id;
    let name = e.target.name;
    console.log("target: ", e.target);
    console.log("id: ", id);
    this.props.deleteTab(id, name);
  };

  deleteAllTabs = () => {
    console.log("deleteAllTabs");
    let categoryName = this.props.match.params.categoryName;
    this.props.deleteTabGroup(categoryName);    
  };

  getCategoryName = () => {
    return 
  }

  render() {
    let categoryName = this.props.match.params.categoryName;
    console.log("tabGroup render - categoryName: ", categoryName);
    let tabs = this.props.getTabGroup(categoryName);
    console.log("tabGroup render - tabs: ", tabs);
    return(
      <div id="tab-group" className="main">
        <div className="row">
          <div className="btn-group btn-center">
            <button id='openAllTabs' onClick={this.openAllTabs} className="button">Open all</button>
            <button id='openAllTabs' onClick={this.deleteAllTabs} className="button">Delete all</button>
          </div>
          <div className="clear">
              {
                tabs.length === 0 ? (
                  <p>You haven't added any pages to {categoryName} yet.</p>
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
