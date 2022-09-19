import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = (props) => {
  const [favouriteGenre, setFavouriteGenre] = useState("");
  const me = useQuery(ME);
  const books = useQuery(ALL_BOOKS, { variables: { genre: favouriteGenre } });

  useEffect(() => {
    if (me.data) {
      setFavouriteGenre(me.data.me.favouriteGenre);
    }
  }, [me.data]);

  if (!props.show) {
    return null;
  }

  if (books.loading) return <div>loading...</div>;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favourite genre patterns</p>
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
    </div>
  );
};

export default Recommend;
