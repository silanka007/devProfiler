import { POST_ERROR, GET_POSTS, UPDATE_LIKES, DELETE_POST } from "../constant"
import axios from "axios"
import {alertAction} from './alert.action';

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
        const res = await axios.delete(`/api/v1/posts/${postId}`);
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