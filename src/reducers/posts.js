import { GET_POSTS } from '../actions/posts';

const initialState = {
  posts: []
}

function posts(state=initialState, action) {
  switch (action.type) {
    case GET_POSTS :
      return Object.assign({}, state, {
        posts: action.posts
      })

    default :
      return state
  }
}
