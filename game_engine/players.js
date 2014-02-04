// List of players
global.game.players =
{
   list : [],

   add : function (name)
   {
      global.game.players.list.push(new global.game.Player(name));
   },

   isNameAlreadyUsed : function (name)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (global.game.players.list[i].name == name)
            return true;
      return false;
   },

   init : function (obs)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         global.game.players.list[i].init(global.game.players, obs);
   },

   move : function (obs)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         global.game.players.list[i].move(global.game.players, obs);
   },

   near_target : function (target)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         global.game.players.list[i].nearTarget(target);
   },

   decreaseShield : function ()
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         global.game.players.list[i].decreaseShield();
   },

   increaseScoreIfAlive : function ()
   {
      global.game.players.decreaseShield();
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (!global.game.players.list[i].dead)
            global.game.players.list[i].score += 1;
   },

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

   collideWithTarget : function (target)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (!global.game.players.list[i].dead &&
               global.game.circRectOverlap(target, global.game.players.list[i]))
         {
            // Victory
            // If a player has reached the target without being killed.
            global.game.players.list[i].score += 50;
            target.reached = true;
            return true;
         }

      return false;
   },

   collideWithThisPlayer : function (player)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (player.x !== this.list[i].x)
            if (global.game.rectsOverlap(this.list[i], player))
               return true;
      return false;
   },

   collideWithThisObs : function (obstacle)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (obstacle.collideWithRect(this.list[i]))
            return true;
      return false;
   },

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

   remove : function (name)
   {
      for (var i = 0, c = global.game.players.list.length; i < c; ++i)
         if (global.game.players.list[i].name == name)
         {
            this.list.splice(1, i);
            return;
         }
   },
};
