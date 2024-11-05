from fastapi import WebSocket, WebSocketDisconnect

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, user: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.setdefault(user, []).append(websocket)

    def disconnect(self, user: str, websocket: WebSocket):
        self.active_connections[user].remove(websocket)

    async def send_personal_message(self, user: str, message: str):
        for connection in self.active_connections.get(user, []):
            await connection.send_text(message)

manager = ConnectionManager()
