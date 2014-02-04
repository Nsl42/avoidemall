global.game.Obstacle = function (type)
{
      this.type = type;
      this.x = Math.random() * (global.game.CST.CAN_WIDTH - 200) + 100;
      this.y = Math.random() * (global.game.CST.CAN_HEIGHT - 200) + 100;
      this.radius = (type === 'circ') ? Math.random() * 50 + 10 : 0;
      this.width = (type === 'rect') ? Math.random() * 100 + 10 : 0;
      this.height = (type === 'rect') ? Math.random() * 100 + 10 : 0;
      this.speedX = Math.random() * 5;
      this.speedY = Math.random() * 5;

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

      this.collideWithCirc = function (circ)
      {
         switch (this.type)
         {
            case 'rect' :
               return global.game.circRectOverlap(circ, this);
            case 'circ' :
               return global.game.circsOverlap(this, circ);
         }
      };

      this.collideWithRect = function (rect)
      {
         switch (this.type)
         {
            case 'rect' :
               return global.game.rectsOverlap(this, rect);
            case 'circ' :
               return global.game.circRectOverlap(this, rect);
         }
      };
};
