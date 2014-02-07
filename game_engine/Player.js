/************************
 * Player - Server-side *
 ************************/

// Construct a Player whose name is name. It has to reached the
// Target without being killed by an Obstacle.
// With a random position setted during the creation of the object.
global.game.Player = function (name)
{
   // Top left edge's position. Integer in pixel.
   this.x = Math.round(Math.random() * (global.game.CST.CAN_WIDTH - 200)) + 100;
   this.y = Math.round(Math.random() * (global.game.CST.CAN_HEIGHT - 200)) + 100;

   // Size of the player. Integer in pixel, 20 by default.
   this.width = 20;
   this.height = 20;

   // Speed of the player. Integer >= 0.
   this.speedX = 0;
   this.speedY = 0;

   // An unique name for this Player. String.
   this.name = name;

   // The score of this Player. Start at 0. +1 for each second spent alive.
   // -10 for each time it got killed.
   // +50 if a player reached a target without being killed.
   this.score = 0;

   // A shield that protect this player.
   // If it's more than 0, a player can't be killed.
   this.shield = 0;

   // The player number of deaths. Integer start at 0 on player's connection.
   this.nb_death = 0;

   // If a player got killed during this level.
   this.dead = false;

   // At the begining of a level, init this player.
   // Resurect him, prevent him from moving, protect him with a small shield.
   // Every players appear alive at a random position not overlapping
   // obstacles in obs or another Player in players.
   this.init = function (players, obs)
   {
      this.speedX = 0;
      this.speedY = 0;
      this.shield = 2;
      this.dead = false;

      do { // While this player overlaps another player or an obstacle.
         this.x = Math.round(Math.random() * (global.game.CST.CAN_WIDTH - 200)) + 100;
         this.y = Math.round(Math.random() * (global.game.CST.CAN_HEIGHT - 200)) + 100;
      } while (obs.collideWithThisPlayer(this) || players.collideWithThisPlayer(this));
   };

   // Move this Player preventing it from leaving the canvas or overlapping
   // with an Obstacle in obs, or another Player in players.
   this.move = function (players, obs)
   {
      this.x += this.speedX;
      if (this.x <= 0)
         this.x -= this.speedX;
      else if ((this.x + this.width) > global.game.CST.CAN_WIDTH)
         this.x -= this.speedX;
      else if (obs.collideWithThisPlayer(this))
         this.x -= this.speedX;
      else if (players.collideWithThisPlayer(this))
         this.x -= this.speedX;

      this.y += this.speedY;
      if (this.y <= 0)
         this.y -= this.speedY;
      else if ((this.y + this.height) > global.game.CST.CAN_HEIGHT)
         this.y -= this.speedY;
      else if (obs.collideWithThisPlayer(this))
         this.y -= this.speedY;
      else if (players.collideWithThisPlayer(this))
         this.y -= this.speedY;
   };

   // To prevent target spawning over this Player.
   this.nearTarget = function (target)
   {
      return global.game.circRectOverlap({x: target.x, y: target.y, radius: 190}, this);
   };

   // Change speed of this player to speed.
   this.setSpeedX = function (speed)
   {
      this.speedX = speed;
   };
   this.setSpeedY = function (speed)
   {
      this.speedY = speed;
   };

   // If this player has a shield decremente it.
   this.decreaseShield = function ()
   {
      if (this.shield > 0) // invulnerability
         this.shield--;
   };

   // Kill this player if he's not protected by a shield.
   this.kill = function ()
   {
      if (this.shield <= 0 && !this.dead) // Not invulnerable && not dead
      {
         this.dead = true;
         this.score -= 10;
         this.nb_death++;
         global.game.displayMsg(this.name + ' has been killed.', true);
      }
   };
};
