import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import User from "./components/user";
import Dialog from "./components/Dialog";

const socket = io.connect("http://localhost:3005");
const id = window.location.search.split("=")[1];

function App() {
  const socketRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socketRef.current = socket;
    socketRef.current.on("start", (data) => {
      setUser(data);
    });
    socketRef.current?.on("all", (data) => {
      setUser(data);
    });
    // socketRef.current.emit("start", id);
    socketRef.current.emit("allUsers");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  const [user, setUser] = useState(null);

  socketRef.current?.on("add", (data) => {
    socketRef.current.emit("start", id);
  });

  const getAllUser = () => {
    socketRef.current.emit("allUsers");
  };
  const addUsers = (user) => {
    return socketRef.current?.emit("addUser", user);
  };
  socketRef.current?.on("created", (data) => {
    alert(data);
  });
  return (
    <div className="App">
      <div className="cover">
        {open && <Dialog addUsers={addUsers} setOpen={setOpen} />}
        {user && user.map((userT, index) => <User userT={userT} key={index} />)}
        <div className="buttons">
          <button onClick={getAllUser}>Gimme All</button>
          <button onClick={() => setOpen(true)}>Add One</button>
        </div>
      </div>
    </div>
  );
}

export default App;
