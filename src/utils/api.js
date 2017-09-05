const api = "http://localhost:5001"

let token = localStorage.token

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  Accept: "application/json",
  Authorization: token
}

//Categories
export const getCategories = () => {
  return fetch(`${api}/categories`, { headers })
  .then(res => res.json());
}

export const getPostsByCategory = (category) => {
  return fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json());
}

//Posts
export const getPosts = (id = '') => {
  return fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json());
}

export const addPost = ({id, timestamp, title, body, owner, category}) => {
  return fetch(`${api}/posts`, { headers, method: 'POST', body: JSON.stringify({
    id,
    timestamp,
    title,
    body,
    owner,
    category
  })})
  .then(res => res.json());
}

export const editPost = (id = '', {title, body}) => {
  return fetch(`${api}/posts/${id}`, { headers, method: 'PUT', body: JSON.stringify({
    title,
    body,
  })})
  .then(res => res.json());
}

export const deletePost = (id = '') => {
  return fetch(`${api}/posts/${id}`, { headers, method: 'DELETE'})
  .then(res => res.json());
}

export const votePost = (id = '', typeVote) => {
  return fetch(`${api}/posts/${id}`, { headers, method: 'POST', body: JSON.stringify({
    option: typeVote
  })})
  .then(res => res.json());
}

//Comments
export const getCommentsByPost = (id = '') => {
  return fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json());
}

export const addCommentToPost = ({id, timestamp, body, owner, postId}) => {
  return fetch(`${api}/posts/${id}`, { headers, method: 'POST', body: JSON.stringify({
    id,
    timestamp,
    body,
    owner,
    parentId: postId
  })})
  .then(res => res.json());
}

export const getCommentById = (id = '') => {
  return fetch(`${api}/comments/${id}`, { headers })
  .then(res => res.json());
}

export const editComment = ({ timestamp, id, body }) => {
  return fetch(`${api}/comments/${id}`, { headers, method: 'PUT', body: JSON.stringify({
    body,
    timestamp
  })})
  .then(res => res.json());
}

export const deleteComment = (id = '') => {
  return fetch(`${api}/comments/${id}`, { headers, method: 'DELETE' })
  .then(res => res.json());
}

export const voteComment = (id = '') => {
  return fetch(`${api}/comments/${id}`, { headers, method: 'POST' })
  .then(res => res.json());
}
