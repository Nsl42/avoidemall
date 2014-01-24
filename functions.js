function writeMessage (context,  message)
{
   context.font = '18pt Calibri';
   context.fillStyle = 'black';
   context.fillText(message, 10, 25);
}
function writeTime (context, time)
{
   context.font = '18pt Calibri';
   context.fillStyle = 'black';
   context.fillText(time.toString(), 10, 25);
}
function writeLvl (context, lvl)
{
   context.font = '18pt Calibri';
   context.fillStyle = 'black';
   context.fillText('lvl : ' + lvl, CAN_WIDTH - 100, 25);
}
function writeScore (context, player)
{
   context.font = '18pt Calibri';
   context.fillStyle = 'black';
   context.fillText('Score : ' + player.score, 10, CAN_HEIGHT - 25);
}

function getMousePos (canvas, evt)
{
   // get canvas position
   var obj = canvas, top = 0, left = 0, pos = {};
   while (obj && obj.tagName !== 'BODY')
   {
      top += obj.offsetTop;
      left += obj.offsetLeft;
      obj = obj.offsetParent;
   }

   // return relative mouse position
   pos.x = evt.clientX - left + window.pageXOffset;
   pos.y = evt.clientY - top + window.pageYOffset;
   return pos;
}

// function drawObstacles (canvas, context)
// {
//    /*context.beginPath();
//      context.moveTo(canvas.width/2.0, 0);
//      context.lineTo(canvas.width/2.0, (canvas.height/2.0)-50);
//      context.moveTo(canvas.width/2.0, (canvas.height/2.0)+50);
//      context.lineTo(canvas.width/2.0, canvas.height);
//      context.stroke();*/
// }

function clearCanvas (canvas, context)
{
   context.clearRect(0, 0, canvas.width, canvas.height);
}

function rectsOverlap (rectA, rectB)
{
   if ((rectA.x > (rectB.x + rectB.width)) ||
         ((rectA.x + rectA.width) < rectB.x))
      return false;

   if ((rectA.y > (rectB.y + rectB.height)) ||
         ((rectA.y + rectA.height) < rectB.y))
      return false;
   return true;
}

function circsOverlap (circA, circB)
{
   // If the distance between the centers is less than the sum of their radius
   // then the two circles overlap.
   var dx = circB.x - circA.x;
   var dy = circB.y - circA.y;
   // Calc square of the distance between the two centers.
   var dist = dx * dx + dy * dy;
   return dist <= (4 * circA.radius * circB.radius);
}

function circRectOverlap (circ, rect)
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
}
