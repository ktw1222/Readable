import { GET_POSTS } from '../actions/posts';

const initialState = {
  posts: []
}

 export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS :
      return Object.assign({}, state, {
        posts: action.posts
      })

    default :
      return state
  }
}
