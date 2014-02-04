// List of obstacles
global.game.obs =
{
   list : [],

   add : function ()
   {
      var type = (Math.random() > 0.5) ? "rect" : "circ",
      o;
      do
      {
         o = new global.game.Obstacle(type);
      } while (this.collideWithThisObs(o));
      this.list.push(o);
   },

   move : function (players, target)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         this.list[i].move(players, this, target);
   },

   collideWithThisPlayer : function (player)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (this.list[i].collideWithRect(player))
            return true;
      return false;
   },

   collideWithThisObs : function (obstacle)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (obstacle.x !== this.list[i].x)
            if (obstacle.type === 'rect')
               if (this.list[i].collideWithRect(obstacle))
                  return true;
               else ;
            else
               if (this.list[i].collideWithCirc(obstacle))
                  return true;

      return false;
   },

   collideWithTarget : function (target)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (this.list[i].collideWithCirc(target))
            return true;

      return false;
   },

   collideWithObs : function ()
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         // TODO: i == j ???
         for (var j = i; j < c; ++j)
            if (this.list[j].type === 'rect')
               if (this.list[i].collideWithRect(this.list[j]))
                  return true;
               else ;
            else
               if (this.list[i].collideWithCirc(this.list[j]))
                  return true;

      return false;
   }
};
