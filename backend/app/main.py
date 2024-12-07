from fastapi import FastAPI
from app.routers import rooms
from app.websocket.ws_manager import websocket_endpoint
from app.tasks.cleanup import startup_event

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# Allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rooms.router)


app.websocket_route("/ws/{room_id}/{player_id}", websocket_endpoint)


app.on_event("startup")(startup_event)
