function Obstacle (type)
{
   this.type = type;
   this.x = Math.random() * (CST.CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (CST.CAN_HEIGHT - 200) + 100;
   this.radius = (type === 'circ') ? Math.random() * 50 + 10 : 0;
   this.width = (type === 'rect') ? Math.random() * 100 + 10 : 0;
   this.height = (type === 'rect') ? Math.random() * 100 + 10 : 0;
   this.speedX = Math.random() * 5;
   this.speedY = Math.random() * 5;

   this.paint = function (context)
   {
      switch (this.type)
      {
         case 'rect' :
            context.fillStyle = CST.COL_OBS_RECT;
            context.fillRect(this.x, this.y, this.width, this.height);
            break;
         case 'circ' :
            var border_size = 3;
            context.beginPath();
            context.arc(this.x, this.y, this.radius - border_size, 0, 2 * Math.PI, false);
            context.closePath();
            // sauver contexte courant
            context.save();
            context.fillStyle = CST.COL_OBS_CIRC;
            context.fill();
            context.lineWidth = border_size;
            context.strokeStyle = CST.COL_OBS_CIRC_ST;
            context.stroke();
            context.restore();
            break;
      }
   };

   this.createObstacle = function (obs)
   {
      this.type = obs.type;
      this.x = obs.x;
      this.y = obs.y;
      this.radius = obs.radius;
      this.width = obs.width;
      this.height = obs.height;
      this.speedX = obs.speedX;
      this.speedY = obs.speedY;
      return this;
   };
}
