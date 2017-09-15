import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import Category from './Category';

class CategoryList extends Component {
  render() {

    const { categories } = this.props
    const categoriesView = categories.map((category, index) => (
      <div key={index}>
        <Category categoryUuid={category.path} />
      </div>
    ))

    return (
      <div className="categories">
        { categoriesView }
      </div>
    )
  }
}

export default withRouter(CategoryList)
