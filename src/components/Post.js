import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Post extends Component {
  render() {
    const { title, body, author } = this.props.post

    return (
      <div>
        <h3>Post {title} </h3>
        <p>{body}</p>
        <p>By: {author}</p>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const post = state.posts.posts.find(post => post.id === props.postId) || {};

  return {
    post: post
  }
}

export default withRouter(connect(mapStateToProps)(Post))
