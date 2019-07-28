import React from 'react'

const NotificationBar = ({ notifications }) => {
    if (!notifications.length)
        return null

    return (
        <div className="notification-container">
            {notifications.map((n, i) =>
                <div key={i}>
                    <div className={n.success ? 'notification success' : 'notification error'}>{n.message}</div>
                </div>
            )}
        </div>
    )
};

export default NotificationBar;
