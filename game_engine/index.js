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

/**  **/
global.game.lvl = 0;
global.game.target = null;
global.game.nbLoop = 0;
// Pause is off.
// global.game.pause = false;
global.game.mgs = '';

/**
 * mainLoop move all the objects in the canvas.
 * And check if they collide.
 */
global.game.mainLoop = function (io)
{
   // Do nothing if the game is paused.
   // Pause is off.
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
   {
      setTimeout(global.game.rebootLvl, 1000, io);
   }
   // Check if any player has reached it.
   // Display the target with a different color if it has been reached.
   else if (global.game.players.collideWithTarget(global.game.target))
   {
      setTimeout(global.game.init, 1000, 3, io);
   } else
   {
      // Execute the mainLoop every 60ms
      setTimeout(global.game.mainLoop, 1000 / 60, io);
   }

   // Send game data to all players, so they can display every objects
   // in their canvas.
   io.sockets.emit('paint', global.game);
};

global.game.init = function (timeBeforeStart, io)
{
   if (timeBeforeStart === 3)
   {
      global.game.lvl++;
      global.game.obs.add();
      global.game.players.init(global.game.obs);
      var speed = 0;
      if (global.game.lvl > 21)
         speed = 6;
      else if (global.game.lvl > 14)
         speed = 4;
      else if (global.game.lvl > 7)
         speed = 2;
      do
      {
         var size =  (global.game.lvl < 21) ? (21 - global.game.lvl) * 3: 0;
         global.game.target = new global.game.Target(speed, size);
      } while (global.game.obs.collideWithTarget(global.game.target)
            || global.game.players.near_target(global.game.target));
   }
   if (timeBeforeStart >= 0)
   {
      setTimeout(global.game.init, 1000, timeBeforeStart - 1, io);
      global.game.msg = timeBeforeStart;
      if (timeBeforeStart === 0)
         global.game.msg = 'Go...';
   }
   else
   {
      var speed = 0;
      if (global.game.lvl > 21)
         speed = 6;
      else if (global.game.lvl > 14)
         speed = 4;
      else if (global.game.lvl > 7)
         speed = 2;
      do
      {
         var size =  (global.game.lvl < 21) ? (21 - global.game.lvl) * 3: 0;
         global.game.target = new global.game.Target(speed, size);
      } while (global.game.obs.collideWithTarget(global.game.target)
            || global.game.players.near_target(global.game.target));
      setTimeout(function ()
            {
               global.game.msg = "";
               global.game.mainLoop(io);
            }, 1000, io);
      global.game.time.setStart();
   }
   io.sockets.emit('paint', global.game);
};

global.game.rebootLvl = function (io)
{
   global.game.players.init(global.game.obs);
   global.game.msg = " Try again :/";
   setTimeout(global.game.init, 1000, 2, io);
   io.sockets.emit('paint', global.game);
};
