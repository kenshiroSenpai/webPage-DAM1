var Game = {};

Game.Boot = function (game) { };

Game.Boot.prototype = {
    init: function () {
        this.input.maxPointers = 1;
        this.stage.VisibilityChange = true;
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setMinMax(320, 480, 800, 600);
        this.scale.roundPixels = true;
        this.time.advancedTiming = true;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    },
    preload: function () {
        this.load.image('preloaderBar', 'assets/preloader-bar.png');
    },
    create: function () {
        this.state.start('Preloader');
    }
}