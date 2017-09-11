import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Category from './Category';

class CategoryList extends Component {
  render() {

    const { categories } = this.props
    const categoriesView = categories.map((category, index) => (
      <div key={index}>
        <Category categoryUuid={category.path} />
        <Link
          className="categoryLink"
          to={"/categories/" + category.path}
        >Go to the category</Link>
      </div>
    ))

    return (
      <div className="categories">
        { categoriesView }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return { };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryList))
