/********
 * Time *
 ********/

// Object used for displaying the time during the game.
var time =
{
   // Time in ms when the level start.
   start : 0,

   // Return the number of secondes since start.
   // Unless it's 0, then return "N/A".
   toString : function ()
   {
      if (this.start == 0)
         return "N/A";
      else
         return Math.round((this.now() - this.start) / 1000);
   },


   // Set start to the current time.
   setStart : function ()
   {
      this.start = this.now();
   },

   // Set start to t.
   setStartTo : function (t)
   {
      this.start = t;
   },

   // Return the current time in ms.
   now : function ()
   {
      return (new Date().getTime());
   },
};
try { // Server-side
if (global)
   global.game.time = time;
}
catch (e) {} // Client-side
