const Message = require('./models/message.model');

module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id,);

        socket.on('joinRoom', ({ user1,user2 }) => {
            const roomId = [user1, user2].sort().join('-');
            socket.join(roomId);
            console.log(`${socket.id} joined room ${roomId}`);
        });

        socket.on('sendmessage', async ({ roomId, message, senderId,receiverId }) => {

          socket.to(roomId).emit('message', message, senderId);

            try {
                await Message.create({ senderId, receiverId, message, roomId,});
                console.log('Message saved to DB');
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });
    });
};
