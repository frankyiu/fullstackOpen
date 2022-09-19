import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const allBooks = useQuery(ALL_BOOKS, { variables: { genre: "" } });
  const books = useQuery(ALL_BOOKS, { variables: { genre } });
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    if (allBooks.data) {
      setGenreList([
        ...new Set(allBooks.data.allBooks.flatMap((a) => a.genres)),
      ]);
    }
  }, [allBooks.data]);

  if (!props.show) {
    return null;
  }
  if (books.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>books</h2>
      <p>in gnere pattern</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* list of genres */}
      {genreList.map((a) => (
        <button key={a} onClick={() => setGenre(a)}>
          {a}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
