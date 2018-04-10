import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Categories extends Component {
  constructor(props){
    super(props);

    this.findDuplicateCategories = this.findDuplicateCategories.bind(this);
    this.handleNewCategory = this.handleNewCategory.bind(this);
    this.messageDiv = this.messageDiv.bind(this);
    this.displaySortArrows = this.displaySortArrows.bind(this);
    this.state={
      noError:0,
      noCategoryName:1,
      duplicateCategory:2,
      error:0,
      errors: ["", "Please enter a name for your new category", "This category already exists"],
    }
  }

  findDuplicateCategories = (categories, value) => {
    // store flags
    let foundDuplicate = false;
    let i;
    let lcCategory;
    let lcValue;

    for (i=0; i<categories.length;i++) {
        lcCategory = categories[i].categoryName.toLowerCase();
        lcValue = value.toLowerCase();
        if (lcCategory === lcValue)
        {
            foundDuplicate = true;
            break;
        }
    }
    return foundDuplicate;
  }

  handleNewCategory(e){
    e.preventDefault();

    let value = e.target.elements.newCategory.value;

    if(!value){ 
      this.setState({error:this.state.noCategoryName}, console.log("no Category name"));
      return; 
    } 

    const categories = this.props.newTabCategory;
    let result = this.findDuplicateCategories(categories, value);
    if(result  === true) {
      this.setState({error:this.state.duplicateCategory}, console.log("duplicate Category name"));
      return; 
    } 

    this.setState({error: 0}); // no errors, so reset the value
    this.props.handleNewCategory(value);
  }

  messageDiv = () => {
    let display;
    let error = this.state.error;
    console.log("messageDiv: ", this.state.error);

    if(error){
      display = this.state.errors[this.state.error];
    }else {
      if(this.props.newTabCategory.length === 0){
        display = this.state.errors[this.state.noCategoryName];
      } 
    }

    return(
      display
    );
  }

  displaySortArrows = () => {
    let displayArrow;
   
    if (this.props.newTabCategory.length > 2) {
      displayArrow = <i className="fas fa-sort"></i>;
    } else {
      displayArrow = "";
    } 
    return displayArrow;
  }

  render(){
    return(
      <div id="categories" className="categories">
        <h3>Categories</h3>
        <form onSubmit={this.handleNewCategory}>
          <input
            type="text"
            name="newCategory"
            value={this.props.name}
            onChange={this.props.handleNameChange}
          />
          <button
            type="button"
            type="submit">
            New
          </button>
        </form>
        <div className="div-msg">
          {this.displaySortArrows()}
        </div>
        <div>
          {this.messageDiv()}
        </div>  
        <ul className="ul-no-bullet">
        {
          this.props.newTabCategory.map((group) =>
            <li key={group.categoryName} >
              <Link className="nav-link active" to={`/category/${group.categoryName}`}>{group.categoryName}</Link>
            </li>
          )
        }
        </ul>
      </div>
    );
  }
}

export default Categories;