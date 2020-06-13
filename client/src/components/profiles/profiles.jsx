import React, { Fragment, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../redux/actions/profile.action';
import Spinner from "../layouts/spinner";
import ProfileItem from "./profileItem";

const Profiles = ({ profile: {profiles, loading}, getProfiles }) => {

    useEffect(() => {
        getProfiles()
    }, [])

  return (
    <Fragment>
      <h1 class="large text-primary">Developers</h1>
      <p class="lead">
        <i class="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div class="profiles">
        {
            loading ? <Spinner /> :
            <Fragment>
                {
                    profiles ? 
                    profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
                     : 
                    (<h4>There is no profile to display</h4>)
                }
            </Fragment>
        }
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
