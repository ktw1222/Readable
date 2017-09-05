import * as api from '../utils/api';

export const GET_CATEGORIES = "GET_CATEGORIES"
export const GET_POSTS_BY_CATEGORY = "GET_POSTS_BY_CATEGORY"

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories: categories
})

export const fetchCategories = () => dispatch => (
  api
    .getCategories()
    .then(categories => dispatch(getCategories(categories))
  )
)
