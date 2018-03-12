import React from 'react';
import PropTypes from 'prop-types';

const UserDetails = props => {
  const { user } = props;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="user-details">
      <div className="user-detail-block">
        <div className="user-detail-title">Name:</div>
        <div className="user-detail-info">
          {fullName}
        </div>
      </div>
      <div className="user-detail-block">
        <div className="user-detail-title">Email:</div>
        <div className="user-detail-info">
          {user.email}
        </div>
      </div>
      <div className="user-detail-block">

        <div className="user-detail-title">Address:</div>
        <div className="user-detail-info">
          {user.address}
        </div>
      </div>
      <div className="user-detail-block">
        <div className="user-detail-title">Phone:</div>
        <div className="user-detail-info">
          {user.phoneNumber}
        </div>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string
  })
};

export default UserDetails;
