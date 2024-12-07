from fastapi import WebSocket, WebSocketDisconnect
from app.services.room_manager import room_manager
from app.services.question_generator import generate_question

async def websocket_endpoint(websocket: WebSocket, room_id: str, player_id: str):
    try:
        room = room_manager.get_room(room_id)
        await websocket.accept()
        room.players[player_id] = websocket

        # Notify others
        for other_player, other_socket in room.players.items():
            if other_player != player_id:
                await other_socket.send_json({"type": "player_joined", "player_id": player_id})

        # Communication loop
        while True:
            data = await websocket.receive_json()
            if data["type"] == "start_game":
                question = await generate_question()
                room.current_question = question
                room.correct_answer = question.split("\n")[-1].split(": ")[1]
                for ws in room.players.values():
                    await ws.send_json({"type": "new_question", "question": question})
            elif data["type"] == "submit_answer":
                answer = data["answer"]
                is_correct = answer == room.correct_answer
                score = room.leaderboard.get(player_id, 0)
                room.leaderboard[player_id] = score + (10 if is_correct else -5)
                for ws in room.players.values():
                    await ws.send_json({"type": "answer_result", "player_id": player_id, "is_correct": is_correct, "leaderboard": room.leaderboard})
    except WebSocketDisconnect:
        room.players.pop(player_id, None)
        for ws in room.players.values():
            await ws.send_json({"type": "player_left", "player_id": player_id})
