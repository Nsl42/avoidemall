/****************************
 * Display Messages and HUD *
 ****************************/

// Clear all the canvas with context before we draw all the objects on it.
function clearCanvas (context)
{
   context.clearRect(0, 0, CST.CAN_WIDTH, CST.CAN_HEIGHT);
}

// Write message on the canvas with context.
function writeMessage (context,  message)
{
   context.font = '18pt Calibri';
   context.fillStyle = CST.COL_HUD;
   context.fillText(message, 10, 25);
}

// Display HUD on canvas with context.
// Display time, level and player's score and nb_death.
function show_hud (context, time, lvl, player)
{
   // Write time preceded by 'Time :' on top left edge of the canvas.
   function writeTime (time)
   {
      context.fillText('  Time : ' + time.toString(), 50, 50);
   }

   // Write lvl preceded by 'Level :' on top right edge of the canvas.
   function writeLvl (lvl)
   {
      context.fillText(' Level : ' + lvl, CST.CAN_WIDTH - 200, 50);
   }

   // Write score preceded by 'Score :' on bottom left edge of the canvas.
   function writeScore (score)
   {
      context.fillText(' Score : ' + score, 50, CST.CAN_HEIGHT - 50);
   }

   // Write nb_death preceded by 'Deaths :' on bottom right edge of the canvas.
   function writeNbDeath (nb_death)
   {
      context.fillText('Deaths : ' + nb_death, CST.CAN_WIDTH - 200, CST.CAN_HEIGHT - 50);
   }

   // Write the name of the player on the top of the canvas.
   function writeName (name)
   {
      context.fillText(name, (CST.CAN_WIDTH / 2) - (name.length * 7), 25);
   };

   // Set up context.
   context.font = '18pt Calibri';
   context.fillStyle = CST.COL_HUD;

   // Call functions to display every parts of the HUD.
   writeTime(time);
   writeLvl(lvl);
   writeScore(player.score);
   writeNbDeath(player.nb_death);
   writeName(player.name);
}
