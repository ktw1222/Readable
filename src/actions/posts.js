import * as api from '../utils/api';

export const GET_POSTS = "GET_POSTS"

export const getPosts = (posts) => ({
  type: GET_POSTS,
  posts: posts
})

export const fetchPosts = () => dispatch => (
  api
    .getPosts()
    .then(posts => dispatch(getPosts(posts))
  )
)
