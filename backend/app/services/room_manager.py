import uuid
from fastapi import HTTPException
from typing import Dict, Optional
from fastapi.websockets import WebSocket

class Room:
    def __init__(self, host_id: str):
        self.room_id: str = str(uuid.uuid4())[:8]
        self.host_id: str = host_id
        self.players: Dict[str, WebSocket] = {}
        self.leaderboard: Dict[str, int] = {}
        self.current_question: Optional[str] = None
        self.correct_answer: Optional[str] = None

class RoomManager:
    def __init__(self):
        self.rooms: Dict[str, Room] = {}

    def create_room(self, host_id: str) -> Room:
        room = Room(host_id)
        self.rooms[room.room_id] = room
        return room

    def get_room(self, room_id: str) -> Room:
        if room_id not in self.rooms:
            raise HTTPException(status_code=404, detail="Room not found")
        return self.rooms[room_id]

room_manager = RoomManager()
