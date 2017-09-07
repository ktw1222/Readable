import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Comment from './Comment';
import { getCommentsByPost } from '../actions/comments';


class Post extends Component {
  state = {
    sorting: "voteScore"
  }

  onChange = (ev) => {
    ev.preventDefault();
    this.setState({ sorting : ev.target.value })
  }

  componentDidMount() {
    if (this.props.match.params.postUuid) {
      this.props.fetchCommentsByPost(this.props.match.params.postUuid)
    }
  }

  getCommentsView = () => {
    const sorting = this.state.sorting;

    return this.props.comments.sort((a, b) => {
      switch (sorting) {
        case 'voteScore' :
          return b.voteScore - a.voteScore;
        case 'timestamp' :
          return b.timestamp - a.timestamp;
        default :
          return null;
      }
    }).map((comment, index) => (
      <div key={index}>
        <Comment key={index} commentUuid={comment.id} />
      </div>
    ))
  }

  render() {
    const { title, body, author, timestamp, voteScore } = this.props.post
    const { showComment } = this.props

    let commentsView = null;
    if (showComment) {
      commentsView = this.getCommentsView()
    }

    return (
      <div>
        <h3>Post: {title} </h3>
        <p>{body}</p>
        <p>By: {author}</p>
        <p>Vote Score: {voteScore}</p>
        <p>Time: {new Date(timestamp).toString()}</p>
        <div>
          <select value={this.state.sorting} onChange={this.onChange}>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Time</option>
          </select>

          { commentsView }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const postUuid = props.postUuid || props.match.params.postUuid
  const post = state.posts.posts.find(post => post.id === postUuid) || {};
  const comments = state.comments.comments.filter(comment => comment.parentId === postUuid)

  return {
    post: post,
    comments: comments,
    showComment: props.match.params.postUuid !== undefined
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentsByPost: (postUuid) => dispatch(getCommentsByPost(postUuid))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
