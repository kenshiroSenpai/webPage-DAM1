Game.MainMenu = function (game) { };

var titlescreen;
var deco;
var tween;
var timer;
var music;
var decoLoop;

Game.MainMenu.prototype = {
    create: function (game) {
        music = this.game.add.audio('titleSound');
        music.loop = true;
        this.add.image(0, 0, 'bg');
        this.createButton(game, "Play", game.world.centerX, game.world.centerY + 32, 300, 100,
            function () {
                this.state.start('CustomPlayer');
                music.pause();
            });

        this.createButton(game, "About", game.world.centerX, game.world.centerY + 192, 300, 100,
            function () {
                this.state.start('About');
                music.pause();
            });
        //Image that contain title text.
        titlescreen = game.add.sprite(game.world.centerX, game.world.centerY - 192, 'titlescreen');
        titlescreen.anchor.setTo(0.5, 0.5);
        //Timer that create stars.
        timer = game.time.create(false);
        timer.loop(3600, this.createDeco, this);
        timer.start();
        music.play();
        
    },

    deleteDeco: function () {
        this.deco.kill();
    },

    createDeco: function () {
        this.physics.arcade.gravity.y = 100;
        this.deco = this.add.group();
        this.deco.enableBody = true;
        this.decoLoop = this.deco.create(this.rnd.integerInRange(30, 700) + this.rnd.integerInRange(10, 60), 0, 'points');
        this.decoLoop.anchor.setTo(0.5, 0.5);
        this.decoLoop.inputEnabled = true;
        this.decoLoop.events.onInputOver.add(this.deleteDeco, this); 
    },

    createButton: function (game, string, x, y, w, h, callback) {
        var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

        var txt = game.add.text(button1.x, button1.y, string, { font: "14px Arial", fill: "#fff", align: "center" });
        txt.anchor.setTo(0.5, 0.5);

    }
};