import * as api from '../utils/api';

export const GET_POSTS = "GET_POSTS"
export const ADD_POST = "ADD_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST = "DELETE_POST"
export const UPVOTE_POST = "UPVOTE_POST"
export const DOWNVOTE_POST = "DOWNVOTE_POST"

//GET_POSTS
export function loadPosts(posts) {
  return {
    type: GET_POSTS,
    posts: posts.filter(post => post.deleted === false)
  }
}

export function getPosts() {
  return (dispatch) => {
    api
      .getPosts()
      .then((posts) => {
        dispatch(loadPosts(posts));
    })
  }
}

//ADD_POST
export function addPostAction(posts) {
  return {
    type: ADD_POST,
    posts: posts.filter(post => post.deleted === false)
  }
}

export function addPost(post) {
  return (dispatch) => {
    api
      .addPost(post)
      .then(() => {
        api.getPosts()
          .then(posts => {
            dispatch(addPostAction(posts));
          })
      })
  }
}

//UPDATE_POST
export function updatePostAction(posts) {
  return {
    type: UPDATE_POST,
    posts: post.filter(post => post.deleted === false)
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

//DELETE_POST
export function deletePostAction(posts) {
  return {
    type: DELETE_POST,
    posts: posts.filter(post => post.deleted === false)
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

//UPVOTE_POST
export function upvotePostAction(posts) {
  return {
    type: UPVOTE_POST,
    posts: posts.filter(post => post.deleted === false)
  }
}

export function upvotePost(postId) {
  return (dispatch) => {
    api
      .votePost(postId, 'upVote')
      .then(() => {
        api.getPosts().then(posts => {
          dispatch(upvotePostAction(posts))
      })
    })
  }
}

//DOWNVOTE_POST
export function downvotePostAction(postId) {
  return {
    type: DOWNVOTE_POST
  }
}

export function downvotePost(postId) {
  return (dispatch) => {
    api
      .votePost(postId, 'downVote')
      .then(() => {
        api.getPosts().then(posts => {
          dispatch(downvotePostAction(posts))
      })
    })
  }
}
