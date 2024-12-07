import asyncio
from app.services.room_manager import room_manager

async def cleanup_rooms():
    while True:
        await asyncio.sleep(3600)
        empty_rooms = [room_id for room_id, room in room_manager.rooms.items() if not room.players]
        for room_id in empty_rooms:
            del room_manager.rooms[room_id]

async def startup_event():
    asyncio.create_task(cleanup_rooms())
