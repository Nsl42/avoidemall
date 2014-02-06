/***********************
 * Target - Cient-side *
 ***********************/

// Construct a Target that the players have to reached without being
// killed by an obstacle.
function Target ()
{
   // It's the center's position. Integer in pixel.
   this.x = 0;
   this.y = 0;

   // Radius of the target.
   this.radius = 1;

   // true if the target has been reached by a player.
   // Change the color of the Target.
   this.reached = false;

   // Display this Target on the canvas with context.
   // The Target's color depends on wether it has been reached.
   this.paint = function (context)
   {
      var border_size = 3;
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
   };

   // Copy every fields of t into this Target.
   // It's used to update this Target using the target send by the server.
   this.createTarget = function (t)
   {
      this.x = t.x;
      this.y = t.y;
      this.radius = t.radius;
      this.reached = t.reached;
      return this;
   };
}
