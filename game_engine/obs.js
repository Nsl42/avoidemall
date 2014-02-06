/*********************
 * List of obstacles *
 *********************/
global.game.obs =
{
   list : [],

   // Add a new Obstacle (either rect or circ) to this list.
   add : function ()
   {
      var type = (Math.random() > 0.5) ? "rect" : "circ",
      o;
      do { // While the new obstacle collide with another one.
         o = new global.game.Obstacle(type);
      } while (this.collideWithThisObs(o));
      this.list.push(o);
   },

   // Move every obstacles in this list depending on their speed
   // and if they collide with players or target.
   move : function (players, target)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         this.list[i].move(players, this, target);
   },

   // return true if an Obstacle in this list overlaps player.
   collideWithThisPlayer : function (player)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (this.list[i].collideWithRect(player))
            return true;
      return false;
   },

   // return true if another Obstacle in this list overlaps obstacle.
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

   // return true if target overlaps an Obstacle in this list.
   collideWithTarget : function (target)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (this.list[i].collideWithCirc(target))
            return true;

      return false;
   },

   // return true if an Obstacle in this list overlaps with another one.
   // USED ????
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
