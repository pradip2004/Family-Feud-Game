import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend Socket.IO server

export default socket;
