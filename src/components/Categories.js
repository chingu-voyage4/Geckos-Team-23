import React from 'react';
import { Link } from 'react-router-dom';

const Categories = (props) => (
  <div id="categories" className="categories">
    <h3>Categories</h3>
    <form onSubmit={props.handleNewCategory}>
      <input
        type="text"
        name="newCategory"
        value={props.name}
        onChange={props.handleNameChange}
      />
      <button
        type="button"
        type="submit">
        New
      </button>
    </form>
    <ul className="ul-no-bullet">
    {
      props.newTabCategory.length === 0 ? (
        <p>Create your first Category</p>
      ) : (
        props.newTabCategory.map((group) =>
          <li key={group.categoryName} >
            <Link className="nav-link active" to={`/category/${group.categoryName}`}>{group.categoryName}</Link>
          </li>
        )
      )
    }
    </ul>
  </div>
);

export default Categories;