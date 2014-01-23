var CAN_WIDTH = 800,
    CAN_HEIGHT = 600;

function Target (speed)
{
   this.x = Math.random() * (CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (CAN_HEIGHT - 200) + 100;
   this.radius = Math.random() * 40 + 10;
   this.speedX = Math.random() * speed;
   this.speedY = Math.random() * speed;

   this.paint = function (context, fillColor)
   {
      context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      context.fillStyle = fillColor;
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = 'black';
      context.stroke();
      context.restore();
   };

   this.move = function ()
   {
      this.x += this.speedX;
      if ((this.x - this.radius) <= 0)
         this.speedX = -this.speedX;
      if ((this.x + this.radius) > CAN_WIDTH)
         this.speedX = -this.speedX;

      this.y += this.speedY;
      if ((this.y - this.radius) <= 0)
         this.speedY = -this.speedY;
      if ((this.y + this.radius) > CAN_HEIGHT)
         this.speedY = -this.speedY;
   }

   this.collideWithPlayer = function (player)
   {
      return circRectOverlap(this, player);
   };
}

function Player ()
{
   this.x = Math.random() * (CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (CAN_HEIGHT - 200) + 100;
   this.width = 20;
   this.height = 20;
   this.speedX = 0;
   this.speedY = 0;

   this.score = 0;
   this.dead = false;

   this.init = function (obs)
   {
      do
      {
         this.x = Math.random() * (CAN_WIDTH - 200) + 100;
         this.y = Math.random() * (CAN_HEIGHT - 200) + 100;
         this.speedX = 0;
         this.speedY = 0;
         this.dead = false;
      } while (obs.collideWithPlayer(this));
   };

   this.paint = function (context)
   {
      if (this.dead)
         context.fillStyle = 'red';
      else
         context.fillStyle = 'black';
      context.fillRect(this.x, this.y, this.width, this.height);
   };

   this.move = function (obs)
   {
      this.x += this.speedX;
      if (this.x <= 0)
         this.x -= this.speedX;
      else if ((this.x + this.width) > CAN_WIDTH)
         this.x -= this.speedX;
      else if (obs.collideWithPlayer(this))
         this.x -= this.speedX;

      this.y += this.speedY;
      if (this.y <= 0)
         this.y -= this.speedY;
      else if ((this.y + this.height) > CAN_HEIGHT)
         this.y -= this.speedY;
      else if (obs.collideWithPlayer(this))
         this.y -= this.speedY;

      return obs.collideWithPlayer(this);
   };

   this.moveTo = function (x, y, obs)
   {
      // turn off
      return ;
      this.x += this.speedX;
      if (this.x <= 0)
         this.speedX = -this.speedX;
      else if ((this.x + this.width) > CAN_WIDTH)
         this.speedX = -this.speedX;

      this.y += this.speedY;
      if (this.y <= 0)
         this.speedY = -this.speedY;
      else if ((this.y + this.height) > CAN_HEIGHT)
         this.speedY = -this.speedY;

      return obs.collideWithPlayer(this);
   };

   this.setSpeedX = function (speed)
   {
      this.speedX = speed;
   }
   this.setSpeedY = function (speed)
   {
      this.speedY = speed;
   }
}

function Obstacle (type)
{
   this.type = type;
   this.x = Math.random() * (CAN_WIDTH - 200) + 100;
   this.y = Math.random() * (CAN_HEIGHT - 200) + 100;
   this.radius = (type === 'circ') ? Math.random() * 50 + 10 : 0;
   this.width = (type === 'rect') ? Math.random() * 100 + 10 : 0;
   this.height = (type === 'rect') ? Math.random() * 100 + 10 : 0;
   this.speedX = Math.random() * 5;
   this.speedY = Math.random() * 5;

   this.move = function (player, obs, target)
   {
      switch (this.type)
      {
         case 'rect' :
            this.x += this.speedX;
            if (this.x <= 0)
               this.speedX = -this.speedX;
            else if ((this.x + this.width) > CAN_WIDTH)
               this.speedX = -this.speedX;
            else if (this.collideWithRect(player))
               this.speedX = -this.speedX;
            else if (this.collideWithCirc(target))
               this.speedX = -this.speedX;
            else if (obs.collideWithThisObs(this))
               this.speedX = -this.speedX;

            this.y += this.speedY;
            if (this.y <= 0)
               this.speedY = -this.speedY;
            else if ((this.y + this.height) > CAN_HEIGHT)
               this.speedY = -this.speedY;
            else if (this.collideWithRect(player))
               this.speedY = -this.speedY;
            else if (this.collideWithCirc(target))
               this.speedY = -this.speedY;
            else if (obs.collideWithThisObs(this))
               this.speedY = -this.speedY;
            break;
         case 'circ' :
            this.x += this.speedX;
            if ((this.x - this.radius) <= 0)
               this.speedX = -this.speedX;
            else if ((this.x + this.radius) > CAN_WIDTH)
               this.speedX = -this.speedX;
            else if (this.collideWithRect(player))
               this.speedX = -this.speedX;
            else if (this.collideWithCirc(target))
               this.speedX = -this.speedX;
            else if (obs.collideWithThisObs(this))
               this.speedX = -this.speedX;

            this.y += this.speedY;
            if ((this.y - this.radius) <= 0)
               this.speedY = -this.speedY;
            else if ((this.y + this.radius) > CAN_HEIGHT)
               this.speedY = -this.speedY;
            else if (this.collideWithRect(player))
               this.speedY = -this.speedY;
            else if (this.collideWithCirc(target))
               this.speedY = -this.speedY;
            else if (obs.collideWithThisObs(this))
               this.speedY = -this.speedY;
            break;
      }
   };

   this.paint = function (context)
   {
      switch (this.type)
      {
         case 'rect' :
            context.fillRect(this.x, this.y, this.width, this.height);
            break;
         case 'circ' :
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            context.closePath();
            // sauver contexte courant
            context.save();
            context.fillStyle = 'red';
            context.fill();
            context.lineWidth = 10;
            context.strokeStyle = 'blue';
            context.stroke();
            context.restore();
            break;
      }
   };

   this.collideWithCirc = function (circ)
   {
      switch (this.type)
      {
         case 'rect' :
            return circRectOverlap(circ, this);
            break;
         case 'circ' :
            return circsOverlap(this, circ);
            break;
      }
   };

   this.collideWithRect = function (rect)
   {
      switch (this.type)
      {
         case 'rect' :
            return rectsOverlap(this, rect);
            break;
         case 'circ' :
            return circRectOverlap(this, rect);
            break;
      }
   };
}

var obs =
{
   list : [],
   add : function ()
   {
      var type = (Math.random() > 0.5) ? "rect" : "circ";
      do
      {
         var o = new Obstacle(type);
      } while (this.collideWithThisObs(o))
      this.list.push(o);
   },

   move : function (player, target)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         this.list[i].move(player, this, target);
   },

   paint : function (context)
   {
      for (var i = 0, c = this.list.length; i < c; ++i)
         this.list[i].paint(context);
   },

   collideWithPlayer : function (player)
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
}

// generic way to set animation up
window.requestAnimFrame = (function (callback)
{
   return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback)
      {
         window.setTimeout(callback, 1000 / 60);
      };
})();

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
   context.fillText('lvl : ' + lvl, CAN_WIDTH - 80, 25);
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
      return Math.max(min, Math.min(max, val))
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

