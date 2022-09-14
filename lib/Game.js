const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// No need to test the game logic, since we've already tested all the separate parts.

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    // can leave currentEnemy and player undefined because we'll define them when the initializeGame method is called
    this.currentEnemy;
    this.player;
};

// the initializeGame method is where we'll set up the Enemy and Player objects
Game.prototype.initializeGame = function() {
    // populate enemies array with following code
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // keep track of which Enemy object is currently fighting the Player
    // we use index 0 here because at the start of the game, the Player will be facing the first enemy in the array which is at index[0]
    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'Enter player name:'
        })
        // destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            this.startNewBattle();
        });

};

module.exports = Game;