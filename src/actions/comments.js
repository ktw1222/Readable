import * as api from '../utils/api';

export const GET_COMMENTS_BY_POST_ID = "GET_COMMENTS_BY_POST_ID"
export const ADD_COMMENT = "ADD_COMMENT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const UPVOTE_COMMENT = "UPVOTE_COMMENT"
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT"

//GET_COMMENTS_BY_POST_ID
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

//ADD_COMMENT
export function addCommentAction(comments) {
  return {
    type: ADD_COMMENT,
    comments: comments
  }
}

export function addComment(comment) {
  return (dispatch) => {
    api
      .addCommentToPost(comment)
      .then(() => {
        api.getCommentsByPost(comment.parentId).then((comments) => {
          dispatch(addCommentAction(comments))
        })
      })
  }
}

//UPDATE_COMMENT
export function updateCommentAction(comments) {
  return {
    type: UPDATE_COMMENT,
    comments: comments
  }
}

export function updateComment(comment) {
  return (dispatch) => {
    api.
      editComment(comment)
      .then(() => {
        api.getCommentsByPost(comment.parentId).then((comments) => {
          dispatch(updateCommentAction(comments))
        })
      })
  }
}

//DELETE_COMMENT
export function deleteCommentAction(comments) {
  return {
    type: DELETE_COMMENT,
    comments: comments
  }
}

export function deleteComment(commentUuid, postUuid) {
  return (dispatch) => {
    api.
      deleteComment(commentUuid)
      .then(() => {
        api.getCommentsByPost(postUuid).then((comments) => {
          dispatch(deleteCommentAction(comments))
        })
      })
  }
}

//UPVOTE_COMMENT
export function upvoteCommentAction(comments) {
  return {
    type: UPVOTE_COMMENT,
    comments: comments
  }
}

export function upvoteComment(postId, commentId) {
  return (dispatch) => {
    api
      .voteComment(commentId, 'upVote')
      .then(() => {
        api.getCommentsByPost(postId).then((comments) => {
          dispatch(upvoteCommentAction(comments))
        })
      })
  }
}

//DOWNVOTE_COMMENT
export function downvoteCommentAction(comments) {
  return {
    type: DOWNVOTE_COMMENT,
    comments: comments
  }
}

export function downvoteComment(postId, commentId) {
  return (dispatch) => {
    api
      .voteComment(commentId)
      .then(() => {
        api.getCommentsByPost(postId).then(() => {
          dispatch(downvoteCommentAction(comments))
        })
      })
  }
}
