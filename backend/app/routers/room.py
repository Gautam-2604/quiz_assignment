from fastapi import APIRouter, HTTPException
from app.services.room_manager import room_manager

router = APIRouter()

@router.post("/create-room")
async def create_room(host_id: str):
    """Create a new room for the host."""
    room = room_manager.create_room(host_id)
    return {"room_id": room.room_id, "message": "Room created successfully"}

@router.post("/join-room")
async def join_room(room_id: str, player_id: str):
    """Join an existing room."""
    try:
        room_manager.get_room(room_id)
        return {"message": "Room joined successfully"}
    except HTTPException as e:
        raise e
