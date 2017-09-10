import {
  GET_COMMENTS_BY_POST_ID,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT
} from '../actions/comments';

const initialState = {
  comments: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_BY_POST_ID :
    case ADD_COMMENT :
    case UPDATE_COMMENT :
    case DELETE_COMMENT :
    case UPVOTE_COMMENT :
    case DOWNVOTE_COMMENT :
      return Object.assign({}, state, {
        comments: action.comments
      })
    default :
      return state
  }
}
