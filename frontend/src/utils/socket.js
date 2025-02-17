import { io } from "socket.io-client";

const socket = io("https://family-feud-game-sigma.vercel.app"); // Backend Socket.IO server

export default socket;
