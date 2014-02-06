/************************
 * To set animation up. *
 ************************/

window.requestAnimFrame = (function (callback)
{
   return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) // If requestAnimationFrame is not supported.
      {
         window.setTimeout(callback, 1000 / 60);
      };
}
)();


/**********
 * onLoad *
 **********/
window.onload = function ()
{
   // Manages the music played during the game via the audio tag 'audioPlayer'.
   var music =
   {
      audioPlayer : document.getElementById('audioPlayer'),
      play : function ()
      {
         this.audioPlayer.play();
         this.audioPlayer.loop = true;
      },
      pause : function ()
      {
         this.audioPlayer.pause();
      },
      getStatus : function ()
      {
         return this.audioPlayer.paused;
      },
      toggle : function ()
      {
         if (this.getStatus())
            this.play();
         else
            this.pause();
      },
   };

   /***********************
    * Keyboard Controls   *
    ***********************/

   document.onkeypress = function (e)
   {
      var arrs = [],
          key = window.event ? event.keyCode : e.keyCode;
      arrs[80] = 'p';
      arrs[77] = 'm';

      // Mute sound.
      if (arrs[key] == 'm')
         music.toggle();
      // Pause game. Pause is off.
      // else if (arrs[key] == 'p')
      //    socket.emit('toggle_pause');
   }

   /**
    * Move the player in the direction requested by the player.
    * To do so send a message to the server with the name of the player,
    * the direction and the speed.
    */
   document.onkeydown = function (e)
   {
      var arrs = [],
          key = window.event ? event.keyCode : e.keyCode;
      arrs[38] = 'up';
      arrs[37] = 'left';
      arrs[40] = 'down';
      arrs[39] = 'right';
      arrs[90] = 'z';
      arrs[81] = 'q';
      arrs[83] = 's';
      arrs[68] = 'd';
      // debug:
      //if(arrs[key]) console.log(arrs[key]);

      // Move player to the up.
      if((arrs[key] == 'up') || (arrs[key] == 'z'))
         socket.emit('move_player_y', { y: -4 });
      // Move player to the left.
      else if((arrs[key] == 'left') || (arrs[key] == 'q'))
         socket.emit('move_player_x', { x: -4 });
      // Move player to the down.
      else if((arrs[key] == 'down') || (arrs[key] == 's'))
         socket.emit('move_player_y', { y: 4 });
      // Move player to the right.
      else if((arrs[key] == 'right') || (arrs[key] == 'd'))
         socket.emit('move_player_x', { x: 4 });
   };

   // Stop moving the player when the user stop pressing the arrow key.
   document.onkeyup = function (e)
   {
      var arrs = [],
          key = window.event ? event.keyCode : e.keyCode;
      arrs[38] = 'up';
      arrs[37] = 'left';
      arrs[40] = 'down';
      arrs[39] = 'right';
      arrs[90] = 'z';
      arrs[81] = 'q';
      arrs[83] = 's';
      arrs[68] = 'd';

      if ((arrs[key] == 'up') || (arrs[key] == 'z'))
         socket.emit('move_player_y', { y: 0 });
      else if ((arrs[key] == 'left') || (arrs[key] == 'q'))
         socket.emit('move_player_x', { x: 0 });
      else if ((arrs[key] == 'down') || (arrs[key] == 's'))
         socket.emit('move_player_y', { y: 0 });
      else if ((arrs[key] == 'right') || (arrs[key] == 'd'))
         socket.emit('move_player_x', { x: 0 });
   };


   /************
    * mainLoop *
    ************/
   // Draws all the objects in the canvas.
   function mainLoop ()
   {
      var canvas = document.getElementById('myCanvas'),
          context = canvas.getContext('2d');

      // Clear Canvas before drawing on it.
      clearCanvas(context);

      // Pause is off.
      // if (pause)
      //    writeMessage(context, 'Pause ...');
      writeMessage(context, msg);

      // Display obstacles, players and target.
      obs.paint(context);
      target.paint(context);
      players.paint(context);

      // Display HUD (with time, lvl, score and number of deaths).
      show_hud(context, time, lvl, players.getPlayer(name));

      // Execute the mainLoop every 60ms.
      requestAnimFrame(function () { mainLoop(); });
   }


   /*************
    * Socket.io *
    *************/

   // Connect to the server.
   var socket = io.connect('http://localhost');

   // Ask user its name and send it to the server when the connection is established.
   socket.on('connect', function ()
         {
            name = prompt('What\'s your name?', '');
            socket.emit('client_connected', name);
         }
   );

   // Start the mainLoop that will draw all objects on the canvas.
   // Set up Canvas. Call when the server has accepted the player's name.
   socket.on('start_mainLoop', function (player_names)
         {
            name = player_names;
            canvas = document.getElementById('myCanvas');
            canvas.width = CST.CAN_WIDTH;
            canvas.height = CST.CAN_HEIGHT;
            mainLoop();
         }
   );

   // Call when the server has modified the properties of an object.
   // So that clients draw them with the modifications.
   socket.on('paint', function (game_data)
         {
            update_objects(game_data);
         }
   );
};

/*****************
 * update_object *
 *****************/

// Update objects of the client with game_data send by the server.
function update_objects (game_data)
{
   CST = game_data.CST;
   obs.createObstacles(game_data.obs);
   players.createPlayers(game_data.players);
   target = target.createTarget(game_data.target);
   time.setStartTo(game_data.time.start);
   lvl = game_data.lvl;
   pause = game_data.pause;
   msg = game_data.msg;
}
