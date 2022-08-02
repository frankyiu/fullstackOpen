import { connect } from 'react-redux'

const Notification = ({notification}) => {
  
  const style = {
    display: notification === ''? 'none' : 'block',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}
const mapStateToProps = (state)=>{
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification