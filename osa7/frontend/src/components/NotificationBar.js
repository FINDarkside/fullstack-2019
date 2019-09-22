import React from 'react';
import PropTypes from 'prop-types';

const NotificationBar = ({ notifications }) => {
  if (!notifications.length)
    return null;

  return (
    <div className="notification-container">
      {notifications.map((n, i) =>
        <div key={i}>
          <div className={n.success ? 'notification success' : 'notification error'}>{n.message}</div>
        </div>
      )}
    </div>
  );
};

NotificationBar.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default NotificationBar;
