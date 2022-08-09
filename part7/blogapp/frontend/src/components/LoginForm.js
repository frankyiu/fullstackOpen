import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onLogin(username, password)
    }

    return (
        <div>
            <h2>Log in to application</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>username</Form.Label>
                    <Form.Control
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        id="username"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        id="password"
                    />
                </Form.Group>
                <Button id="login-button" type="submit">
                    login
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm
