import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({education: { degree, school, fieldofstudy, description, to, current, from }}) => {
    return (
        <div>
            <h3 className="text-dark">{school} </h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> - { !current ? (<Moment format='YYYY/MM/DD'>{to}</Moment>): 'Present' }
            </p>
            <p><strong>Degree: </strong>{degree} </p>
            <p><strong>Field of Study: </strong>{fieldofstudy} </p>
            <p>
              <strong>Description: </strong> {description}
            </p>
          </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default ProfileEducation



