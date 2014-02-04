/**************
 * Constantes *
 **************/
try { // Server
if (global)
   global.game.CST =
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
   };
}
catch (e) // Client
{
   var CST =
   {
      CAN_WIDTH           : 0,
      CAN_HEIGHT          : 0,
      COL_HUD             : '',
      COL_OBS_RECT        : '',
      COL_OBS_CIRC        : '',
      COL_OBS_CIRC_ST     : '',
      COL_PLAYER          : '',
      COL_PLAYER_DEAD     : '',
      COL_TARGET          : '',
      COL_TARGET_ST       : '',
      COL_TARGET_REACHED  : '',
   };
}

