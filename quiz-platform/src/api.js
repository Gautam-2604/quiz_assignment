const API_BASE_URL = "http://localhost:8000";

export const createRoom = async (hostId) => {
  const response = await fetch(`${API_BASE_URL}/create-room`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host_id: hostId }),
  });
  if (!response.ok) throw new Error("Failed to create room");
  return await response.json();
};

export const joinRoom = async (roomId, playerId) => {
  const response = await fetch(`${API_BASE_URL}/join-room`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ room_id: roomId, player_id: playerId }),
  });
  if (!response.ok) throw new Error("Failed to join room");
  return await response.json();
};
