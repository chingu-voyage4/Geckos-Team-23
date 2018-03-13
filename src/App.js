import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class NavBar extends Component {
   render(){
      return(
         <div className="goober col-sm-12 ">
            <nav className="navbar navbar-expand-sm">
               <a className="navbar-brand navbar-header" href="#OneTab">OneTab++</a>
               <ul className="navbar-nav justify-content-middle">
                  <li className="nav-item">
                     <a className="nav-link" href="#l1">Share Page</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="#l2">Export/Import</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="#l3">Help</a>
                  </li>
               </ul>
            </nav>
         </div>
      );
   }

}

class SideBar extends Component {
   render(){
      return(
         <nav className="col-md-2 d-none d-md-block form-control-dark sidebar goober">
            <div className="sidebar-sticky">
               <h3>Categories</h3>
               <form onSubmit={this.props.handleNewCategory}>
                  <input
                     type="text"
                     className="input-group input-group-sm"
                     name="newCategory"
                     value={this.props.name}
                     onChange={this.props.handleNameChange}
                  />
                  <span className="input-group-btn">
                     <button
                        type="button"
                        className="btn btn-primary"
                        type="submit">
                        New
                     </button>
                   </span>
               </form>
               <ul className="nav flex-column">
                  {
                     this.props.newTabCategory.map((group) =>
                     <li key={group.key} className="nav-item" >
                        <a className="nav-link active" href="#react">
                        {group.value} <span className="sr-only">(current)</span>
                        </a>
                     </li>)
                  }
               </ul>
            </div>
         </nav>
      );
   }
}

class Header extends Component {
   render(){
      return(
         <div className="d-flex justify-content-between flex-wrap flex-md-nowrap alignItems pb-2 mb-3 border-bottom">
            <h1 className="h2">Category Name</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
               <div className="btn-group mr-2">
                  <button className="btn btn-sm btn-outline-secondary">Manage Tab Categories
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

class Content extends Component {
   render(){
      return(
         <div className="table-responsive w-100 p-3">
            <table className="table table-striped table-sm">
               <thead>
                  <tr>
                     <th className="col-1">Open</th>
                     <th className="col-11">Page</th>
                  </tr>
               </thead>
               <tbody className="table-hover">
                  <tr>
                     <td className="col-1"><div className="checkbox checkbox-success">
                        <input type="checkbox" id="checkbox1" className="styled" />
                        <label></label></div></td>
                     <td className="col-11">Page Name 1</td>
                  </tr>
                  <tr>
                     <td className="col-1">
                        <div className="checkbox checkbox-success">
                        <input type="checkbox" id="checkbox1" className="styled"/>
                        <label></label>
                        </div>
                     </td>
                     <td className="col-11">Page Name 2</td>
                  </tr>
                  <tr>
                     <td className="col-1">
                        <div className="checkbox checkbox-success">
                        <input type="checkbox" id="checkbox1" className="styled"/>
                        <label></label>
                        </div>
                     </td>
                     <td className="col-11">Page Name 3</td>
                  </tr>
               </tbody>
            </table>
         </div>
      );
   }
}

class App extends Component {
   constructor(props){
      super(props);
      this.handleNewCategory = this.handleNewCategory.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);

      this.state = {
         name: '',
         keyIDX: 0,
         tabCategory: []
      }
   }

   handleNewCategory = (e) => {
      e.preventDefault(); // stop the whole page from re-rendering + adding data in URL

      let value = e.target.elements.newCategory.value;
      if(!value){ return; } // no empty tab group names!
      this.setState((prevState) => {
         return {
            tabCategory: prevState.tabCategory.concat({value: value, key : prevState.keyIDX}),
            keyIDX : prevState.keyIDX+1,
            name: ''
         };
      });
   }

   handleNameChange = (e) => {
      var value=e.target.value;
      this.setState({
         name: value,
         value: value,
      });
   }

  render() {
    return (
      <div>
         <div className="container-fluid">
            <div className="row goober">
               <NavBar />
            </div>

            <div className="row goober">
               <SideBar
               handleNewCategory={this.handleNewCategory}
               handleNameChange={this.handleNameChange}
               newTabCategory={this.state.tabCategory}
               keyIDX={this.state.keyIDX}
               name={this.state.name}
               />
               <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 goober">
                  <div className=" goober">
                     <Header />
                     <Content />
                  </div>
               </main>
            </div>
         </div>
      </div>
    );
  }
}

export default App;
