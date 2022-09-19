import { useMutation } from "@apollo/client";
import { useState } from "react";
import { All_AUTHORS, EDIT_AUTHOR } from "../queries";

const AuthorBirth = ({ authors }) => {
  const [name, setName] = useState(authors[0] ? authors[0].name : "");
  const [birth, setBirth] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: All_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    console.log(name);
    editAuthor({ variables: { name, birth: Number(birth) } });
  };

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author, index) => (
              <option key={index} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
        </div>

        <div>
          birth
          <input
            value={birth}
            onChange={({ target }) => setBirth(target.value)}
          />
        </div>
        <button type="submit">update Author</button>
      </form>
    </>
  );
};

export default AuthorBirth;
