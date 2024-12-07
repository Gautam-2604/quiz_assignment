import React from "react";
import { useNavigate } from "react-router-dom";
import RoomForm from "../components/RoomForm";
import { createRoom as apiCreateRoom, joinRoom as apiJoinRoom } from "../api";

const Home = () => {
  const navigate = useNavigate();

  const createRoom = async (hostId) => {
    try {
      const data = await apiCreateRoom(hostId);
      navigate(`/room/${data.room_id}`);
    } catch (error) {
      alert("Error creating room: " + error.message);
    }
  };

  const joinRoom = async (name, roomId) => {
    try {
      await apiJoinRoom(roomId, name);
      navigate(`/room/${roomId}?user=${encodeURIComponent(name)}`);
    } catch (error) {
      alert("Error joining room: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Quiz App</h1>
      <RoomForm onCreateRoom={createRoom} onJoinRoom={joinRoom} />
    </div>
  );
};

export default Home;
