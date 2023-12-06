import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";

interface User {
    userId: string;
    socketId: string;
  }

export class SocketRepository {
    private io: SocketIOServer;
    private users: User[] = [];

    constructor(httpServer: HttpServer) {
        this.io = new SocketIOServer(httpServer, {
            cors: {
                origin: 'http://localhost:3000'
            }
        });

        this.io.on("connection", this.handleConnection);
    }

    private handleConnection = (socket: Socket) => {
        console.log('a user connected!');

        //user connecting
        socket.on('addUser',user=>{
            this.addUser(user,socket.id)
        });


        //send Message
        socket.on('sendMessage',({senderId,recieverId,text})=>{
            // console.log(text,recieverId,senderId)
            const reciever = this.getUser(recieverId) as User
            // console.log(this.users)
            // console.log("reciever",reciever)
            this.io.to(reciever?.socketId).emit('getMessage',{
                senderId,
                text
            })
        })



        //user disconnecting
        socket.on("disconnect", () => {
            console.log("a user disconnected!");
            this.removeUser(socket.id);
            this.io.emit("getUsers", this.users);
        });
    };

    private removeUser(socketId: string): void {
        this.users = this.users.filter((user) => user.socketId !== socketId);
    }

    //get user
    private getUser = (recieverId:string)=>{
        return this.users.find(user => user.userId == recieverId)
    }


    //adding user to the socket array
    private addUser = (userId:string,socketId:string)=>{
        console.log(userId,socketId)
        !this.users.some(user=> user.userId === userId) && 
            this.users.push({userId,socketId})
    }
}