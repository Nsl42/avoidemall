function Target (speed, size)
{
   this.x = Math.random() * (CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (CAN_HEIGHT - 200) + 100;
   this.radius = Math.random() * size + 10;
   this.speedX = Math.random() * speed;
   this.speedY = Math.random() * speed;

   this.paint = function (context, fillColor)
   {
      context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      context.fillStyle = fillColor;
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = 'black';
      context.stroke();
      context.restore();
   };

   this.move = function (obs)
   {
      this.x += this.speedX;
      if ((this.x - this.radius) <= 0)
         this.speedX = -this.speedX;
      else if ((this.x + this.radius) > CAN_WIDTH)
         this.speedX = -this.speedX;
      else if (obs.collideWithTarget(this))
         this.speedX = -this.speedX;

      this.y += this.speedY;
      if ((this.y - this.radius) <= 0)
         this.speedY = -this.speedY;
      else if ((this.y + this.radius) > CAN_HEIGHT)
         this.speedY = -this.speedY;
      else if (obs.collideWithTarget(this))
         this.speedY = -this.speedY;
   };

   this.collideWithPlayer = function (player)
   {
      return circRectOverlap(this, player);
   };
}
