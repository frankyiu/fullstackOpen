import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toResetUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
const Menu = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        dispatch(toResetUser())
        notify('good bye!')
        navigate('/')
    }

    const notify = (message, type = 'info') => {
        dispatch(setNotification({ message, type }, 5000))
    }

    // const style = {
    //     padding: 3,
    //     display: 'flex',
    //     gap: '5px',
    //     alignItems: 'center',
    // }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#">
                    <Link to="/">Blogs</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#" as="span">
                            <Link to="/">blogs</Link>
                        </Nav.Link> */}
                        <Nav.Link href="#" as="span">
                            <Link to="/users">users</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>{user.name} logged in</Navbar.Text>
                    <Nav.Link href="#" onClick={logout}>
                        logout
                    </Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu
