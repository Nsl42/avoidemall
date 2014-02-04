function Player (name)
{
   this.x = Math.random() * (CST.CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (CST.CAN_HEIGHT - 200) + 100;
   this.width = 20;
   this.height = 20;
   this.speedX = 0;
   this.speedY = 0;

   this.name = name;
   this.score = 0;
   this.shield = 0;
   this.nb_death = 0;
   this.dead = false;

   this.paint = function (context)
   {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      if (this.dead)
         context.fillStyle = CST.COL_PLAYER_DEAD;
      else
         context.fillStyle = CST.COL_PLAYER;
      context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
   };

   this.createPlayer = function (p)
   {
      this.name = p.name;
      this.x = p.x;
      this.y = p.y;
      this.width = p.width;
      this.height = p.height;
      this.speedX = p.speedX;
      this.speedY = p.speedY;

      this.score = p.score;
      this.shield = p.shield;
      this.nb_death = p.nb_death;
      this.dead = p.dead;
      return this;
   };
}
