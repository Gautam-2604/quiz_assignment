import React, { useState } from "react";

const RoomForm = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  // Function to handle room creation
  const handleCreateRoom = async () => {
    if (name.trim()) {
      try {
        const response = await fetch("http://127.0.0.1:8000/create-room", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        if (!response.ok) throw new Error("Failed to create room");

        const data = await response.json();
        alert(`Room created! Your Room ID is: ${data.roomId}`);
      } catch (error) {
        console.error("Error creating room:", error);
        alert("Error creating room. Please try again.");
      }
    } else {
      alert("Please enter your name!");
    }
  };

  // Function to handle joining a room
  const handleJoinRoom = async () => {
    if (roomId.trim() && name.trim()) {
      try {
        const response = await fetch("http://127.0.0.1:8000/join-room", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, roomId }),
        });

        if (!response.ok) throw new Error("Failed to join room");

        const data = await response.json();
        alert(`Successfully joined room: ${data.roomId}`);
      } catch (error) {
        console.error("Error joining room:", error);
        alert("Error joining room. Please try again.");
      }
    } else {
      alert("Please enter both your name and a room ID!");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 rounded-lg w-64"
      />
      <button
        onClick={handleCreateRoom}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg w-64"
      >
        Create Room
      </button>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border px-4 py-2 rounded-lg w-64"
      />
      <button
        onClick={handleJoinRoom}
        className="bg-green-500 text-white px-6 py-2 rounded-lg w-64"
      >
        Join Room
      </button>
    </div>
  );
};

export default RoomForm;
