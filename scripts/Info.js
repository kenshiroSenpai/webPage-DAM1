Game.Info = function (game) { };

var infoTitle;
var txtWasd;
Game.Info.prototype = {
    create: function (game) {
        this.add.image(0, 0, 'bg');
        this.add.image(game.world.centerX - 300, game.world.centerY - 90, 'wasd');
        txtWasd = game.add.text(game.world.centerX - 220, game.world.centerY + 100, "Move controls", { font: "30px Arial", fill: "#000000" });
        txtWasd.anchor.setTo(0.5, 0.5);
        this.add.image(game.world.centerX - 100, game.world.centerY - 90, 'qr');
        txtQr = game.add.text(game.world.centerX - 20, game.world.centerY + 100, "Q: Exit\nR:Restart", { font: "30px Arial", fill: "#000000" });
        txtQr.anchor.setTo(0.5, 0.5);
        this.add.image(game.world.centerX + 100, game.world.centerY - 50, 'space');
        txtSpace = game.add.text(game.world.centerX + 190, game.world.centerY + 100, "Pause", { font: "30px Arial", fill: "#000000" });
        txtSpace.anchor.setTo(0.5, 0.5);
        this.createButton(game, "Back", game.world.centerX, game.world.centerY + 220, 300, 100,
            function () {
                this.state.start('About');
                music.stop();
            });
        infoTitle = game.add.sprite(game.world.centerX, game.world.centerY - 192, 'info');
        infoTitle.anchor.setTo(0.5, 0.5);
        timer = game.time.create(false);
        timer.loop(3600, this.createDeco, this);
        timer.start();
        music.play();
    },
    createButton: function (game, string, x, y, w, h, callback) {
        var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

        var txt = game.add.text(button1.x, button1.y, string, { font: "14px Arial", fill: "#fff", align: "center" });
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
};