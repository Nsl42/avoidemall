/***********************
 * Collision functions *
 ***********************/

// Checks if rectA overlaps rectB.
global.game.rectsOverlap = function (rectA, rectB)
{
   if ((rectA.x > (rectB.x + rectB.width)) ||
         ((rectA.x + rectA.width) < rectB.x))
      return false;

   if ((rectA.y > (rectB.y + rectB.height)) ||
         ((rectA.y + rectA.height) < rectB.y))
      return false;
   return true;
};

// Checks if circA overlaps circB.
global.game.circsOverlap = function (circA, circB)
{
   // If the distance between the centers is less than the sum of their radius
   // then the two circles overlap.
   var dx = circB.x - circA.x;
   var dy = circB.y - circA.y;
   // Calc square of the distance between the two centers.
   var dist = dx * dx + dy * dy;
   return dist <= (4 * circA.radius * circB.radius);
};

// Checks if circ overlaps rect.
global.game.circRectOverlap = function (circ, rect)
{
   // https://gist.github.com/vonWolfehaus/5023015
   // limits value to the range min..max
   function clamp(val, min, max)
   {
      return Math.max(min, Math.min(max, val));
   }

   // Find the closest point to the circle within the rectangle
   // Assumes axis alignment! ie rect must not be rotated
   var closest =
   {
      x : clamp(circ.x, rect.x, rect.x + rect.width),
      y : clamp(circ.y, rect.y, rect.y + rect.height)
   };

   // Calculate the distance between the circle's center and this closest point
   var dist =
   {
      x : circ.x - closest.x,
      y : circ.y - closest.y
   };

   // If the distance is less than the circle's radius, an intersection occurs
   var dist_squared = (dist.x * dist.x) + (dist.y * dist.y);

   return dist_squared < (circ.radius * circ.radius);
};
