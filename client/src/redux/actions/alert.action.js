import { SET_ALERT, REMOVE_ALERT } from '../constant';
import uuid from 'uuid/v4';

export const alertAction = (msg, alertType) => dispatch => {
    const id = uuid();
    dispatch({ 
        type: SET_ALERT,
        payload: { id, msg, alertType }
     })
     //removing the alert Component from the UI
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id}), 4000);
}
