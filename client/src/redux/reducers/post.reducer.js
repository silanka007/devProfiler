import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST } from "../constant";

const INITIAL_STATE = {
  posts: [],
  post: null,
  loading: true,
  errors: [],
};

const post = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POST:
        return {...state, loading:false, posts:[payload, ...state.posts]}
    case GET_POSTS:
      return { ...state, posts: payload, loading: false };
    case POST_ERROR:
      return { ...state, loading: false, errors: payload };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
      };
    default:
      return state;
  }
};

export default post;
