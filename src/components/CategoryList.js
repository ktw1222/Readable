import React, { Component } from 'react';
import Category from './Category';

class CategoryList extends Component {
  render() {

    const { categories } = this.props

    return (
      <div className="categories">
        {categories.map((category, index) => (
          <div key={index}>
            <Category categoryId={category.path} />
          </div>
        ))}
      </div>
    )
  }
}

export default CategoryList
