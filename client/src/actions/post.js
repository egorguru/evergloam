import axios from 'axios'

export const create = (post) => ({ state, setState }) => {
  axios
    .post('/api/posts', post)
    .then((res) => setState({
      post: {
        posts: [res.data, ...state.post.posts]
      }
    }))
}

export const getAll = (params) => ({ setState }) => {
  setState({ post: { isLoading: true }})
  axios
    .get('/api/posts', { params })
    .then((res) => setState({
      post: {
        posts: res.data,
        totalCount: +res.headers['x-total-count'],
        isLoading: false
      }
    }))
    .catch(() => setState({
      post: {
        isLoading: false,
        posts: [],
        totalCount: 0
      }
    }))
}

export const getById = (id, history) => ({ setState }) => {
  setState({ post: { isLoading: true }})
  axios
    .get(`/api/posts/${id}`)
    .then((res) => setState({
      post: {
        isLoading: false,
        post: res.data
      }
    }))
    .catch(() => {
      setState({ post: { isLoading: false }})
      history.push('/404')
    })
}

export const remove = (id) => ({ state, setState }) => {
  axios
    .delete(`/api/posts/${id}`)
    .then(() => setState({
      post: {
        posts: state.post.posts.filter((post) => post._id !== id)
      }
    }))
}

export const createLike = (postId) => ({ state, setState }) => {
  axios
    .post(`/api/posts/${postId}/likes`)
    .then((res) => setState({
      post: {
        post: res.data,
        posts: state.post.posts.map((p) => p._id === res.data._id ? res.data : p)
      }
    }))
}

export const removeLike = (postId, likeId) => ({ state, setState }) => {
  axios
    .delete(`/api/posts/${postId}/likes/${likeId}`)
    .then((res) => setState({
      post: {
        post: res.data,
        posts: state.post.posts.map((p) => p._id === res.data._id ? res.data : p)
      }
    }))
}

export const createComment = (postId, comment) => ({ state, setState }) => {
  axios
    .post(`/api/posts/${postId}/comments`, comment)
    .then((res) => setState({
      post: {
        posts: state.post.posts.map(p => p._id === res.data._id ? res.data : p)
      }
    }))
}

export const removeComment = (postId, commentId) => ({ state, setState }) => {
  axios
    .delete(`/api/posts/${postId}/comments/${commentId}`)
    .then((res) => setState({
      post: {
        posts: state.post.posts.map(p => p._id === res.data._id ? res.data : p)
      }
    }))
}
