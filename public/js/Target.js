function Target (speed, size)
{
   this.x = Math.random() * (CST.CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (CST.CAN_HEIGHT - 200) + 100;
   this.radius = Math.random() * size + 10;
   this.speedX = Math.random() * speed;
   this.speedY = Math.random() * speed;
   this.reached = false;

   this.paint = function (context)
   {
      var border_size = 3;
      context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.radius - border_size, 0, 2 * Math.PI, false);
      if (this.reached)
         context.fillStyle = CST.COL_TARGET_REACHED;
      else
         context.fillStyle = CST.COL_TARGET;
      context.fill();
      context.lineWidth = border_size;
      context.strokeStyle = CST.COL_TARGET_ST;
      context.stroke();
      context.restore();
   };

   this.createTarget = function (t)
   {
      this.x = t.x;
      this.y = t.y;
      this.radius = t.radius;
      this.speedX = t.speedX;
      this.speedY = t.speedY;
      this.reached = t.reached;
      return this;
   };
}
