import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Modal from 'react-modal';

import Comment from './Comment';
import CommentForm from './CommentForm';
import PostForm from './PostForm';
import NoMatch from './NoMatch';

import { deletePost, likePost, dislikePost } from '../actions/posts';
import { getCommentsByPost } from '../actions/comments';

import LikeButton from 'react-icons/lib/fa/thumbs-o-up';
import DislikeButton from 'react-icons/lib/fa/thumbs-o-down';
import DeleteButton from 'react-icons/lib/fa/trash-o';
import AddButton from 'react-icons/lib/fa/plus-square-o';
import EditButton from 'react-icons/lib/fa/wrench';

class Post extends Component {
  state = {
    sorting: "voteScore",
    modalOpenPost: false,
    modalOpenComment: false,
    post: {}
  }

  onChange = (ev) => {
    ev.preventDefault();
    this.setState({ sorting : ev.target.value })
  }

  componentDidMount() {
    if (this.props.post.title !== undefined) {
      if (this.props.match.params.postUuid ) {
        return this.props.fetchCommentsByPost(this.props.match.params.postUuid)
      }
    } else {
        return (
          <NoMatch />
        )}
  }

  getPost = () => {
    const { id, body, title, author, timestamp, category } = this.props.post;

    return {
      id,
      author,
      timestamp,
      body,
      title,
      category,
    }
  }

  getPostUuid = () => {
    return this.props.postUuid || this.props.match.params.postUuid;
  }

  likePost = (ev) => {
    ev.preventDefault();
    this.props.likePost(this.getPostUuid())
  }

  dislikePost = (ev) => {
    ev.preventDefault();
    this.props.dislikePost(this.getPostUuid())
  }

  editPost = (ev) => {
    ev.preventDefault();
    this.setState({ modalOpen : true })
  }

  closeModalPost = () => {
    this.setState({ modalOpenPost : false })
  }

  editPostHandler = (ev) => {
    ev.preventDefault();
    this.setState({ modalOpenPost: true });
  }

  deletePostHandler = (ev) => {
    ev.preventDefault();
    this.props.deletePost(this.props.post.id);
  }

  closeModalComment = () => {
    this.setState({ modalOpenComment : false})
  }

  addCommentHandler = (ev) => {
    ev.preventDefault();
    this.setState({ modalOpenComment: true });
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
    const { showComment, showDetail } = this.props
    const commentsView = showComment ? this.getCommentsView() : null

    return (
    <div className="post">
        <div className="post-title">
          <Link
            className="postLink"
            to={this.props.linkPost}
          ><h3 className="post-title-content">{title}</h3>
          </Link>
          <button className="post-title-content" onClick={this.likePost}><LikeButton size={15}/></button>
          <button className="post-title-content" onClick={this.dislikePost}><DislikeButton size={15}/></button>
          <button className="post-title-content" onClick={this.editPostHandler}><EditButton size={15}/></button>
          <button className="post-title-content" onClick={this.deletePostHandler}><DeleteButton size={15}/></button>
          {showDetail
            ? <button className="post-title-content" onClick={this.addCommentHandler}><AddButton size={15}/></button>
            : null}
        </div>

        <p>By: {author}</p>
        <p>Vote Score: {voteScore}</p>
        <p>Time: {new Date(timestamp).toString().slice(0,24)}</p>
        { showDetail
          ? <div>
              <p>Body: {body}</p>
            </div>
          : null }

        { showDetail
          ? <div>
              <label>Order comments </label>
                <select value={this.state.sorting} onChange={this.onChange} ref="sortingSelector">
                  <option value="voteScore">Vote Score</option>
                  <option value="timestamp">Time</option>
                </select>

              { commentsView }
            </div>
          : null }

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpenComment}
          onRequestClose={this.closeModalComment}
          contentLabel='Modal'
          >
          <CommentForm closeForm={this.closeModalComment} isUpdate={false} post={this.getPost()} />
        </Modal>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpenPost}
          onRequestClose={this.closeModalPost}
          contentLabel='Modal'
        >
          <PostForm closeForm={this.closeModalPost} isUpdate={true} post={this.getPost()} />
        </Modal>
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
    showComment: props.match.params.postUuid !== undefined,
    showDetail: props.match.params.postUuid !== undefined
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentsByPost: (postUuid) => dispatch(getCommentsByPost(postUuid)),
    deletePost: (postUuid) => dispatch(deletePost(postUuid)),
    dislikePost: (postUuid) => dispatch(dislikePost(postUuid)),
    likePost: (postUuid) => dispatch(likePost(postUuid))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
