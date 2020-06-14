import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({experience: { title, company, description, to, current, from, location }}) => {
    return (
        <div>
            <h3 className="text-dark">{company} </h3>
            <p>
            <Moment format='YYYY/MM/DD'>{from}</Moment> - { !current ? (<Moment format='YYYY/MM/DD'>{to}</Moment>): 'Present' }
            </p>
            <p><strong>Position: </strong>{title} </p>
            <p><strong>Location: </strong>{location} </p>
            <p>
              <strong>Description: </strong> {description}
            </p>
          </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileExperience
