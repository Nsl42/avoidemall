var name = "",
    obs =
{
   list : [],

   paint : function (context)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         this.list[i].paint(context);
   },

   createObstacles : function (obstacles)
   {
      this.list = [];
      for (var i = 0, c = obstacles.list.length; i < c; ++i)
         this.list.push(new Obstacle().createObstacle(obstacles.list[i]));
   },
},
   // List of players
   players =
{
   list : [],

   getPlayer : function (name)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (this.list[i].name == name)
            return this.list[i];
   },

   paint : function (context)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         this.list[i].paint(context);
   },

   createPlayers : function (players)
   {
      this.list = [];
      for (var i = 0, c = players.list.length; i < c; ++i)
         this.list.push(new Player().createPlayer(players.list[i]));
   },
},

   target = new Target(0, 0),
   lvl = 0,
   // Pause is off
   // pause = false,
   msg = '';
