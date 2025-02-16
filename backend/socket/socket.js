const setupSocket = (io) => {
      io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
    
        socket.on("send_question", (question) => {
          io.emit("receive_question", question);
        });
    
        socket.on("reveal_option", (option) => {
          io.emit("show_option", option);
        });
    
        socket.on("play_sound", () => {
          io.emit("trigger_sound");
        });
    
        socket.on("disconnect", () => {
          console.log("User disconnected:", socket.id);
        });
      });
    };
    
    module.exports = setupSocket;
    