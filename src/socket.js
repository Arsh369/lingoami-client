import { io } from "socket.io-client";

const socket = io("https://lingoami-server.onrender.com"); // Adjust for backend URL

export default socket;
