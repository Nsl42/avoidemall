function Obstacle (type)
{
   this.type = type;
   this.x = Math.random() * (CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (CAN_HEIGHT - 200) + 100;
   this.radius = (type === 'circ') ? Math.random() * 50 + 10 : 0;
   this.width = (type === 'rect') ? Math.random() * 100 + 10 : 0;
   this.height = (type === 'rect') ? Math.random() * 100 + 10 : 0;
   this.speedX = Math.random() * 5;
   this.speedY = Math.random() * 5;

   this.move = function (player, obs, target)
   {
      switch (this.type)
      {
         case 'rect' :
            this.x += this.speedX;
            if (this.x <= 0)
               this.speedX = -this.speedX;
            else if ((this.x + this.width) > CAN_WIDTH)
               this.speedX = -this.speedX;
            else if (this.collideWithRect(player))
               this.speedX = -this.speedX;
            else if (this.collideWithCirc(target))
               this.speedX = -this.speedX;
            else if (obs.collideWithThisObs(this))
               this.speedX = -this.speedX;

            this.y += this.speedY;
            if (this.y <= 0)
               this.speedY = -this.speedY;
            else if ((this.y + this.height) > CAN_HEIGHT)
               this.speedY = -this.speedY;
            else if (this.collideWithRect(player))
               this.speedY = -this.speedY;
            else if (this.collideWithCirc(target))
               this.speedY = -this.speedY;
            else if (obs.collideWithThisObs(this))
               this.speedY = -this.speedY;
            break;
         case 'circ' :
            this.x += this.speedX;
            if ((this.x - this.radius) <= 0)
               this.speedX = -this.speedX;
            else if ((this.x + this.radius) > CAN_WIDTH)
               this.speedX = -this.speedX;
            else if (this.collideWithRect(player))
               this.speedX = -this.speedX;
            else if (this.collideWithCirc(target))
               this.speedX = -this.speedX;
            else if (obs.collideWithThisObs(this))
               this.speedX = -this.speedX;

            this.y += this.speedY;
            if ((this.y - this.radius) <= 0)
               this.speedY = -this.speedY;
            else if ((this.y + this.radius) > CAN_HEIGHT)
               this.speedY = -this.speedY;
            else if (this.collideWithRect(player))
               this.speedY = -this.speedY;
            else if (this.collideWithCirc(target))
               this.speedY = -this.speedY;
            else if (obs.collideWithThisObs(this))
               this.speedY = -this.speedY;
            break;
      }
   };

   this.paint = function (context)
   {
      switch (this.type)
      {
         case 'rect' :
            context.fillStyle = COL_OBS_RECT;
            context.fillRect(this.x, this.y, this.width, this.height);
            break;
         case 'circ' :
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            context.closePath();
            // sauver contexte courant
            context.save();
            context.fillStyle = COL_OBS_CIRC;
            context.fill();
            context.lineWidth = 10;
            context.strokeStyle = COL_OBS_CIRC_ST;
            context.stroke();
            context.restore();
            break;
      }
   };

   this.collideWithCirc = function (circ)
   {
      switch (this.type)
      {
         case 'rect' :
            return circRectOverlap(circ, this);
         case 'circ' :
            return circsOverlap(this, circ);
      }
   };

   this.collideWithRect = function (rect)
   {
      switch (this.type)
      {
         case 'rect' :
            return rectsOverlap(this, rect);
         case 'circ' :
            return circRectOverlap(this, rect);
      }
   };
}
