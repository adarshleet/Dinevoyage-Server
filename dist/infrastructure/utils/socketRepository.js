"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketRepository = void 0;
const socket_io_1 = require("socket.io");
class SocketRepository {
    constructor(httpServer) {
        this.users = [];
        this.handleConnection = (socket) => {
            console.log('a user connected!');
            //user connecting
            socket.on('addUser', user => {
                this.addUser(user, socket.id);
            });
            //send Message
            socket.on('sendMessage', ({ senderId, recieverId, text }) => {
                // console.log(text,recieverId,senderId)
                const reciever = this.getUser(recieverId);
                // console.log(this.users)
                // console.log("reciever",reciever)
                this.io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit('getMessage', {
                    senderId,
                    text
                });
            });
            //user disconnecting
            socket.on("disconnect", () => {
                console.log("a user disconnected!");
                this.removeUser(socket.id);
                this.io.emit("getUsers", this.users);
            });
        };
        //get user
        this.getUser = (recieverId) => {
            return this.users.find(user => user.userId == recieverId);
        };
        //adding user to the socket array
        this.addUser = (userId, socketId) => {
            console.log(userId, socketId);
            !this.users.some(user => user.userId === userId) &&
                this.users.push({ userId, socketId });
        };
        this.io = new socket_io_1.Server(httpServer, {
            cors: {
                // origin: 'http://localhost:5000'
                origin: process.env.CORS_URL
            }
        });
        this.io.on("connection", this.handleConnection);
    }
    removeUser(socketId) {
        this.users = this.users.filter((user) => user.socketId !== socketId);
    }
}
exports.SocketRepository = SocketRepository;
