/************************
 * Player - Client-side *
 ************************/

// Construct a Player whose name is name. It has to reached the
// Target without being killed by an Obstacle.
function Player (name)
{
   // Top left edge's position.
   this.x = 0;
   this.y = 0;

   // Size of the player.
   this.width = 20;
   this.height = 20;

   // An unique name for this Player.
   this.name = name;

   // The score of this Player. Start at 0. +1 for each second spent alive.
   // -10 for each time it got killed.
   // +50 if a player reached a target without being killed.
   this.score = 0;

   // The player number of deaths.
   this.nb_death = 0;

   // If a player got killed during this level.
   // Change color of this Player.
   this.dead = false;

   // Display this Player on the canvas with context.
   // The Player's color depends on wether it has been killed.
   this.paint = function (context)
   {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      if (this.dead)
         context.fillStyle = CST.COL_PLAYER_DEAD;
      else
         context.fillStyle = CST.COL_PLAYER;
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
   };

   // Copy every fields of p into this Player.
   // It's used to update this Player using the player send by the server.
   this.createPlayer = function (p)
   {
      this.name = p.name;
      this.x = p.x;
      this.y = p.y;
      this.width = p.width;
      this.height = p.height;
      this.speedX = p.speedX;
      this.speedY = p.speedY;

      this.score = p.score;
      this.shield = p.shield;
      this.nb_death = p.nb_death;
      this.dead = p.dead;
      return this;
   };
}
