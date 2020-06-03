import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const defaultFormData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [ formData, setFormData ] = useState(defaultFormData);
    const { name, email, password, confirmPassword } = formData;

    const onRegisterInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onRegisterFormSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            return console.log("password does not match");
        }
        console.log(formData);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Register</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" action="create-profile.html" onSubmit={(e) => onRegisterFormSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="Name" name="name" required autoComplete="name" value={name} onChange={(e) => onRegisterInputChange(e)} />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" required autoComplete="email" value={email} onChange={(e) => onRegisterInputChange(e)} />
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
                    minLength="6"
                    required
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
                    minLength="6"
                    required
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

export default Register;
