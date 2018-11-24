Game.CustomPlayer = function (game) { };

var playerDefault;
var playerKing;
var playerGold;

Game.CustomPlayer.prototype = {
    create: function (game) {
        this.add.image(0, 0, 'bg');
        music.resume();
        this.createButton(game, "Back", game.world.centerX, game.world.centerY + 192, 300, 100,
            function () {
                this.state.start('MainMenu');
                music.pause();
            });
        titlescreen = game.add.sprite(game.world.centerX, game.world.centerY - 192, 'titlescreen');
        titlescreen.anchor.setTo(0.5, 0.5);
        //Player Standar.
        playerDefault = game.add.sprite(game.world.centerX - 200, game.world.centerY + 32, 'player');
        playerDefault.width = 60;
        playerDefault.height = 60;
        playerDefault.anchor.setTo(0.5, 0.5);
        playerDefault.inputEnabled = true;
        playerDefault.events.onInputDown.add(detectPlayer, this);
        //player King.
        playerKing = game.add.sprite(game.world.centerX - 15, game.world.centerY + 32, 'playerKing');
        playerKing.width = 60;
        playerKing.height = 60;
        playerKing.anchor.setTo(0.5, 0.5);
        playerKing.inputEnabled = true;
        playerKing.events.onInputDown.add(detectPlayer, this);
        //player Gold.
        playerGold = game.add.sprite(game.world.centerX + 150, game.world.centerY + 32, 'playerGold');
        playerGold.width = 60;
        playerGold.height = 60;
        playerGold.anchor.setTo(0.5, 0.5);
        playerGold.inputEnabled = true;
        playerGold.events.onInputDown.add(detectPlayer, this);
    },

    createButton: function (game, string, x, y, w, h, callback) {
        var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

        var txt = game.add.text(button1.x, button1.y, string, { font: "14px Arial", fill: "#fff", align: "center" });
        txt.anchor.setTo(0.5, 0.5);

    }
}
function detectPlayer(spriteA) {
    player = spriteA;
    music.stop();
    this.state.start('Levels');
}