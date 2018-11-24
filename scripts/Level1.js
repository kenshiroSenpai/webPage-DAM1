EnemiesSnake = function (index, game, x, y) {
    this.snake = game.add.sprite(x, y, 'enemies');
    this.snake.anchor.setTo(0.5, 0.5);
    this.snake.name = index.toString();
    game.physics.enable(this.snake, Phaser.Physics.ARCADE);
    this.snake.body.inmovable = true;
    this.snake.body.collideWorldBounds = true;
    this.snakeTween = game.add.tween(this.snake).to({
        x: this.snake.x + 100
    }, 2000, 'Linear', true, 0, 100, true);
};

EnemiesFly = function (index, game, x, y) {
    this.bomb = game.add.sprite(x, y, 'bombs');
    this.bomb.anchor.setTo(0.5, 0.5);
    this.bomb.name = index.toString();
    game.physics.enable(this.bomb, Phaser.Physics.ARCADE);
    this.bomb.body.inmovable = true;
    this.bomb.body.collideWorldBounds = true;
    this.bomb.body.allowGravity = false;
    // var bombAnim = this.bomb.animations.add('move', [0,1,2], 3, true);
    this.bombTween = game.add.tween(this.bomb).to({
        y: this.bomb.y + 100
    }, 2000, 'Linear', true, 0, 100, true);
};

Game.Level1 = function (game) { };

var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var platforms;
var points;
var score = 0;
var winTxt;
var win = false;
var gameOver;
var countPoints = 0;
var spaceKey;
var pauseTxt;
var quitTxt;
var restart;
var quit;

