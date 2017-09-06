import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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

export default withRouter(connect()(CategoryList))
