import {
  GET_COMMENTS_BY_POST_ID,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  DISLIKE_COMMENT
} from '../actions/types';

const initialState = {
  comments: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_BY_POST_ID :
    case ADD_COMMENT :
    case UPDATE_COMMENT :
    case DELETE_COMMENT :
    case LIKE_COMMENT :
    case DISLIKE_COMMENT :
      return Object.assign({}, state, {
        comments: action.comments
      })
    default :
      return state
  }
}