window.onload = function ()
{
   var canvas = document.getElementById('myCanvas'),
       context = canvas.getContext('2d'),
       lvl = 0,
       target,
       player = new Player(),
       time =
       {
          start : 0,

          get : function ()
          {
             return (this.now() - this.start) / 1000;
          },

          setStart : function ()
          {
             this.start = this.now();
          },

          now : function ()
          {
             return (new Date().getTime());
          },

          toString : function ()
          {
             return 'Time : ' + this.get();
          }
       },
       music =
       {
          audioPlayer : document.getElementById('audioPlayer'),
          play : function ()
          {
             audioPlayer.play();
          }
       };

   // Play music
   music.play();

   function checkArrowKeysUp (e)
   {
      var arrs = [], key = window.event ? event.keyCode : e.keyCode;
      arrs[37] = 'left';
      arrs[38] = 'up';
      arrs[39] = 'right';
      arrs[40] = 'down';
      //if(arrs[key]) console.log(arrs[key]);

      if(arrs[key] == 'left')
         player.setSpeedX(0);
      if(arrs[key] == 'right')
         player.setSpeedX(0);
      if(arrs[key] == 'up')
         player.setSpeedY(0);
      if(arrs[key] == 'down')
         player.setSpeedY(0);
   }

   function checkArrowKeysDown (e)
   {
      var arrs = [], key = window.event ? event.keyCode : e.keyCode;
      arrs[37] = 'left';
      arrs[38] = 'up';
      arrs[39] = 'right';
      arrs[40] = 'down';
      //if(arrs[key]) console.log(arrs[key]);

      if(arrs[key] == 'left')
         player.setSpeedX(-4);
      if(arrs[key] == 'right')
         player.setSpeedX(4);
      if(arrs[key] == 'up')
         player.setSpeedY(-4);
      if(arrs[key] == 'down')
         player.setSpeedY(4);
   }

   document.onkeydown = checkArrowKeysDown;
   document.onkeyup = checkArrowKeysUp;

   function mainLoop ()
   {
      // Effacement, dessin, collisions, etc.
      clearCanvas(canvas, context);
      writeTime(context, time);
      writeLvl(context, lvl);
      obs.move(player, target);
      obs.paint(context);

      // Collision test avec l'obstacle rectangulaire
      player.move(obs);
      player.paint(context);

      // Collision test avec l'obstacle rectangulaire
      if (obs.collideWithPlayer(player))
      {
         context.fillStyle = 'red';
         player.dead = true;
      }
      else
      {
         context.fillStyle = 'black';
      }

      // Test pour voir si on a atteint la cible
      target.move();
      if (target.collideWithPlayer(player))
      {
         target.paint(context, 'yellow');
         setTimeout(init, 1000, 3);
         return;
      } else
      {
         target.paint(context, '#8ED6FF');
      }

      // On reexecute la fonction mainloop après 60ms
      requestAnimFrame(function () { mainLoop(); });
   }


   canvas.addEventListener('mousemove', function (evt)
   {
         var mousePos = getMousePos(canvas, evt);
         player.moveTo(mousePos.x, mousePos.y, obs);
   }, false);

   function init (timeBeforeStart)
   {
      if (timeBeforeStart == 3)
      {
         lvl++;
         obs.add();
         player.init(obs);
         do
         {
            target = new Target(0);
         } while (obs.collideWithTarget(target));
      }
      if (timeBeforeStart >= 0)
      {
         setTimeout(init, 1000, timeBeforeStart - 1);
         clearCanvas(canvas, context);
         var msg = timeBeforeStart;
         if (timeBeforeStart == 0)
            msg = 'Partez...';
         writeMessage(context, msg);
         obs.paint(context);
         player.paint(context);
      }
      else
      {
         setTimeout(mainLoop, 1000, true);
         time.setStart();
      }
   }
   init(3);
};
