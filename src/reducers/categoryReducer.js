import { GET_CATEGORIES } from '../actions/categories';

const initialState = {
  categories: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES :
      return Object.assign({}, state, {
        categories: action.categories
      })

    default :
      return state
  }
}
