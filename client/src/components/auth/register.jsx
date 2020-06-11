import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { alertAction } from '../../redux/actions/alert.action';
import { registerUserAction } from '../../redux/actions/auth.action';

const Register = ({ isAuthenticated, alertAction, registerUserAction }) => {
    const defaultFormData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [formData, setFormData] = useState(defaultFormData);
    const { name, email, password, confirmPassword } = formData;

    const onRegisterInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onRegisterFormSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alertAction("password does not match", "danger");
            return;
        }
        registerUserAction({ name, email, password })
    }

    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Register</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" action="create-profile.html" onSubmit={(e) => onRegisterFormSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name"  autoComplete="name" value={name} onChange={(e) => onRegisterInputChange(e)} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email"  autoComplete="email" value={email} onChange={(e) => onRegisterInputChange(e)} />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        // minLength="6"
                        // 
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => onRegisterInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        // minLength="6"
                        
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => onRegisterInputChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Sign Up" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    alertAction: PropTypes.func.isRequired,
    registerUserAction: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { alertAction, registerUserAction })(Register);
