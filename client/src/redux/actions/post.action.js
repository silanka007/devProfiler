import { POST_ERROR, GET_POSTS } from "../constant"
import axios from "axios"

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
