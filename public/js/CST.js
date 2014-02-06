/**************
 * Constantes *
 **************/

// Object which contained all constantes used by the game.
var CST =
{
   // Width of the canvas in px.
   CAN_WIDTH           : 800,
   // Height of the canvas in px.
   CAN_HEIGHT          : 600,
   // Color of HUD.
   COL_HUD             : 'black',
   // Color of rectangle obstacle.
   COL_OBS_RECT        : 'black',
   // Color of circle obstacle.
   COL_OBS_CIRC        : 'red',
   // Color of circle obstacle's border.
   COL_OBS_CIRC_ST     : 'blue',
   // Color of players.
   COL_PLAYER          : 'green',
   // Color of a player who has been killed.
   COL_PLAYER_DEAD     : 'red',
   // Color of the target.
   COL_TARGET          : '#8ED6FF',
   // Color of the target's border.
   COL_TARGET_ST       : 'black',
   // Color of a target that has been reached.
   COL_TARGET_REACHED  : 'yellow',
};
try { // Server-side
   if (global)
      global.game.CST = CST;
}
catch (e) { } // Client-side
