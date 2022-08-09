import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (notification === null) {
        return null
    }

    const style = {
        variant: notification.type === 'alert' ? 'danger' : 'success',
        // background: 'lightgrey',
        // fontSize: 20,
        // borderStyle: 'solid',
        // borderRadius: 5,
        // padding: 10,
        // marginBottom: 10,
    }

    return (
        <Alert id="notification" {...style}>
            {notification.message}
        </Alert>
    )
}

export default Notification
