const api = "http://localhost:3001"
const TOKEN = '503a657b-1e4c-445b-b745-86341694f8df';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': TOKEN
}

//Categories
export const getCategories = () => {
  return fetch(`${api}/categories`, { headers })
  .then(res => res.json());
}

//Posts
export const getPostsByCategory = (category) => {
  return fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json());
}

export const getPosts = (id = '') => {
  return fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json());
}

export const addPost = ({id, timestamp, title, body, author, category}) => {
  return fetch(`${api}/posts`, { headers, method: 'POST', body: JSON.stringify({
    id,
    timestamp,
    title,
    body,
    author,
    category
  })})
  .then(res => res.json());
}

export const editPost = (id = '', {title, body}) => {
  return fetch(`${api}/posts/${id}`, { headers, method: 'PUT', body: JSON.stringify({
    title,
    body,
  })})
  .then(res => {return;});
}

export const deletePost = (id = '') => {
  return fetch(`${api}/posts/${id}`, { headers, method: 'DELETE'})
  .then(res => {return;});
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

export const addCommentToPost = ({id, timestamp, body, author, parentId}) => {
  return fetch(`${api}/comments`, { headers, method: 'POST', body: JSON.stringify({
    id,
    timestamp,
    body,
    author,
    parentId
  })})
  .then(res => {return;});
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
  .then(() => {return;});
}

export const deleteComment = (id = '') => {
  return fetch(`${api}/comments/${id}`, { headers, method: 'DELETE' })
  .then(() => {return;});
}

export const voteComment = (id = '', typeVote) => {
  return fetch(`${api}/comments/${id}`, { headers, method: 'POST', body: JSON.stringify({
    option: typeVote
  })})
  .then(() => {return;});
}
