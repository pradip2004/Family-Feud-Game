import { io } from "socket.io-client";

const socket = io("https://family-feud-game.onrender.com"); // Backend Socket.IO server

export default socket;
