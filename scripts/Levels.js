Game.Levels = function (game) {};

var titlescreen;
var deco;
var decoLoop;

Game.Levels.prototype = {
    create: function (game) {
        this.add.image(0, 0, 'bg');
        this.createButton(game, "Level 1", game.world.centerX - 192, game.world.centerY , 200, 100, 
        function(){
            this.state.start('Level1');
            music.stop();
        });
        this.createButton(game, "Level 2", game.world.centerX + 192, game.world.centerY , 200, 100, 
        function(){
            this.state.start('Level2');
            music.stop();
        });
        this.createButton(game, "Back", game.world.centerX, game.world.centerY + 192, 200, 100, 
        function(){
            this.state.start('MainMenu');
            music.stop();
        });
        titlescreen = game.add.sprite(game.world.centerX, game.world.centerY - 192, 'titlescreen');
        titlescreen.anchor.setTo(0.5, 0.5);

        timer = game.time.create(false);
        timer.loop(3600, this.createDeco, this);
        timer.start();
        music.play();
    },

    createButton: function(game, string, x, y, w, h, callback){
        var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

        var txt = game.add.text(button1.x, button1.y, string, {font: "14px Arial", fill: "#fff", align: "center"});
        txt.anchor.setTo(0.5, 0.5);

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

}