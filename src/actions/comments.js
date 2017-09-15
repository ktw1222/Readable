import * as api from '../utils/api';
import {
  getCommentsAction,
  addCommentAction,
  updateCommentAction,
  deleteCommentAction,
  likeCommentAction,
  dislikeCommentAction
} from './types';

export function getCommentsByPost(postId) {
  return (dispatch) => {
    api
      .getCommentsByPost(postId)
      .then((comments) => {
        dispatch(getCommentsAction(comments))
      })
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
