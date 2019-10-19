import axios from 'axios'

import {
  POST_LOADING,
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  CLEAR_POSTS,
  UPDATE_POST
} from './types'

export const create = (post) => (dispatch) => {
  axios
    .post('/api/posts', post)
    .then((res) => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
}

export const getAll = (params) => (dispatch) => {
  dispatch(setPostLoading(true))
  axios
    .get('/api/posts', { params })
    .then((res) => dispatch({
      type: GET_POSTS,
      payload: {
        posts: res.data,
        totalCount: +res.headers['x-total-count']
      }
    }))
    .catch(() => {
      dispatch(setPostLoading(false))
      dispatch(clearPosts())
    })
}

export const getById = (id) => (dispatch) => {
  dispatch(setPostLoading(true))
  axios
    .get(`/api/posts/${id}`)
    .then((res) => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(() => dispatch(setPostLoading(false)))
}

export const remove = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then(() => dispatch({
      type: DELETE_POST,
      payload: id
    }))
}

export const createLike = (postId, TYPE) => (dispatch) => {
  axios
    .post(`/api/posts/${postId}/likes`)
    .then((res) => dispatch({
      type: TYPE,
      payload: res.data
    }))
}

export const removeLike = (postId, likeId, TYPE) => (dispatch) => {
  axios
    .delete(`/api/posts/${postId}/likes/${likeId}`)
    .then((res) => dispatch({
      type: TYPE,
      payload: res.data
    }))
}

export const createComment = (postId, comment) => (dispatch) => {
  axios
    .post(`/api/posts/${postId}/comments`, comment)
    .then((res) => dispatch({
      type: UPDATE_POST,
      payload: res.data
    }))
}

export const removeComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/api/posts/${postId}/comments/${commentId}`)
    .then((res) => dispatch({
      type: UPDATE_POST,
      payload: res.data
    }))
}

const clearPosts = () => ({
  type: CLEAR_POSTS
})

const setPostLoading = (isLoading) => ({
  type: POST_LOADING,
  payload: isLoading
})
