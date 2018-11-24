Game.Preloader = function (game) {
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.preloadBar);
        //background.
        this.load.image('bg', 'assets/bg.png');
        this.load.image('bg2', 'assets/bg2.png');
        //titlescreen
        this.load.image('titlescreen', 'assets/titlescreen.png');
        this.load.image('info', 'assets/info.png');
        //buttons
        this.load.image('wasd', 'assets/wasd.png');
        this.load.image('qr', 'assets/qr.png');
        this.load.image('space', 'assets/space.png');
        //about
        this.load.image('About', 'assets/About.png');
        //button
        this.load.image('button', 'assets/button.png');
        //platform.
        this.load.image('platform-grass', 'assets/plataform-grass.png');
        this.load.image('platform-rock', 'assets/plataform-rock.png');
        this.load.image('platform-desert', 'assets/plataform-desert.png');
        this.load.image('powerUp', 'assets/powerUp.png');
        //points.
        this.load.image('points', 'assets/coin_gold.png');
        //traps.
        this.load.image('bombs', 'assets/fly_normal.png');
        //enemies.
        this.load.image('enemies', 'assets/enemiesSolo.png');
        //players.
        this.load.spritesheet('player', 'assets/player.png', 32, 28);
        this.load.spritesheet('playerKing', 'assets/kingPlayer.png', 32, 26);
        this.load.spritesheet('playerGold', 'assets/goldPlayer.png', 32, 23);
        //sounds
        this.load.audio('pointSound', 'audio/coinSound.wav');
        this.load.audio('jumpSound', 'audio/jumpRetro.wav');
        this.load.audio('winSound', 'audio/win.wav');
        this.load.audio('loseSound', 'audio/loseRetro.wav');
        this.load.audio('bgSound', 'audio/level1Sound.mp3');
        this.load.audio('bgSound2', 'audio/fondoSpooky.mp3');
        this.load.audio('titleSound', 'audio/retroBakcground90Loop.wav');
    },

    create: function () {
        this.time.advacedTiming = true; 
        this.state.start('MainMenu');
    }
}