/*******************
 * Target - Server *
 *******************/

// Construct a Target that the players have to reached without being
// killed by an obstacle. Position is random like the Speed and Size.
// But speed and size are the maximum speed and size of this target.
global.game.Target = function (speed, size)
{
   // It's the center's position. Integer in pixel.
   this.x = Math.round(Math.random() * (global.game.CST.CAN_WIDTH - 200)) + 100;
   this.y = Math.round(Math.random() * (global.game.CST.CAN_HEIGHT - 200)) + 100;

   // Radius of the target. 10 pixel is the minimal.
   this.radius = Math.round(Math.random() * size) + 10;

   // Speed of the Target : this target will move this number of pixel
   // each time it moves. Integer.
   this.speedX = Math.round(Math.random() * speed);
   this.speedY = Math.round(Math.random() * speed);

   // true if the target has been reached by a player.
   // Change the color of the Target.
   this.reached = false;

   // Move this Target preventing it from leaving the canvas or overlapping
   // with an Obstacle in obs.
   this.move = function (obs)
   {
      this.x += this.speedX;
      if ((this.x - this.radius) <= 0)
         this.speedX = -this.speedX;
      else if ((this.x + this.radius) > global.game.CST.CAN_WIDTH)
         this.speedX = -this.speedX;
      else if (obs.collideWithTarget(this))
         this.speedX = -this.speedX;

      this.y += this.speedY;
      if ((this.y - this.radius) <= 0)
         this.speedY = -this.speedY;
      else if ((this.y + this.radius) > global.game.CST.CAN_HEIGHT)
         this.speedY = -this.speedY;
      else if (obs.collideWithTarget(this))
         this.speedY = -this.speedY;
   };
};
