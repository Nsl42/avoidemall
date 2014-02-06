/*****************************
 * Game Object - Client-side *
 *****************************/

// Name of this player.
var name = "",

// List of obstacles.
    obs =
{
   list : [],

   // Display all the obstacles which are in the list on the canvas.
   paint : function (context)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         this.list[i].paint(context);
   },

   // Replace this list by the list inside players.
   // It's used to update this list using players send by the server.
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

   // Return the player named name.
   getPlayer : function (name)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         if (this.list[i].name == name)
            return this.list[i];
   },

   // Display all the players which are in the list on the canvas.
   paint : function (context)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         this.list[i].paint(context);
   },

   // Replace this list by the list inside players.
   // It's used to update this list using players send by the server.
   createPlayers : function (players)
   {
      this.list = [];
      for (var i = 0, c = players.list.length; i < c; ++i)
         this.list.push(new Player().createPlayer(players.list[i]));
   },
},

   // Target that the player has to reached before being killed by an Obstacle.
   target = new Target(0, 0),

   // Current level.
   lvl = 0,

   // Pause is off
   // pause = false,

   // Message that will be print on the top of the canvas.
   msg = '';
