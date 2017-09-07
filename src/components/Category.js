import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Post from './Post';

class Category extends Component {
  render() {

    const { category, posts } = this.props

    return (
      <div className="category">

      <Link
        className="categoryLink"
        to={`/categories/${category.path}`}
      ><h3>Category: {category.name}</h3></Link>

        {posts.map((post, index) => (
          <div key={index}>
            <Post key={index} postUuid={post.id} />
            <Link
              className="postLink"
              to={`/categories/${category.path}/posts/${post.id}`}
            >Go to the post</Link>
          </div>
        ))}

      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const categoryUuid = props.categoryUuid || props.match.params.categoryUuid
  const category = state.categories.categories.find(category => category.path === categoryUuid) || {};
  const posts = state.posts.posts.filter(post => post.category === categoryUuid) || [];

  return {
    category: category,
    posts: posts
  }
}

export default withRouter(connect(mapStateToProps)(Category))
