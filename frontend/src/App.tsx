import { useEffect } from "react";
import "./App.css";

const App = () => {
  function sendMessage() {
    ws.send("ping");
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onmessage = (ev) => {
      alert(ev.data);
    };
  }, []);
  return (
    <div>
      <div>
        <input type="text" placeholder="Message..."></input>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
