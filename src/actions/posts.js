import * as api from '../utils/api';

export const GET_POSTS = "GET_POSTS"
export const CHANGE_ORDER_POSTS = "CHANGE_ORDER_POSTS"

export function loadPosts(posts) {
  return {
    type: GET_POSTS,
    posts: posts
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

export const changeOrderPosts = order => ({
  type: CHANGE_ORDER_POSTS,
  order
})
