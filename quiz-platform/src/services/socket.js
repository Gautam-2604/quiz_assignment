
import { io } from "socket.io-client";

const socket = io("http://localhost:8000/ws");

export default socket;