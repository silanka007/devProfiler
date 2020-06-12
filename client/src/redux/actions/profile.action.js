import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from '../constant';
import { alertAction } from './alert.action';



export const getProfile = () => async dispatch => {
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


// create and edit user profile
export const createProfile = (formData, history, edit=false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/v1/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(alertAction( edit ? 'profile updated successfully': 'profile created successfully', 'success'));
        
        if(!edit){
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(alertAction(error.msg, 'danger')))
        }
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { error: err.response.statusText, status: err.response.status }
        })
        
    }
}
