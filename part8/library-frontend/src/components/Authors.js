import { useQuery } from "@apollo/client";
import { All_AUTHORS } from "../queries";
import AuthorBirth from "./AuthorBirth";

const Authors = (props) => {
  const authors = useQuery(All_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (authors.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && <AuthorBirth authors={authors.data.allAuthors} />}
    </div>
  );
};

export default Authors;
