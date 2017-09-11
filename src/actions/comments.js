import * as api from '../utils/api';

export const GET_COMMENTS_BY_POST_ID = "GET_COMMENTS_BY_POST_ID"
export const ADD_COMMENT = "ADD_COMMENT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const LIKE_COMMENT = "LIKE_COMMENT"
export const DISLIKE_COMMENT = "DISLIKE_COMMENT"

//GET_COMMENTS_BY_POST_ID
export function getCommentsAction(comments) {
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
        dispatch(getCommentsAction(comments))
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
    api
      .editComment(comment)
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
    api
      .deleteComment(commentUuid)
      .then(() => {
        api.getCommentsByPost(postUuid).then((comments) => {
          dispatch(deleteCommentAction(comments))
        })
      })
  }
}

//UPVOTE_COMMENT
export function likeCommentAction(comments) {
  return {
    type: LIKE_COMMENT,
    comments: comments
  }
}

export function likeComment(postId, commentId) {
  return (dispatch) => {
    api
      .voteComment(commentId, 'upVote')
      .then(() => {
        api.getCommentsByPost(postId).then((comments) => {
          dispatch(likeCommentAction(comments))
        })
      })
  }
}

//DOWNVOTE_COMMENT
export function dislikeCommentAction(comments) {
  return {
    type: DISLIKE_COMMENT,
    comments: comments
  }
}

export function dislikeComment(postId, commentId) {
  return (dispatch) => {
    api
      .voteComment(commentId, 'downVote')
      .then(() => {
        api.getCommentsByPost(postId).then((comments) => {
          dispatch(dislikeCommentAction(comments))
        })
      })
  }
}
