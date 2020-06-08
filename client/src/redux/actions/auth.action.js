import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../constant';
import { alertAction } from './alert.action';

//this registers a new user
export const registerUserAction = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/v1/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        errors.forEach(error => dispatch(alertAction(error.msg, 'danger')))
        dispatch({
            type: REGISTER_FAIL
        })
    }
}
