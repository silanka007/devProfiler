import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const defaultFormData = {
        email: '',
        password: ''
    }
    const [ formData, setFormData ] = useState(defaultFormData);
    const { email, password } = formData;

    const onLoginInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <Fragment>
            {/* <div className="alert alert-danger">
                Invalid credentials
            </div> */}
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" action="" onSubmit={(e) => onLoginFormSubmit(e)}>
                <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => onLoginInputChange(e)}
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => onLoginInputChange(e)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login;
