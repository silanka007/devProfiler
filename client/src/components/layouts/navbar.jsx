import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutAction } from '../../redux/actions/auth.action';


function Navbar({ auth: {loading, isAuthenticated }, logoutAction }) {
    const authLinks = (
        <>
            <li><a onClick={logoutAction} href="#!">Logout</a></li>
        </>
    );

    const guestLinks = (
        <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevProfiler</Link>
            </h1>
            <ul>
                <li><Link to="#!">Developers</Link></li>
                {
                    !loading && (<>{ isAuthenticated? authLinks : guestLinks }</>)
                }
            </ul>
      </nav>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutAction })(Navbar);
