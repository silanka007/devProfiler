import { POST_ERROR, GET_POSTS, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from "../constant"
import axios from "axios"
import {alertAction} from './alert.action';


export const getPost = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/v1/posts/${postId}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { error: err.response.statusText, status: err.response.status}
        })
    }
}


export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/v1/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { error: err.response.statusText, status: err.response.status}
        })
    }
}

export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/v1/posts', formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(alertAction('post created successfully', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { error: err.response.statusText, status: err.response.status}
        })
    }
}


export const likePost = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/v1/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { error: err.response.statusText, status: err.response.status}
        })
    }
}

export const unlikePost = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/v1/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { error: err.response.statusText, status: err.response.status}
        })
    }
}

export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/v1/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
        dispatch(alertAction('post deleted successfully', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { error: err.response.statusText, status: err.response.status}
        })
    }
}


export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/v1/posts/comment/${postId}`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(alertAction('Comment added successfully', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { error: err.response.statusText, status: err.response.status}
        })
    }
}


export const removeComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/v1/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(alertAction('Comment deleted successfully', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { error: err.response.statusText, status: err.response.status}
        })
    }
}
