/**************************
 * Obstacle - Client-side *
 **************************/

// Construct an Obstacle whose type is either 'rect' or 'circ', that
// the players have to avoid.
// The size, position and speed are random.
function Obstacle (type)
{
   // Type of obstacle, either 'rect' or 'circ'.
   this.type = type;

   // If this obstacle is a rectangle contains the position of the
   // top left edge else the center's position.
   this.x = 0;
   this.y = 0;

   /*** Size ***/
   // Radius of this Obstacle in px, if it's a circle.
   this.radius = 0;
   // Width of this Obstacle in px, if it's a rectangle.
   this.width = 0;
   // Height of this Obstacle in px, if it's a rectangle.
   this.height = 0;

   // Display this Obstacle on the canvas with context.
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
            context.fillStyle = CST.COL_OBS_CIRC;
            context.fill();
            context.lineWidth = border_size;
            context.strokeStyle = CST.COL_OBS_CIRC_ST;
            context.stroke();
            break;
      }
   };

   // Copy every fields of obs into this Obstacle.
   // It's used to update this Obstacle using the obstacle send by the server.
   this.createObstacle = function (obs)
   {
      this.type = obs.type;
      this.x = obs.x;
      this.y = obs.y;
      this.radius = obs.radius;
      this.width = obs.width;
      this.height = obs.height;
      return this;
   };
}
