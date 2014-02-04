global.game.Player = function (name)
{
   this.x = Math.random() * (global.game.CST.CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (global.game.CST.CAN_HEIGHT - 200) + 100;
   this.width = 20;
   this.height = 20;
   this.speedX = 0;
   this.speedY = 0;

   this.name = name;
   this.score = 0;
   this.shield = 0;
   this.nb_death = 0;
   this.dead = false;

   this.init = function (players, obs)
   {
      this.speedX = 0;
      this.speedY = 0;
      this.shield = 2;
      this.dead = false;
      do
      {
         this.x = Math.random() * (global.game.CST.CAN_WIDTH - 200) + 100;
         this.y = Math.random() * (global.game.CST.CAN_HEIGHT - 200) + 100;
      } while (obs.collideWithThisPlayer(this) || players.collideWithThisPlayer(this));
   };

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

   this.nearTarget = function (target)
   {
      return global.game.circsOverlap(this, {x: target.x, y: target.y, radius: 250});
   };

   this.setSpeedX = function (speed)
   {
      this.speedX = speed;
   };

   this.setSpeedY = function (speed)
   {
      this.speedY = speed;
   };

   this.decreaseShield = function ()
   {
      if (this.shield > 0) // invincibility
         this.shield--;
   };

   this.kill = function ()
   {
      if (this.shield <= 0)
      {
         this.dead = true;
         this.score -= 10;
         this.nb_death++;
      }
   };
};
