// Module dependencies.
require('./game_engine');

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

// Configure express.
app.configure(function ()
      {
         app.use(express.static(__dirname + '/public'));
      }
);

/*************
 * Socket.io *
 *************/
io.sockets.on('connection', function (socket)
      {
         // Called when a client connect to the server.
         socket.on('client_connected', function (p_name)
               {
                  // So the name of the player is unique.
                  while (global.game.players.isNameAlreadyUsed(p_name))
                     p_name += (Math.round(Math.random() * 10)) + '';

                  // If the first player connect : start the game.
                  if (global.game.players.list.length == 0)
                     setTimeout(global.game.init, 1000, 3, io);
                  // Add the new player.
                  global.game.player = new global.game.players.add(p_name);
                  // Update all the clients.
                  socket.broadcast.emit('paint', global.game);
                  setTimeout(function ()
                     {
                        // Tell this player to start his mainLoop (draw objects)
                        socket.emit('start_mainLoop', p_name);
                     }, 1500);

                  // Save name of this player in the socket.
                  // So we can delete it when the player disconnect.
                  socket.name = p_name;
               }
         );

         // Called when the client want to move his player left or right.
         socket.on('move_player_x', function (speed)
               {
                  global.game.players.setSpeedX(socket.name, speed.x);
               }
         );

         // Called when the client want to move his player up or down.
         socket.on('move_player_y', function (speed)
               {
                  global.game.players.setSpeedY(socket.name, speed.y);
               }
         );

         // Pause is off.
         // socket.on('toggle_pause', function ()
         //       {
         //          global.game.pause = (global.game.pause) ? false : true;
         //       }
         // );

         // Called when a client disconnect.
         socket.on('disconnect', function ()
               {
                  global.game.players.remove(socket.name);
                  socket.broadcast.emit('paint', global.game);
               }
         );
      }
);

// Create an initial target. Avoid some bugs.
global.game.target = new global.game.Target(0, 0);

// Start listening to port 8080 of localhost.
server.listen(8080);
console.log("Server working on http://localhost:8080");
