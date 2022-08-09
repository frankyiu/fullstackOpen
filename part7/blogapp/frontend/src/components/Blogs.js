import Table from 'react-bootstrap/esm/Table'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
    if (!blogs) return <></>

    // const style = {
    //     padding: 3,
    //     margin: 5,
    //     borderStyle: 'solid',
    //     borderWidth: 1,
    // }

    return (
        <>
            <Table striped>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>
                                <div className="blog">
                                    <Link to={`/blogs/${blog.id}`}>
                                        {blog.title} {blog.author}
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Blogs
