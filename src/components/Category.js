import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategories } from '../actions/categories';
import { getPosts } from '../actions/posts';

import Post from './Post';
import PostForm from './PostForm';

import Modal from 'react-modal';
import AddButton from 'react-icons/lib/fa/plus-square-o';

class Category extends Component {

  state = {
    sorting: "voteScore",
    modalOpen: false
  }

  openModal = (ev) => {
    ev.preventDefault();
    this.setState({ modalOpen : true })
  }

  closeModal = () => {
    this.setState({ modalOpen : false })
  }

  onChange = (ev) => {
    ev.preventDefault();
    this.setState({ sorting : ev.target.value })
  }

  getPostsView = (category) => {
    const sorting = this.state.sorting;

    return this.props.posts.sort((a, b) => {
      switch (sorting) {
        case 'voteScore' :
          return b.voteScore - a.voteScore;
        case 'timestamp' :
          return b.timestamp - a.timestamp;
        default :
          return null;
      }
    }).map((post, index) => (
      <div key={index}>
        <Post key={index} postUuid={post.id} linkPost={"/categories/" + category.path + "/posts/" + post.id}/>
      </div>
    ))
  }

  render() {

    const { category } = this.props;
    const postsView = this.getPostsView(category);
    const newPost = { category : category.path };

    return (
      <div className="category">
        <div className="category-title">
          <Link
            className="categoryLink"
            to={"/categories/" + category.path}
          ><h2 className="category-title-content">{category.name}</h2>
          </Link>
          <button className="category-title-content" onClick={this.openModal}><AddButton size={15}/></button>
        </div>

        <label>Order posts: </label>
        <select value={this.state.sorting} onChange={this.onChange} ref="sortingSelector">
          <option value="score">Vote Score</option>
          <option value="timestamp">Time</option>
        </select>

        { postsView }

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
        >
          <PostForm closeForm={this.closeModal} isUpdate={false} post={newPost} />
        </Modal>

      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const categoryUuid = props.categoryUuid || props.match.params.categoryUuid;
  const category = state.categories.categories.find(category => category.path === categoryUuid) || {};
  const posts = state.posts.posts.filter(post => post.category === categoryUuid) || [];
  const postOrdered = posts.sort((a, b) => {
    return b.voteScore - a.voteScore
  })

  return {
    category: category,
    posts: postOrdered
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(getCategories()),
    fetchPosts: () => dispatch(getPosts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category))
