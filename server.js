// Module dependencies.
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

var game_data = require('./tools');

/*************
 * Socket.io *
 *************/
io.sockets.on('connection', function (socket)
      {
         // Called when a client connect to the server.
         socket.on('client_connected', function (p_name)
               {
                  // So the name of the player is unique.
                  while (game_data.players.isNameAlreadyUsed(p_name))
                     p_name += (Math.round(Math.random() * 10)) + '';

                  // If the first player connect : start the game.
                  if (game_data.players.list.length == 0)
                     setTimeout(game_data.init, 1000, 3, io);
                  // Add the new player.
                  game_data.player = new game_data.players.add(p_name);
                  // Update all the clients.
                  socket.broadcast.emit('paint', game_data);
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
         socket.on('move_player_x', function (d)
               {
                  game_data.players.setSpeedX(d.name, d.speed);
               }
         );

         // Called when the client want to move his player up or down.
         socket.on('move_player_y', function (d)
               {
                  game_data.players.setSpeedY(d.name, d.speed);
               }
         );

         // Pause is off.
         // socket.on('toggle_pause', function ()
         //       {
         //          game_data.pause = (game_data.pause) ? false : true;
         //       }
         // );

         // Called when a client disconnect.
         socket.on('disconnect', function ()
               {
                  game_data.players.remove(socket.name);
                  socket.broadcast.emit('paint', game_data);
               }
         );
      }
);

// Create an initial target. Avoid some bugs.
game_data.target = new game_data.Target(0, 0);

// Start listening to port 8080 of localhost.
server.listen(8080);
console.log("Server working on http://localhost:8080");
