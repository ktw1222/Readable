//categories
export const GET_CATEGORIES = "GET_CATEGORIES"
export const GET_POSTS_BY_CATEGORY = "GET_POSTS_BY_CATEGORY"

export function getCategoriesAction(categories) {
  return {
    type: GET_CATEGORIES,
    categories: categories
  }
}

//posts
export const GET_POSTS = "GET_POSTS"
export const ADD_POST = "ADD_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST = "DELETE_POST"
export const LIKE_POST = "LIKE_POST"
export const DISLIKE_POST = "DISLIKE_POST"

export function getPostsAction(posts) {
  return {
    type: GET_POSTS,
    posts: posts.filter(post => post.deleted === false)
  }
}

export function addPostAction(posts) {
  return {
    type: ADD_POST,
    posts: posts.filter(post => post.deleted === false)
  }
}

export function updatePostAction(posts) {
  return {
    type: UPDATE_POST,
    posts: posts.filter(post => post.deleted === false)
  }
}

export function deletePostAction(posts) {
  return {
    type: DELETE_POST,
    posts: posts.filter(post => post.deleted === false)
  }
}

export function likePostAction(posts) {
  return {
    type: LIKE_POST,
    posts: posts.filter(post => post.deleted === false)
  }
}

export function dislikePostAction(postId) {
  return {
    type: DISLIKE_POST
  }
}

//comments
export const GET_COMMENTS_BY_POST_ID = "GET_COMMENTS_BY_POST_ID"
export const ADD_COMMENT = "ADD_COMMENT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const LIKE_COMMENT = "LIKE_COMMENT"
export const DISLIKE_COMMENT = "DISLIKE_COMMENT"

export function getCommentsAction(comments) {
  return {
    type: GET_COMMENTS_BY_POST_ID,
    comments: comments
  }
}

export function addCommentAction(comments) {
  return {
    type: ADD_COMMENT,
    comments: comments
  }
}

export function updateCommentAction(comments) {
  return {
    type: UPDATE_COMMENT,
    comments: comments
  }
}

export function deleteCommentAction(comments) {
  return {
    type: DELETE_COMMENT,
    comments: comments
  }
}

export function likeCommentAction(comments) {
  return {
    type: LIKE_COMMENT,
    comments: comments
  }
}

export function dislikeCommentAction(comments) {
  return {
    type: DISLIKE_COMMENT,
    comments: comments
  }
}
