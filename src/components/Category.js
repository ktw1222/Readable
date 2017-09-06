import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Post from './Post';

class Category extends Component {
  render() {

    const { category, posts } = this.props

    return (
      <div className="category">
        <h3>Category {category.name}</h3>
        <p> Path {category.path} </p>

        {posts.map((post, index) => (
          <div key={index}>
            <Post key={index} postId={post.id} />
          </div>
        ))}

      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const category = state.categories.categories.find(category => category.path === props.categoryId) || {};
  const posts = state.posts.posts.filter(post => post.category === props.categoryId) || [];

  return {
    category: category,
    posts: posts
  }
}

export default withRouter(connect(mapStateToProps)(Category))
