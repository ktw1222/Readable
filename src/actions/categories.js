import * as api from '../utils/api';
import { getCategoriesAction } from './types';

export function getCategories() {
  return (dispatch) => {
    api
      .getCategories()
      .then(({ categories }) => {
        dispatch(getCategoriesAction(categories));
      })
  }
}
