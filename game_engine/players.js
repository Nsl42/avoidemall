/*******************
 * List of players *
 *******************/
global.game.players =
{
   list : [],

   // Add a new player to this list.
   add : function (name)
   {
      global.game.players.list.push(new global.game.Player(name));
   },

   // Check the existence of a player named name in this list.
   isNameAlreadyUsed : function (name)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (global.game.players.list[i].name == name)
            return true;
      return false;
   },

   // Init every players in this list at the begining of a level.
   // Every players appear alive at a random position not overlapping
   // obstacles in obs.
   init : function (obs)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         global.game.players.list[i].init(global.game.players, obs);
   },

   // Move every players in this list depending on their speed and
   // if they collide with other players or obstacles in obs.
   move : function (obs)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         global.game.players.list[i].move(global.game.players, obs);
   },

   // To prevent target spawning over a player.
   near_target : function (target)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (global.game.players.list[i].nearTarget(target))
            return true;

      return false;
   },

   // Decrement the shield of every players if it's more than 0.
   // The shield makes a player invunerable. (if > 0)
   decreaseShield : function ()
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         global.game.players.list[i].decreaseShield();
   },

   // Increment the score of every players alive.
   // Also call decreaseShield. This function is call every second (more or less).
   increaseScoreIfAlive : function ()
   {
      global.game.players.decreaseShield();
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (!global.game.players.list[i].dead)
            global.game.players.list[i].score += 1;
   },

   // Change speed of a player.
   setSpeedX : function (name, speed)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (global.game.players.list[i].name == name)
            global.game.players.list[i].setSpeedX(speed);
   },
   setSpeedY : function (name, speed)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (global.game.players.list[i].name == name)
            global.game.players.list[i].setSpeedY(speed);
   },

   // Remove the player named name from this list.
   remove : function (name)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (global.game.players.list[i].name == name)
         {
            this.list.splice(1, i);
            return;
         }
   },

   // true if player has reached target without being killed by an obstacles.
   // If so : victory and next level.
   collideWithTarget : function (target)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (!global.game.players.list[i].dead &&
               global.game.circRectOverlap(target, global.game.players.list[i]))
         {
            // Victory
            global.game.players.list[i].score += 50;
            target.reached = true;
            global.game.displayMsg(global.game.players.list[i].name + " has reached"
                  + " the target.", false);
            return true;
         }

      return false;
   },

   // return true if player collide with another player in the list.
   collideWithThisPlayer : function (player)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (player.name !== this.list[i].name) // Do not check if collide with itself.
            if (global.game.rectsOverlap(this.list[i], player))
               return true;
      return false;
   },

   // return true if a player in this list collide with obstacle.
   collideWithThisObs : function (obstacle)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (obstacle.collideWithRect(this.list[i]))
         {
            this.list[i].kill();
            return true;
         }
      return false;
   },

   // Kill every player in this list that collide with an Obstacle in obs.
   // Return false if at least a player is alive.
   collideWithObs : function (obs)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         for (var j = 0, l = obs.list.length; j < l; ++j)
            if (obs.list[j].collideWithRect(this.list[i]))
               this.list[i].kill();

      for (var i = 0, c = this.list.length; i < c; ++i)
         if (!this.list[i].dead)
            return false;
      return true; // if all players are dead : reboot the level.
   },
};
