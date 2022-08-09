import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
const NewBlogForm = ({ onCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onCreate({ title, author, url, likes: 0 })
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new</h2>

            <Form onSubmit={handleSubmit} className="mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        id="title"
                        placeholder="title of the blog"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>author</Form.Label>
                    <Form.Control
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        id="author"
                        placeholder="author of the blog"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>url</Form.Label>
                    <Form.Control
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        id="url"
                        placeholder="url of the blog"
                    />
                </Form.Group>

                <Button id="create-butto" type="submit">
                    create
                </Button>
            </Form>
        </div>
    )
}

export default NewBlogForm
