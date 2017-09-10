import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST
} from '../actions/posts';

const initialState = {
  posts: []
}

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_POSTS :
    case ADD_POST :
    case UPDATE_POST :
    case DELETE_POST :
    case UPVOTE_POST :
    case DOWNVOTE_POST :
      return Object.assign({}, state, {
        posts: action.posts
      })

    default :
      return state
  }
}
