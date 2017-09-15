import * as api from '../utils/api';
import {
  getPostsAction,
  addPostAction,
  updatePostAction,
  deletePostAction,
  likePostAction,
} from './types';

export function getPosts() {
  return (dispatch) => {
    api
      .getPosts()
      .then((posts) => {
        dispatch(getPostsAction(posts));
    })
  }
}

export function addPost(post) {
  return (dispatch) => {
    api
      .addPost(post)
      .then(() => {
        api.getPosts().then(posts => {
          dispatch(addPostAction(posts));
        })
      })
  }
}

export function updatePost(post) {
  return (dispatch) => {
    api
      .editPost(post.id, {
        title: post.title,
        body: post.body
      })
      .then(() => {
        api.getPosts().then(posts => {
          dispatch(updatePostAction(posts))
      })
    })
  }
}

export function deletePost(postUuid) {
  return (dispatch) => {
    api
      .deletePost(postUuid)
      .then(() => {
        api.getPosts().then(posts => {
          dispatch(deletePostAction(posts))
      })
    })
  }
}

export function likePost(postId) {
  return (dispatch) => {
    api
      .votePost(postId, 'upVote')
      .then(() => {
        api.getPosts().then(posts => {
          dispatch(likePostAction(posts))
      })
    })
  }
}

export function dislikePost(postId) {
  return (dispatch) => {
    api
      .votePost(postId, 'downVote')
      .then((posts) => {
        api.getPosts().then(posts => {
          dispatch(likePostAction(posts))
      })
    })
  }
}
