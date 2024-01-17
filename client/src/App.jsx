import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";
function App() {
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.get("/users", { params: { name: searchName } }).then((res) => {
        setUsers(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <div key={user.id}>
                <h3>
                  Users{" "}
                  {<span style={{ color: "green" }}>{user.username}</span>}{" "}
                  found
                </h3>
              </div>
            );
          })
        ) : (
          <h3 style={{ color: "red" }}>No users found</h3>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Search for a name"
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
