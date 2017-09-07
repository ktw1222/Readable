import * as api from '../utils/api';

export const GET_COMMENTS_BY_POST_ID = "GET_COMMENTS_BY_POST_ID"

export function loadComments(comments) {
  return {
    type: GET_COMMENTS_BY_POST_ID,
    comments: comments
  }
}

export function getCommentsByPost(postId) {
  return (dispatch) => {
    api
      .getCommentsByPost(postId)
      .then((comments) => {
        dispatch(loadComments(comments))
      })
  }
}
