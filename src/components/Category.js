import React, { Component } from 'react';
import { connect } from 'react-redux';

class Category extends Component {
  render() {

    const { category } = this.props

    return (
      <div className="category">
        <h3>Category {category.name}</h3>
        <p> Path {category.path} </p>

      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const category = state.categories.categories.find(category => category.path === props.categoryId) || {};

  return {
    category: category
  }
}

export default connect(mapStateToProps)(Category)
