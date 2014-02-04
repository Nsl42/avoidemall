/********
 * Time *
 ********/
var time =
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
};
try { // Server
if (global)
   global.game.time = time;
}
catch (e) {} // Client
