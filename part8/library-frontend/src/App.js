import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { ADD_BOOK, All_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`New Book ${addedBook.title} added `);

      addedBook.genres.concat("").forEach((genre) => {
        client.cache.updateQuery(
          { query: ALL_BOOKS, variables: { genre } },
          (data) => {
            return data ? { allBooks: data.allBooks.concat(addedBook) } : null;
          }
        );
      });

      client.cache.updateQuery({ query: All_AUTHORS }, ({ allAuthors }) => {
        if (
          allAuthors.find((author) => author.name === addedBook.author.name)
        ) {
          return {
            allAuthors: allAuthors.map((author) =>
              author.name === addedBook.author.name
                ? { ...author, bookCount: author.bookCount + 1 }
                : author
            ),
          };
        } else {
          return {
            allAuthors: allAuthors.concat({
              name: addedBook.author.name,
              born: null,
              bookCount: 1,
            }),
          };
        }
      });
    },
  });

  useEffect(() => {
    const token = window.localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
