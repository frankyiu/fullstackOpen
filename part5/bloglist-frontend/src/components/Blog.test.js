import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'




test('Normal Display', () => {
    const blog = {
        author: 'testAuthor',
        likes: 0,
        url: 'testUrl',
        title: 'testTitle'
    }
    const { container } = render(<Blog blog={blog}/>)
    const div  = container.querySelector('.blog')
    const divDetail = container.querySelector('.blogDetail')
    expect(div).toHaveTextContent('testAuthor')
    expect(div).toHaveTextContent('testTitle')
    expect(divDetail).toHaveStyle('display:none')

})

test('When view button click', async () => {
    const blog = {
        author: 'testAuthor',
        likes: 0,
        url: 'testUrl',
        title: 'testTitle'
    }
    const { container } = render(<Blog blog={blog}/>)
    const divDetail = container.querySelector('.blogDetail')
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    expect(divDetail).toHaveStyle('display:block')
})


test('Test Like button', async () => {
    const blog = {
        author: 'testAuthor',
        likes: 0,
        url: 'testUrl',
        title: 'testTitle'
    }
    const mockHandler = jest.fn()
    render(<Blog blog={blog} handleLike={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
})