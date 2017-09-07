import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Comment extends Component {
  render() {
    const { body, author, voteScore, timestamp } = this.props.comment;

    return (
      <div className="comment">
        <h3>Comment</h3>
        <p>By: {author}</p>
        <p>Body: {body}</p>
        <p>Vote Score: {voteScore}</p>
        <p>Time: {new Date(timestamp).toString()}</p>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const comment = state.comments.comments.find(comment => comment.id === props.commentUuid)
  return {
    comment: comment
  }
}

export default withRouter(connect(mapStateToProps)(Comment))
