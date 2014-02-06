/**************************
 * Obstacle - Server-side *
 **************************/

// Construct an Obstacle whose type is either 'rect' or 'circ', that
// the players have to avoid.
// The size, position and speed are random.
global.game.Obstacle = function (type)
{
   // Type of obstacle, either 'rect' or 'circ'.
   this.type = type;

   // If this obstacle is a rectangle contains the position of the
   // top left edge else the center's position.
   this.x = Math.round(Math.random() * (global.game.CST.CAN_WIDTH - 200)) + 100;
   this.y = Math.round(Math.random() * (global.game.CST.CAN_HEIGHT - 200)) + 100;

   /*** Size ***/
   // Radius of this Obstacle in px, if it's a circle. Integer.
   this.radius = (type === 'circ') ? Math.round(Math.random() * 50) + 10 : 0;
   // Width of this Obstacle in px, if it's a rectangle. Integer.
   this.width = (type === 'rect') ? Math.round(Math.random() * 100) + 10 : 0;
   // Height of this Obstacle in px, if it's a rectangle. Integer.
   this.height = (type === 'rect') ? Math.round(Math.random() * 100) + 10 : 0;

   // Speed of this object : this obstacle will move 'speed' pixel
   // each time it moves. Integer.
   this.speedX = Math.round(Math.random() * 5);
   this.speedY = Math.round(Math.random() * 5);

   // Move this Obstacle preventing it from leaving the canvas or overlapping
   // with another Obstacle in obs, a Player in players or target.
   this.move = function (players, obs, target)
   {
      switch (this.type)
      {
         case 'rect' :
            this.x += this.speedX;
            if (this.x <= 0)
               this.speedX = -this.speedX;
            else if ((this.x + this.width) > global.game.CST.CAN_WIDTH)
               this.speedX = -this.speedX;
            else if (this.collideWithCirc(target))
               this.speedX = -this.speedX;
            else if (players.collideWithThisObs(this))
               this.speedX = -this.speedX;
            else if (obs.collideWithThisObs(this))
               this.speedX = -this.speedX;

            this.y += this.speedY;
            if (this.y <= 0)
               this.speedY = -this.speedY;
            else if ((this.y + this.height) > global.game.CST.CAN_HEIGHT)
               this.speedY = -this.speedY;
            else if (this.collideWithCirc(target))
               this.speedY = -this.speedY;
            else if (players.collideWithThisObs(this))
               this.speedY = -this.speedY;
            else if (obs.collideWithThisObs(this))
               this.speedY = -this.speedY;
            break;
         case 'circ' :
            this.x += this.speedX;
            if ((this.x - this.radius) <= 0)
               this.speedX = -this.speedX;
            else if ((this.x + this.radius) > global.game.CST.CAN_WIDTH)
               this.speedX = -this.speedX;
            else if (this.collideWithCirc(target))
               this.speedX = -this.speedX;
            else if (players.collideWithThisObs(this))
               this.speedX = -this.speedX;
            else if (obs.collideWithThisObs(this))
               this.speedX = -this.speedX;

            this.y += this.speedY;
            if ((this.y - this.radius) <= 0)
               this.speedY = -this.speedY;
            else if ((this.y + this.radius) > global.game.CST.CAN_HEIGHT)
               this.speedY = -this.speedY;
            else if (this.collideWithCirc(target))
               this.speedY = -this.speedY;
            else if (players.collideWithThisObs(this))
               this.speedY = -this.speedY;
            else if (obs.collideWithThisObs(this))
               this.speedY = -this.speedY;
            break;
      }
   };

   // true if this Obstacle is overlapping circ.
   // circ is either another Obstacle or the Target.
   this.collideWithCirc = function (circ)
   {
      switch (this.type)
      {
         case 'rect' : return global.game.circRectOverlap(circ, this);
         case 'circ' : return global.game.circsOverlap(this, circ);
      }
   };

   // true if this Obstacle is overlapping rect.
   // rect is either another Obstacle or a Player.
   this.collideWithRect = function (rect)
   {
      switch (this.type)
      {
         case 'rect' : return global.game.rectsOverlap(this, rect);
         case 'circ' : return global.game.circRectOverlap(this, rect);
      }
   };
};
