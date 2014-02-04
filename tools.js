module.exports =
{
   /****** Constantes *****/
   CST :
   {
      CAN_WIDTH           : 800,
      CAN_HEIGHT          : 600,
      COL_HUD             : 'black',
      COL_OBS_RECT        : 'black',
      COL_OBS_CIRC        : 'red',
      COL_OBS_CIRC_ST     : 'blue',
      COL_PLAYER          : 'green',
      COL_PLAYER_DEAD     : 'red',
      COL_TARGET          : '#8ED6FF',
      COL_TARGET_ST       : 'black',
      COL_TARGET_REACHED  : 'yellow',
   },

   /*** Classes ***/
   Obstacle : function (type)
   {
      this.type = type;
      this.x = Math.random() * (module.exports.CST.CAN_WIDTH - 200) + 100;
      this.y = Math.random() * (module.exports.CST.CAN_HEIGHT - 200) + 100;
      this.radius = (type === 'circ') ? Math.random() * 50 + 10 : 0;
      this.width = (type === 'rect') ? Math.random() * 100 + 10 : 0;
      this.height = (type === 'rect') ? Math.random() * 100 + 10 : 0;
      this.speedX = Math.random() * 5;
      this.speedY = Math.random() * 5;

      this.move = function (players, obs, target)
      {
         switch (this.type)
         {
            case 'rect' :
               this.x += this.speedX;
               if (this.x <= 0)
                  this.speedX = -this.speedX;
               else if ((this.x + this.width) > module.exports.CST.CAN_WIDTH)
                  this.speedX = -this.speedX;
               else if (this.collideWithCirc(target))
                  this.speedX = -this.speedX;
               else if (players.collideWithThisObs(this))
                  this.speedX = -this.speedX;
               else if (obs.collideWithThisObs(this))
                  this.speedX = -this.speedX;

               this.y += this.speedY;
               if (this.y <= 0)
                  this.speedY = -this.speedY;
               else if ((this.y + this.height) > module.exports.CST.CAN_HEIGHT)
                  this.speedY = -this.speedY;
               else if (this.collideWithCirc(target))
                  this.speedY = -this.speedY;
               else if (players.collideWithThisObs(this))
                  this.speedY = -this.speedY;
               else if (obs.collideWithThisObs(this))
                  this.speedY = -this.speedY;
               break;
            case 'circ' :
               this.x += this.speedX;
               if ((this.x - this.radius) <= 0)
                  this.speedX = -this.speedX;
               else if ((this.x + this.radius) > module.exports.CST.CAN_WIDTH)
                  this.speedX = -this.speedX;
               else if (this.collideWithCirc(target))
                  this.speedX = -this.speedX;
               else if (players.collideWithThisObs(this))
                  this.speedX = -this.speedX;
               else if (obs.collideWithThisObs(this))
                  this.speedX = -this.speedX;

               this.y += this.speedY;
               if ((this.y - this.radius) <= 0)
                  this.speedY = -this.speedY;
               else if ((this.y + this.radius) > module.exports.CST.CAN_HEIGHT)
                  this.speedY = -this.speedY;
               else if (this.collideWithCirc(target))
                  this.speedY = -this.speedY;
               else if (players.collideWithThisObs(this))
                  this.speedY = -this.speedY;
               else if (obs.collideWithThisObs(this))
                  this.speedY = -this.speedY;
               break;
         }
      };

      this.collideWithCirc = function (circ)
      {
         switch (this.type)
         {
            case 'rect' :
               return module.exports.circRectOverlap(circ, this);
            case 'circ' :
               return module.exports.circsOverlap(this, circ);
         }
      };

      this.collideWithRect = function (rect)
      {
         switch (this.type)
         {
            case 'rect' :
               return module.exports.rectsOverlap(this, rect);
            case 'circ' :
               return module.exports.circRectOverlap(this, rect);
         }
      };

   },

   Player : function (name)
   {
      this.x = Math.random() * (module.exports.CST.CAN_WIDTH - 200) + 100;
      this.y = Math.random() * (module.exports.CST.CAN_HEIGHT - 200) + 100;
      this.width = 20;
      this.height = 20;
      this.speedX = 0;
      this.speedY = 0;

      this.name = name;
      this.score = 0;
      this.shield = 0;
      this.nb_death = 0;
      this.dead = false;

      this.init = function (players, obs)
      {
         this.speedX = 0;
         this.speedY = 0;
         this.shield = 2;
         this.dead = false;
         do
         {
            this.x = Math.random() * (module.exports.CST.CAN_WIDTH - 200) + 100;
            this.y = Math.random() * (module.exports.CST.CAN_HEIGHT - 200) + 100;
         } while (obs.collideWithThisPlayer(this) || players.collideWithThisPlayer(this));
      };

      this.move = function (players, obs)
      {
         this.x += this.speedX;
         if (this.x <= 0)
            this.x -= this.speedX;
         else if ((this.x + this.width) > module.exports.CST.CAN_WIDTH)
            this.x -= this.speedX;
         else if (obs.collideWithThisPlayer(this))
            this.x -= this.speedX;
         else if (players.collideWithThisPlayer(this))
            this.x -= this.speedX;

         this.y += this.speedY;
         if (this.y <= 0)
            this.y -= this.speedY;
         else if ((this.y + this.height) > module.exports.CST.CAN_HEIGHT)
            this.y -= this.speedY;
         else if (obs.collideWithThisPlayer(this))
            this.y -= this.speedY;
         else if (players.collideWithThisPlayer(this))
            this.y -= this.speedY;
      };

      this.nearTarget = function (target)
      {
         return module.exports.circsOverlap(this, {x: target.x, y: target.y, radius: 250});
      };

      this.setSpeedX = function (speed)
      {
         this.speedX = speed;
      };

      this.setSpeedY = function (speed)
      {
         this.speedY = speed;
      };

      this.decreaseShield = function ()
      {
         if (this.shield > 0) // invincibility
            this.shield--;
      };

      this.kill = function ()
      {
         if (this.shield <= 0)
         {
            this.dead = true;
            this.score -= 10;
            this.nb_death++;
         }
      };
   },

   Target : function (speed, size)
   {
      this.x = Math.random() * (module.exports.CST.CAN_WIDTH - 200) + 100;
      this.y = Math.random() * (module.exports.CST.CAN_HEIGHT - 200) + 100;
      this.radius = Math.random() * size + 10;
      this.speedX = Math.random() * speed;
      this.speedY = Math.random() * speed;
      this.reached = false;

      this.move = function (obs)
      {
         this.x += this.speedX;
         if ((this.x - this.radius) <= 0)
            this.speedX = -this.speedX;
         else if ((this.x + this.radius) > module.exports.CST.CAN_WIDTH)
            this.speedX = -this.speedX;
         else if (obs.collideWithTarget(this))
            this.speedX = -this.speedX;

         this.y += this.speedY;
         if ((this.y - this.radius) <= 0)
            this.speedY = -this.speedY;
         else if ((this.y + this.radius) > module.exports.CST.CAN_HEIGHT)
            this.speedY = -this.speedY;
         else if (obs.collideWithTarget(this))
            this.speedY = -this.speedY;
      };
   },

   /**  **/
   lvl : 0,
   target : null,
   nbLoop : 0,
   // Pause is off.
   // pause : false,
   mgs : '',
   time :
   {
      start : 0,

      toString : function ()
      {
         if (this.start == 0)
            return "N/A";
         else
            return Math.round((this.now() - this.start) / 1000);
      },

      setStart : function ()
      {
         this.start = this.now();
      },

      setStartTo : function (t)
      {
         this.start = t;
      },

      now : function ()
      {
         return (new Date().getTime());
      },
   },

   // List of obstacles
   obs :
   {
      list : [],

      add : function ()
      {
         var type = (Math.random() > 0.5) ? "rect" : "circ",
            o;
         do
         {
            o = new module.exports.Obstacle(type);
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
   },

   // List of players
   players :
   {
      list : [],

      add : function (name)
      {
         module.exports.players.list.push(new module.exports.Player(name));
      },

      isNameAlreadyUsed : function (name)
      {
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            if (module.exports.players.list[i].name == name)
               return true;
         return false;
      },

      init : function (obs)
      {
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            module.exports.players.list[i].init(module.exports.players, obs);
      },

      move : function (obs)
      {
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            module.exports.players.list[i].move(module.exports.players, obs);
      },

      near_target : function (target)
      {
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            module.exports.players.list[i].nearTarget(target);
      },

      decreaseShield : function ()
      {
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            module.exports.players.list[i].decreaseShield();
      },

      increaseScoreIfAlive : function ()
      {
         module.exports.players.decreaseShield();
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            if (!module.exports.players.list[i].dead)
               module.exports.players.list[i].score += 1;
      },

      setSpeedX : function (name, speed)
      {
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            if (module.exports.players.list[i].name == name)
               module.exports.players.list[i].setSpeedX(speed);
      },

      setSpeedY : function (name, speed)
      {
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            if (module.exports.players.list[i].name == name)
               module.exports.players.list[i].setSpeedY(speed);
      },

      collideWithTarget : function (target)
      {
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            if (!module.exports.players.list[i].dead &&
                  module.exports.circRectOverlap(target, module.exports.players.list[i]))
            {
               // Victory
               // If a player has reached the target without being killed.
               module.exports.players.list[i].score += 50;
               target.reached = true;
               return true;
            }

         return false;
      },

      collideWithThisPlayer : function (player)
      {
         for (var i = 0, c = this.list.length; i < c; ++i)
            if (player.x !== this.list[i].x)
               if (module.exports.rectsOverlap(this.list[i], player))
                  return true;
         return false;
      },

      collideWithThisObs : function (obstacle)
      {
         for (var i = 0, c = this.list.length; i < c; ++i)
            if (obstacle.collideWithRect(this.list[i]))
               return true;
         return false;
      },

      collideWithObs : function (obs)
      {
         for (var i = 0, c = this.list.length; i < c; ++i)
            for (var j = 0, l = obs.list.length; j < l; ++j)
               if (obs.list[j].collideWithRect(this.list[i]))
                  this.list[i].kill();

         for (var i = 0, c = this.list.length; i < c; ++i)
            if (!this.list[i].dead)
               return false;
         return true; // if all players are dead : reboot the level.
      },

      remove : function (name)
      {
         for (var i = 0, c = module.exports.players.list.length; i < c; ++i)
            if (module.exports.players.list[i].name == name)
            {
               this.list.splice(1, i);
               return;
            }
      },
   },

   /**
    * mainLoop move all the objects in the canvas.
    * And check if they collide.
    */
   mainLoop : function (io)
   {
      // Do nothing if the game is paused.
      // Pause is off.
      // if (module.exports.pause)
      // {
      //    setTimeout(module.exports.mainLoop(), 1000, io);
      //    return;
      // }

      module.exports.nbLoop++;
      if (module.exports.nbLoop >= 60) // executed every second (more or less)
      {
         module.exports.nbLoop = 0;
         module.exports.players.increaseScoreIfAlive();
      }

      // Move obstacles, players and target.
      module.exports.obs.move(module.exports.players, module.exports.target);
      module.exports.players.move(module.exports.obs);
      module.exports.target.move(module.exports.obs);

      // Check if any player has been killed by an obstacle.
      // If so and all the players are dead then restart the level.
      if (module.exports.players.collideWithObs(module.exports.obs))
      {
         setTimeout(module.exports.rebootLvl, 1000, io);
      }
      // Check if any player has reached it.
      // Display the target with a different color if it has been reached.
      else if (module.exports.players.collideWithTarget(module.exports.target))
      {
         setTimeout(module.exports.init, 1000, 3, io);
      } else
      {
         // Execute the mainLoop every 60ms
         setTimeout(module.exports.mainLoop, 1000 / 60, io);
      }

      // Send game data to all players, so they can display every objects
      // in their canvas.
      io.sockets.emit('paint', module.exports);
   },

   init : function (timeBeforeStart, io)
   {
      if (timeBeforeStart === 3)
      {
         module.exports.lvl++;
         module.exports.obs.add();
         module.exports.players.init(module.exports.obs);
         var speed = 0;
         if (module.exports.lvl > 21)
            speed = 6;
         else if (module.exports.lvl > 14)
            speed = 4;
         else if (module.exports.lvl > 7)
            speed = 2;
         do
         {
            var size =  (module.exports.lvl < 21) ? (21 - module.exports.lvl) * 3: 0;
            module.exports.target = new module.exports.Target(speed, size);
         } while (module.exports.obs.collideWithTarget(module.exports.target)
               || module.exports.players.near_target(module.exports.target));
      }
      if (timeBeforeStart >= 0)
      {
         setTimeout(module.exports.init, 1000, timeBeforeStart - 1, io);
         module.exports.msg = timeBeforeStart;
         if (timeBeforeStart === 0)
            module.exports.msg = 'Go...';
      }
      else
      {
         var speed = 0;
         if (module.exports.lvl > 21)
            speed = 6;
         else if (module.exports.lvl > 14)
            speed = 4;
         else if (module.exports.lvl > 7)
            speed = 2;
         do
         {
            var size =  (module.exports.lvl < 21) ? (21 - module.exports.lvl) * 3: 0;
            module.exports.target = new module.exports.Target(speed, size);
         } while (module.exports.obs.collideWithTarget(module.exports.target)
               || module.exports.players.near_target(module.exports.target));
         setTimeout(function ()
               {
                  module.exports.msg = "";
                  module.exports.mainLoop(io);
               }, 1000, io);
         module.exports.time.setStart();
      }
      io.sockets.emit('paint', module.exports);
   },

   rebootLvl : function (io)
   {
      module.exports.players.init(module.exports.obs);
      module.exports.msg = " Try again :/";
      setTimeout(module.exports.init, 1000, 2, io);
      io.sockets.emit('paint', module.exports);
   },

   /*** Collision functions ***/
   rectsOverlap : function (rectA, rectB)
   {
      if ((rectA.x > (rectB.x + rectB.width)) ||
            ((rectA.x + rectA.width) < rectB.x))
         return false;

      if ((rectA.y > (rectB.y + rectB.height)) ||
            ((rectA.y + rectA.height) < rectB.y))
         return false;
      return true;
   },

   circsOverlap : function (circA, circB)
   {
      // If the distance between the centers is less than the sum of their radius
      // then the two circles overlap.
      var dx = circB.x - circA.x;
      var dy = circB.y - circA.y;
      // Calc square of the distance between the two centers.
      var dist = dx * dx + dy * dy;
      return dist <= (4 * circA.radius * circB.radius);
   },

   circRectOverlap : function (circ, rect)
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
   },
};
