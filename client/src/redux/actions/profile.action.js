import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from '../constant';


const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/v1/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { error: err.response.statusText, status: err.response.status }
        })
    }
}
