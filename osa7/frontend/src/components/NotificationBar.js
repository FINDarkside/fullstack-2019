import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NotificationBar = ({ notifications }) => {
  console.log(notifications);
  if (!notifications.length)
    return null;
  return (
    <div className="notification-container">
      {notifications.map((notification) =>
        <div key={notification.id}>
          <div className={'notification ' + notification.mode}>{notification.message}</div>
        </div>
      )}
    </div>
  );
};

NotificationBar.propTypes = {
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.notifications
})
const ConnectedNotificationBar = connect(mapStateToProps, null)(NotificationBar);
export default ConnectedNotificationBar;
