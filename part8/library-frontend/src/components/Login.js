import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem("library-user-token", token);
      props.setToken(token);
      props.setPage("authors");
    }
  }, [props, result.data]);

  if (!props.show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };
  return (
    <>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
