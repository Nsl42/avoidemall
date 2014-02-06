/***************
 * Game Object *
 ***************/
global.game = {};

// Import other js files needed for the game.
require('../public/js/CST');
require('../public/js/time');
require('./collision');
require('./Target');
require('./Obstacle');
require('./Player');
require('./obs');
require('./players');

// Current level of the game.
global.game.lvl = 0;

// Target that the player has to reached before being killed by an Obstacle.
global.game.target = null;

// Number of time the mainLoop has executed.
// It's used to execute a function every second (more or less).
global.game.nbLoop = 0;
// Pause is off.
// global.game.pause = false;

// Message that the client display on their canvas.
global.game.mgs = '';


/************
 * mainLoop *
 ************/

// mainLoop move all the objects in the canvas.
// And check if they collide.
// io is sockect.io and is used to send the updated object to all clients.
global.game.mainLoop = function (io)
{
   // Pause is off.
   // Do nothing if the game is paused.
   // if (global.game.pause)
   // {
   //    setTimeout(global.game.mainLoop(), 1000, io);
   //    return;
   // }

   global.game.nbLoop++;
   if (global.game.nbLoop >= 60) // executed every second (more or less)
   {
      global.game.nbLoop = 0;
      global.game.players.increaseScoreIfAlive();
   }

   // Move obstacles, players and target.
   global.game.obs.move(global.game.players, global.game.target);
   global.game.players.move(global.game.obs);
   global.game.target.move(global.game.obs);

   // Check if any player has been killed by an obstacle.
   // If so and all the players are dead then restart the level.
   if (global.game.players.collideWithObs(global.game.obs))
      setTimeout(global.game.rebootLvl, 1000, io);
   // Check if any player has reached it.
   // Display the target with a different color if it has been reached.
   else if (global.game.players.collideWithTarget(global.game.target))
      setTimeout(global.game.init, 1000, 3, io);
   else
      // Execute the mainLoop every 60ms
      setTimeout(global.game.mainLoop, 1000 / 60, io);

   // Send game data to all players, so they can display every objects
   // in their canvas.
   io.sockets.emit('paint', global.game);
};

// It's used to get all the game's objects ready for the level
// And display countdown (timeBeforeStart).
// Call itself decrementing timeBeforeStart.
// Start mainLoop when timeBeforeStart is less than 0.
global.game.init = function (timeBeforeStart, io)
{
   // If a player has reached the target without being killed.
   if (timeBeforeStart === 3)
   {
      // Next level
      global.game.lvl++;
      global.game.obs.add();
      global.game.players.init(global.game.obs);
   }
   if (timeBeforeStart >= 0)
   {
      setTimeout(global.game.init, 1000, timeBeforeStart - 1, io);
      global.game.msg = timeBeforeStart;
      if (timeBeforeStart === 0)
         global.game.msg = 'Go...';
   }
   else // End of init
   {
      // Init Target.
      var speed = 0;
      if (global.game.lvl > 21)
         speed = 6;
      else if (global.game.lvl > 14)
         speed = 4;
      else if (global.game.lvl > 7)
         speed = 2;
      // Init a new target while it overlap with an obstacle or it is near a player.
      do {
         var size =  (global.game.lvl < 21) ? (21 - global.game.lvl) * 3: 0;
         global.game.target = new global.game.Target(speed, size);
      } while (global.game.obs.collideWithTarget(global.game.target)
            || global.game.players.near_target(global.game.target));
      setTimeout(function ()
            {
               global.game.msg = "";
               global.game.time.setStart();
               global.game.mainLoop(io);
            }, 100, io);
   }

   // Update clients.
   global.game.time.setStartTo(0); // to display N/A as time during init.
   io.sockets.emit('paint', global.game);
};

// Called when all players got killed. Call init to restart this level
// skipping the part which incremente the level (with param 2).
// io is sockect.io and is used to send the updated object to all clients.
global.game.rebootLvl = function (io)
{
   global.game.msg = " Try again :/";
   global.game.players.init(global.game.obs);
   // Update clients.
   io.sockets.emit('paint', global.game);

   setTimeout(global.game.init, 1000, 2, io);
};
