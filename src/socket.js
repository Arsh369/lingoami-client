import { io } from "socket.io-client";

const socket = io("http://192.168.1.12:5000"); // Adjust for backend URL

export default socket;
