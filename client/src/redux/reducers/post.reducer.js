

import { GET_POSTS, POST_ERROR } from "../constant";

const INITIAL_STATE = {
    posts: [],
    post: null,
    loading: true,
    errors: []
}

const post = (state=INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type){
        case GET_POSTS:
            return { ...state, posts: payload, loading:false };
        case POST_ERROR:
            return { ...state, posts: [], loading:false, post: null }
        default:
            return state;
    }
}

export default post;