import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Create Blog', async() => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm handleCreate={createBlog}/>)
    const title = container.querySelector('#title-input')
    const author = container.querySelector('#author-input')
    const url = container.querySelector('#url-input')
    const createButton = screen.getByText('create')
    await user.type(title, 'testing title')
    await user.type(author, 'testing author')
    await user.type(url, 'testing url')

    await user.click(createButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing title')
    expect(createBlog.mock.calls[0][0].author).toBe('testing author')
    expect(createBlog.mock.calls[0][0].url).toBe('testing url')

})