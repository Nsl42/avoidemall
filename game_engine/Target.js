global.game.Target = function (speed, size)
{
   this.x = Math.random() * (global.game.CST.CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (global.game.CST.CAN_HEIGHT - 200) + 100;
   this.radius = Math.random() * size + 10;
   this.speedX = Math.random() * speed;
   this.speedY = Math.random() * speed;
   this.reached = false;

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
