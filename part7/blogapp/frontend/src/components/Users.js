import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
const Users = ({ users }) => {
    return (
        <>
            <h2>Users</h2>
            <Table>
                <thead>
                    <tr>
                        <td></td>
                        <td>blogs created</td>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    )
}

export default Users
