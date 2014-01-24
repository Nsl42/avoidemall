function Player ()
{
   this.x = Math.random() * (CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (CAN_HEIGHT - 200) + 100;
   this.width = 20;
   this.height = 20;
   this.speedX = 0;
   this.speedY = 0;

   this.score = 0;
   this.shield = 0;
   this.nb_death = 0;
   this.dead = false;

   this.init = function (obs)
   {
      this.speedX = 0;
      this.speedY = 0;
      this.shield = 2;
      this.dead = false;
      do
      {
         this.x = Math.random() * (CAN_WIDTH - 200) + 100;
         this.y = Math.random() * (CAN_HEIGHT - 200) + 100;
      } while (obs.collideWithPlayer(this));
   };

   this.paint = function (context)
   {
      if (this.dead)
         context.fillStyle = 'red';
      else
         context.fillStyle = 'black';
      context.fillRect(this.x, this.y, this.width, this.height);
   };

   this.move = function (obs)
   {
      this.x += this.speedX;
      if (this.x <= 0)
         this.x -= this.speedX;
      else if ((this.x + this.width) > CAN_WIDTH)
         this.x -= this.speedX;
      else if (obs.collideWithPlayer(this))
         this.x -= this.speedX;

      this.y += this.speedY;
      if (this.y <= 0)
         this.y -= this.speedY;
      else if ((this.y + this.height) > CAN_HEIGHT)
         this.y -= this.speedY;
      else if (obs.collideWithPlayer(this))
         this.y -= this.speedY;

      return obs.collideWithPlayer(this);
   };

   this.moveTo = function (x, y, obs)
   {
      // turn off
      return ;
      this.x += this.speedX;
      if (this.x <= 0)
         this.speedX = -this.speedX;
      else if ((this.x + this.width) > CAN_WIDTH)
         this.speedX = -this.speedX;

      this.y += this.speedY;
      if (this.y <= 0)
         this.speedY = -this.speedY;
      else if ((this.y + this.height) > CAN_HEIGHT)
         this.speedY = -this.speedY;

      return obs.collideWithPlayer(this);
   };

   this.nearTarget = function (target)
   {
      return circsOverlap(this, {x: target.x, y: target.y, radius: 250});

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
      this.dead = true;
      this.score -= 10;
      this.nb_death++;
   }
}
