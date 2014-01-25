var CAN_WIDTH = 800,
    CAN_HEIGHT = 600;

var obs =
{
   list : [],
   add : function ()
   {
      var type = (Math.random() > 0.5) ? "rect" : "circ",
          o;
      do
      {
         o = new Obstacle(type);
      } while (this.collideWithThisObs(o));
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
};

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

window.onload = function ()
{
   var canvas = document.getElementById('myCanvas'),
       context = canvas.getContext('2d'),
       lvl = 0,
       target,
       player = new Player(),
       nbLoop = 0,
       pause = false,
       time =
       {
          start : 0,

          toString : function ()
          {
             return Math.round((this.now() - this.start) / 1000);
          },

          setStart : function ()
          {
             this.start = this.now();
          },

          now : function ()
          {
             return (new Date().getTime());
          },
       },
       music =
       {
          audioPlayer : document.getElementById('audioPlayer'),
          play : function ()
          {
             this.audioPlayer.play();
             this.audioPlayer.loop = true;
          },
          pause : function ()
          {
             this.audioPlayer.pause();
          },
          getStatus : function ()
          {
             return this.audioPlayer.paused;
          },
          toggle : function ()
          {
             if (this.getStatus())
                this.play();
             else
                this.pause();
          },
       };

   // Play music
   music.play();

   function checkArrowKeysUp (e)
   {
      var arrs = [],
          key = window.event ? event.keyCode : e.keyCode;
      arrs[37] = 'left';
      arrs[38] = 'up';
      arrs[39] = 'right';
      arrs[40] = 'down';
      arrs[90] = 'z';
      arrs[81] = 'q';
      arrs[83] = 's';
      arrs[68] = 'd';
      //if(arrs[key]) console.log(arrs[key]);

      if ((arrs[key] == 'left') || (arrs[key] == 'q'))
         player.setSpeedX(0);
      else if ((arrs[key] == 'right') || (arrs[key] == 'd'))
         player.setSpeedX(0);
      else if ((arrs[key] == 'up') || (arrs[key] == 'z'))
         player.setSpeedY(0);
      else if ((arrs[key] == 'down') || (arrs[key] == 's'))
         player.setSpeedY(0);
   }

   function checkArrowKeysDown (e)
   {
      var arrs = [],
          key = window.event ? event.keyCode : e.keyCode;
      arrs[37] = 'left';
      arrs[38] = 'up';
      arrs[39] = 'right';
      arrs[40] = 'down';
      arrs[90] = 'z';
      arrs[81] = 'q';
      arrs[83] = 's';
      arrs[68] = 'd';
      arrs[80] = 'p';
      arrs[77] = 'm';
      //if(arrs[key]) console.log(arrs[key]);

      if((arrs[key] == 'left') || (arrs[key] == 'q'))
         player.setSpeedX(-4);
      else if((arrs[key] == 'right') || (arrs[key] == 'd'))
         player.setSpeedX(4);
      else if((arrs[key] == 'up') || (arrs[key] == 'z'))
         player.setSpeedY(-4);
      else if((arrs[key] == 'down') || (arrs[key] == 's'))
         player.setSpeedY(4);
      else if (arrs[key] == 'p')
         pause = (pause) ? false : true;
      else if (arrs[key] == 'm')
         music.toggle();
   }

   document.onkeydown = checkArrowKeysDown;
   document.onkeyup = checkArrowKeysUp;

   function mainLoop ()
   {
      if (pause)
      {
         requestAnimFrame(function () { mainLoop(); });
         writeMessage(context, 'Pause ...');
         return;
      }
      nbLoop++;
      if (nbLoop >= 60) // executed every second more or less
      {
         nbLoop = 0;
         player.score += 1;
         player.decreaseShield(); // invincibility
      }
      // Effacement, dessin, collisions, etc.
      clearCanvas(canvas, context);
      show_hud(context, time, lvl, player);
      obs.move(player, target);
      obs.paint(context);

      // Collision test avec l'obstacle rectangulaire
      player.move(obs);
      player.paint(context);

      // Collision test avec l'obstacle rectangulaire
      if (obs.collideWithPlayer(player) && player.shield <= 0)
      {
         context.fillStyle = 'red';
         player.kill();
         player.paint(context);
         setTimeout(rebootLvl, 1000);
         return;
      }
      else
      {
         context.fillStyle = 'black';
      }

      // Test pour voir si on a atteint la cible
      target.move(obs);
      if (target.collideWithPlayer(player))
      {
         target.paint(context, 'yellow');
         player.score += 50;
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
      if (timeBeforeStart === 3)
      {
         lvl++;
         obs.add();
         player.init(obs);
         var speed = 0;
         if (lvl > 21)
            speed = 6;
         else if (lvl > 14)
            speed = 4;
         else if (lvl > 7)
            speed = 2;
         do
         {
            var size =  (lvl < 21) ? (21 - lvl) * 3: 0;
            target = new Target(speed, size);
         } while (obs.collideWithTarget(target) || player.nearTarget(target));
      }
      if (timeBeforeStart >= 0)
      {
         setTimeout(init, 1000, timeBeforeStart - 1);
         clearCanvas(canvas, context);
         var msg = timeBeforeStart;
         if (timeBeforeStart === 0)
            msg = 'Go...';
         writeMessage(context, msg);
         obs.paint(context);
         player.paint(context);
      }
      else
      {
         setTimeout(mainLoop, 1000);
         time.setStart();
      }
   }

   function rebootLvl ()
   {
      player.init(obs);
      var speed = 0;
      if (lvl > 21)
         speed = 6;
      else if (lvl > 14)
         speed = 4;
      else if (lvl > 7)
         speed = 2;
      do
      {
         var size =  (lvl < 21) ? (21 - lvl) * 3: 0;
         target = new Target(speed, size);
      } while (obs.collideWithTarget(target) || player.nearTarget(target));
      setTimeout(init, 1000, 2);
      writeMessage(context, "------------       Try again :/");
   }

   init(3);
};