Game.Level1.prototype = {
    create: function (game) {
        //add gravity
        this.physics.arcade.gravity.y = 1400;
        this.add.image(0, 0, 'bg');
        //create platforms.
        this.platforms = this.add.physicsGroup();
        this.platforms.create(0, 568, 'platform-rock');
        this.platforms.create(398, 568, 'platform-rock');
        this.platforms.create(40, 330, 'platform-grass');
        this.platforms.create(350, 450, 'platform-desert');
        this.platforms.create(400, 210, 'platform-desert');
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        // this.platforms.setAll('body.velocity.x', 100);
        //create points.
        this.points = this.add.group();
        this.points.enableBody = true;
        for (var i = 0; i < 8; i++) {
            var point = this.points.create(i * 100 + this.rnd.integerInRange(20, 60), this.rnd.integerInRange(60, 300), 'points');
            point.anchor.setTo(0.5, 0.5);
        }
        //create player.
        if(player.key === 'playerGold'){
            player = this.add.sprite(320, 432, 'playerGold');
        }
        if(player.key === 'playerKing'){
            player = this.add.sprite(320, 432, 'playerKing');
        }if(player.key === 'player'){
            player = this.add.sprite(320, 432, 'player');
        }
        
        player.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
        //create player animations.
        player.animations.add('idle', [0], 1, true);
        player.animations.add('jump', [3], 1, true);
        player.animations.add('run', [7, 8, 9, 10, 11, 12, 13, 14, 0], 10, true);
        //create enemies.
        enemy1 = new EnemiesSnake(0, game, player.x + 200, player.y);
        enemy2 = new EnemiesSnake(0, game, player.x - 100, player.y - 200);
        enemy3 = new EnemiesSnake(0, game, player.x + 370, player.y - 270);
        enemy4 = new EnemiesFly(0, game, player.x + 200, player.y - 100);
        enemy5 = new EnemiesFly(0, game, player.x - 100, player.y - 220);
        enemy6 = new EnemiesFly(0, game, player.x + 370, player.y - 350);
        //create a score.
        scoreText = this.add.text(10, 5, 'score: 0', { fontSize: '32px', fill: '#000' });
        //create the controls of the game.
        sounds = {
            pointSound: this.game.add.audio('pointSound'),
            jumpSound: this.game.add.audio('jumpSound'),
            winSound: this.game.add.audio('winSound'),
            loseSound: this.game.add.audio('loseSound'),
            bgSound: this.game.add.audio('bgSound')
        };
        sounds.bgSound.loop = true;
        // sounds.bgSound.volume = 0.5;
        sounds.bgSound.play();
        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        };

        spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        restart = this.input.keyboard.addKey(Phaser.Keyboard.R);
        quit = this.input.keyboard.addKey(Phaser.Keyboard.Q);
    },
    update: function () {
        this.physics.arcade.collide(player, this.platforms);
        this.physics.arcade.collide(this.points, this.platforms);
        this.physics.arcade.collide(this.traps, this.platforms);
        this.physics.arcade.collide(enemy1.snake, this.platforms);
        this.physics.arcade.collide(enemy2.snake, this.platforms);
        this.physics.arcade.collide(enemy3.snake, this.platforms);
        this.physics.arcade.overlap(player, this.points, this.collectPoints, null, this);

        player.body.velocity.x = 0;

        if (controls.right.isDown) {
            if (player.body.touching.down) {
                player.animations.play('run');
                player.scale.setTo(1, 1);
                player.body.velocity.x += playerSpeed;
            } else {
                player.scale.setTo(1, 1);
                player.body.velocity.x += playerSpeed;
            }
        }

        if (controls.left.isDown) {
            if (player.body.touching.down) {
                player.animations.play('run');
                player.scale.setTo(-1, 1);
                player.body.velocity.x -= playerSpeed;
            } else {

                player.scale.setTo(-1, 1);
                player.body.velocity.x -= playerSpeed;
            }
        }

        if (controls.up.isDown && (player.body.onFloor()
            || player.body.touching.down) && this.time.now > jumpTimer) {
            player.body.velocity.y = -600;
            jumpTimer = this.time.now + 750;
            player.animations.play('jump');
            sounds.jumpSound.play();

        }

        if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
            player.animations.play('idle');

        }
        //ckeck if the player collide with the enemy.
        if ((checkOverlap(player, enemy1.snake) || checkOverlap(player, enemy2.snake)
            || checkOverlap(player, enemy3.snake) || checkOverlap(player, enemy4.bomb)
            || checkOverlap(player, enemy5.bomb) || checkOverlap(player, enemy6.bomb) 
            ) && win ===false) {
            sounds.loseSound.play();
            this.playerLose();
        }

        if (win == false) {
            spaceKey.enabled = true;
            restart.enabled = false;
            quit.enabled = false;
            spaceKey.onDown.add(this.PauseMenu, this);
        } else {
            spaceKey.enabled = false;
            restart.enabled = true;
            quit.enabled = true;
            restart.onDown.add(this.resetPlayer, this);
            quit.onDown.add(this.quitGame, this);
        }
    },
    playerLose: function () {
        this.game.state.restart();
        sounds.bgSound.stop();
        countPoints = 0
        score = 0;
        win = false;
    },

    resetPlayer: function () {
        this.game.paused = false;
        this.game.state.restart();
        controls.enabled = true;
        countPoints = 0
        score = 0;
        win = false;
        sounds.bgSound.resume();
    },

    quitGame: function () {
        this.game.paused = false;
        this.state.start('MainMenu');
        sounds.bgSound.stop();
        countPoints = 0
        win = false;
    },

    PauseMenu: function () {
        if (this.game.paused === true) {
            this.game.paused = false;
            pauseTxt.destroy();
            quitTxt.destroy();
            sounds.bgSound.resume();
        } else {
            this.game.paused = true;
            quit.enabled = true;
            pauseTxt = this.add.text(350, 280, 'Pause', { fontSize: '32px', fill: '#000' });
            quitTxt = this.add.text(350, 320, 'quit Q to exit.', { fontSize: '32px', fill: '#000' })
            sounds.bgSound.pause();
            quit.onDown.add(this.quitGame, this);
        }
    },

    collectPoints: function (player, point) {
        if (!point.hit) {
            if (countPoints == 7) {
                controls.right.enabled = false;
                controls.left.enabled = false;
                controls.up.enabled = false;
                sounds.winSound.play();
                player.animations.play('idle');
                winTxt = this.add.text(300, 250, 'Win!\nClick R to restart\nClick Q to exit', { fontSize: '36px', fill: '#ffff41', align: 'center' });
                win = true;
                sounds.bgSound.stop();
            }
            point.hit = true;
            point.kill();
            sounds.pointSound.play();
            countPoints++;
            score += 10;
            scoreText.setText('score: ' + score);
        }
    },
}

//check if spriteA collides with spriteB
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}