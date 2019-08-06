import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!notification)
    return null
  console.log(notification)

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = state => ({
  notification: state.notification
})

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
