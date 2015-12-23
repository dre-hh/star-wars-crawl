const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const $ = require('jquery');

ipcRenderer.on('pipe', function(event, arg) {
  var lines = arg.split('\n');
  $(".titles div").html(lines.join('<br>'));
});

StarWars = (function() {

  function StarWars(args) {
    // Context wrapper
    this.el = $(args.el);

    // Audio to play the opening crawl
    this.audio = this.el.find('audio').get(0);

    // Start the animation
    this.start = this.el.find('.start');

    // The animation wrapper
    this.animation = this.el.find('.animation');

    // Remove animation and shows the start screen
    this.reset();

    // Reset the animation and shows the start screen
    $(this.audio).bind('ended', $.proxy(function() {
      this.audio.currentTime = 0;
      this.reset();
    }, this));

    this.start.hide();
    this.audio.play();
    this.el.append(this.animation);
  }

  /*
   * Resets the animation and shows the start screen.
   */
  StarWars.prototype.reset = function() {
    this.start.show();
    this.cloned = this.animation.clone(true);
    this.animation.remove();
    this.animation = this.cloned;
  };

  return StarWars;
})();

new StarWars({
  el : '.starwars'
});