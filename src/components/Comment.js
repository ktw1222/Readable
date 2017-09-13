import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CommentForm from './CommentForm';

import { deleteComment, likeComment, dislikeComment } from '../actions/comments';

import Modal from 'react-modal';
import LikeButton from 'react-icons/lib/fa/thumbs-o-up';
import DislikeButton from 'react-icons/lib/fa/thumbs-o-down';
import DeleteButton from 'react-icons/lib/fa/trash-o';
import EditButton from 'react-icons/lib/fa/wrench';

class Comment extends Component {
  state = {
    modalOpen : false
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  getPost = () => {
    const comment = this.props.comment;
    return {
      id: comment.parentId
    }
  }

  getComment = () => {
    const { body, author, id, timestamp } = this.props.comment || {};
    return {
      body,
      author,
      id,
      timestamp,
    }
  }

  editComment = (ev) => {
    ev.preventDefault();
    this.setState({ modalOpen: true });
  }

  deleteComment = (ev) => {
    ev.preventDefault();
    this.props.deleteComment(this.props.comment.id, this.props.comment.parentId);
  }

  likeComment = (ev) => {
    ev.preventDefault();
    const { id, parentId } = this.props.comment;
    this.props.likeComment(parentId, id);
  }

  dislikeComment = (ev) => {
    ev.preventDefault();
    const { id, parentId } = this.props.comment;
    this.props.dislikeComment(parentId, id);
  }

  render() {
    const { body, author, voteScore, timestamp } = this.props.comment;

    return (
      <div className="comment">
        <div className="comment-title">
          <button className="comment-title-content" onClick={this.likeComment}><LikeButton size={15}/></button>
          <button className="comment-title-content" onClick={this.dislikeComment}><DislikeButton size={15}/></button>
          <h3 className="comment-title-content">Comment</h3>
          <button className="comment-title-content" onClick={this.editComment}><EditButton size={15}/></button>
          <button className="comment-title-content" onClick={this.deleteComment}><DeleteButton size={15}/></button>
        </div>
        <p>By: {author}</p>
        <p>Body: {body}</p>
        <p>Vote Score: {voteScore}</p>
        <p>Time: {new Date(timestamp).toString().slice(0,24)}</p>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
        >
          <CommentForm closeForm={this.closeModal} isUpdate={true} post={this.getPost()} comment={this.getComment()} />
        </Modal>

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

function mapDispatchToProps(dispatch) {
  return {
    likeComment: (postUuid, commentUuid) => dispatch(likeComment(postUuid, commentUuid)),
    dislikeComment: (postUuid, commentUuid) => dispatch(dislikeComment(postUuid, commentUuid)),
    deleteComment: (postUuid, commentUuid) => dispatch(deleteComment(postUuid, commentUuid)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))
