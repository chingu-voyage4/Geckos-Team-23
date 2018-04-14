import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Categories extends Component {
  constructor(props) {
    super(props);

    this.findDuplicateCategories = this.findDuplicateCategories.bind(this);
    this.handleNewCategory = this.handleNewCategory.bind(this);
    this.messageDiv = this.messageDiv.bind(this);
    this.sortCategories = this.sortCategories.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
      noError: 0,
      noCategoryName: 1,
      duplicateCategory: 2,
      error: 0,
      errors: ["", "Please enter a name for your new category", "This category already exists"],
    }
  }

  findDuplicateCategories = (categories, value) => {
    // store flags
    let foundDuplicate = false;
    let i;
    let lcCategory;
    let lcValue;
    console.log("findDuplicateCategories: ", categories);
    for (i = 0; i < categories.length; i++) {
      lcCategory = categories[i].categoryName.toLowerCase();
      lcValue = value.toLowerCase();
      if (lcCategory === lcValue) {
        foundDuplicate = true;
        break;
      }
    }
    return foundDuplicate;
  }

  handleNewCategory(e) {
    e.preventDefault();

    let value = e.target.elements.newCategory.value;
//    console.log("handleNewCategory - value 1: ", value);

    if(!value){ 
      this.setState({error:this.state.noCategoryName}, console.log("no Category name"));
      return; 
    } 

    const categories = this.props.newTabCategory;
    let result = this.findDuplicateCategories(categories, value);
//    console.log("findDuplicateCategories: result: ", result);
    if (result === true) {
      this.setState({ error: this.state.duplicateCategory }, console.log("duplicate Category name"));
      return;
    }

    this.setState({ error: 0 }); // no errors, so reset the value
    this.props.handleNewCategory(value);
    e.target.reset();
  }

  messageDiv = () => {
    let display;
    let error = this.state.error;

    if (error) {
      display = this.state.errors[this.state.error];
    } else {
      if (this.props.newTabCategory.length === 0) {
        display = this.state.errors[this.state.noCategoryName];
      }
    }

    return (
      display
    );
  }

  reset = (e) => {
    e.preventDefault;
//    e.target.reset();
    this.setState({error: 0}, console.log(this.state));
  }

  sortCategories = () => (
    // placeholder for Middleware function:
    console.log("sortCategories")
  );

  deleteCategory = (e) => {
    e.preventDefault;
    let id = e.target.id;
    let name = e.target.name;
    console.log("target: ", e.target);
    console.log("id: ", id);
    console.log("name: ", name);
//    // placeholder for Middleware function:
//    console.log("deleteCategory - this will also delete all the tabs!")
    if(confirm("Deleting a Category will delete all of the links you've saved.  Continue?")) {
      this.props.deleteCategory(id, name);
    }else {console.log("WHEW!");}
  };

  render() {
    let tabCategory = this.props.newTabCategory;
//    console.log("render: ", tabCategory);
    return (
      <div id="categories" className="categories">
        <div className="row">
          <div className="cat-center cat-divide">
            <form onSubmit={this.handleNewCategory}>
              <input
                type="text"
                name="newCategory"
                placeholder="New Category"
                size="10"
                className="cat-input"
              />
              <div className="btn-cat-group  btn-center">
                <button type="submit" className="button">New</button>
                <button type="reset" onClick={this.reset} className="button">Reset</button>
              </div>
            </form>
            {this.messageDiv()}
          </div>


          <div className="row cat-header cat-center">
            <span 
              id='clickableSortArrow' 
              onClick={this.sortCategories} 
              className="sort-icon">
                <i className="fas fa-sort"></i>
              </span>
              <span>Categories</span>
              
          </div>

        </div>
        <div className="row">
          <ul className="ul-no-bullet">
            {
              tabCategory.map((group) =>
                <li key={group.categoryKey} >
                  <button 
                    id={group.categoryKey} 
                    name={group.categoryName} 
                    onClick={this.deleteCategory} 
                    className="btn-cat delete-icon"
                  >
                    <i className="fa fa-times" aria-hidden="true" ></i>
                  </button>
                  <Link 
                    className="link" 
                    to={`/category/${group.categoryName}`}>{group.categoryName}
                  </Link>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Categories;