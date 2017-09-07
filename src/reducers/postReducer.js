import { GET_POSTS, CHANGE_ORDER_POSTS } from '../actions/posts';

const initialState = {
  posts: []
}

export default (state = initialState, action) => {
  const { order } = action
  
  switch (action.type) {
    case GET_POSTS :
      return Object.assign({}, state, {
        posts: action.posts
      })

    case CHANGE_ORDER_POSTS :
      let newState = [...state]
      return newState.sort((a,b) => (b[order] - a[order]))

    default :
      return state
  }
}
