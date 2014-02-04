function update_objects (game_data)
{
   CST = game_data.CST;
   obs.createObstacles(game_data.obs);
   players.createPlayers(game_data.players);
   target = target.createTarget(game_data.target);
   time.setStartTo(game_data.time.start);
   lvl = game_data.lvl;
   pause = game_data.pause;
   msg = game_data.msg;
}

/**
 * Clear all the canvas before we draw all the objects on it.
 * @param context : 2d drawing context of the canvas.
 */
function clearCanvas (context)
{
   context.clearRect(0, 0, CST.CAN_WIDTH, CST.CAN_HEIGHT);
}

/****************************
 * Display Messages and HUD *
 ****************************/

/**
 * Write the message on the canvas.
 */
function writeMessage (context,  message)
{
   context.font = '18pt Calibri';
   context.fillStyle = CST.COL_HUD;
   context.fillText(message, 10, 25);
}

/**
 * Display HUD.
 */
function show_hud (context, time, lvl, player)
{
   function writeTime (context, time)
   {
      context.fillText('  Time : ' + time.toString(), 50, 50);
   }

   function writeLvl (context, lvl)
   {
      context.fillText(' Level : ' + lvl, CST.CAN_WIDTH - 150, 50);
   }

   function writeScore (context, player)
   {
      context.fillText(' Score : ' + player.score, 50, CST.CAN_HEIGHT - 50);
   }

   function writeNbDeath (context, player)
   {
      context.fillText('Deaths : ' + player.nb_death, CST.CAN_WIDTH - 150, CST.CAN_HEIGHT - 50);
   }

   // Set up context.
   context.font = '18pt Calibri';
   context.fillStyle = CST.COL_HUD;

   // Call functions to display every parts of the HUD.
   writeTime(context, time);
   writeLvl(context, lvl);
   writeScore(context, player);
   writeNbDeath(context, player);
}
