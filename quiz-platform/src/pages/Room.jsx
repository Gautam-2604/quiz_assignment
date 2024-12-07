import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const playerName = new URLSearchParams(location.search).get("user");

  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/${roomId}/${playerName}`);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setWs(socket);

    return () => socket.close();
  }, [roomId, playerName]);

  const sendMessage = (type, payload) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type, ...payload }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Room: {roomId}</h1>
      <ul className="mb-4">
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
      <button
        onClick={() => sendMessage("start_game", {})}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Start Game
      </button>
    </div>
  );
};

export default Room;
