window.onload = function () {
    // if(window.screen.width < 800){
        
    //     return;
    // }
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

    game.state.add('Boot', Game.Boot);
    game.state.add('Preloader', Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('Levels', Game.Levels);
    game.state.add('About', Game.About);
    game.state.add('Info', Game.Info);
    game.state.add('CustomPlayer', Game.CustomPlayer);
    game.state.add('Level1', Game.Level1);
    game.state.add('Level2', Game.Level2);

    game.state.start('Boot');
};
