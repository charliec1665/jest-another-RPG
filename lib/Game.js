const inquirer = require('inquirer');
const Enemy = require('../lib/Enemy');
const Player = require('../lib/Player');

// No need to test the game logic, since we've already tested all the separate parts.

class Game {
    constructor() {
        this.roundNumber = 0;
        this.isPlayerTurn = false;
        this.enemies = [];
        // can leave currentEnemy and player undefined because we'll define them when the initializeGame method is called
        this.currentEnemy;
        this.player;
    }

    // the initializeGame method is where we'll set up the Enemy and Player objects
    initializeGame() {
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
            .then(({ name }) => {
            this.player = new Player(name);

            this.startNewBattle();
            });
    }

    startNewBattle() {
        if (this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }
    
        console.log('Your stats are as follows:');
        console.table(this.player.getStats());
    
        console.log(this.currentEnemy.getDescription());
    
        this.battle();
    }
    
    battle() {
        if (this.isPlayerTurn) {
            inquirer
                .prompt({
                    type: 'list',
                    message: 'What would you like to do?',
                    name: 'action',
                    choices: ['Attack', 'Use Potion']
                })
                .then(({ action }) => {
                    if (action === 'Use Potion') {
                        if (!this.player.getInventory()) {
                            console.log("You don't have any potions!");
                            return this.checkEndofBattle();
                        }
    
                        inquirer
                            .prompt({
                                type: 'list',
                                message: 'Which potion would you like to use?',
                                name: 'action',
                                choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                            })
                            .then(({ action }) => {
                                const potionDetails = action.split(': ');
    
                                this.player.usePotion(potionDetails[0] - 1);
                                console.log(`You used a ${potionDetails[1]} potion.`);
                                this.checkEndofBattle();
                            });
                    } else {
                        const damage = this.player.getAttackValue();
                        this.currentEnemy.reduceHealth(damage);
    
                        console.log(`You attacked the ${this.currentEnemy.name}`);
                        console.log(this.currentEnemy.getHealth());
    
                        this.checkEndofBattle();
                    }
                });
        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);
    
            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());
    
            this.checkEndofBattle();
        }
    }

    checkEndofBattle() {
        if (this.player.isAlive() && this.currentEnemy.isAlive()) {
            this.isPlayerTurn = !this.isPlayerTurn;
            this.battle();
        } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
            console.log(`You've defeated the ${this.currentEnemy.name}`);

            this.player.addPotion(this.currentEnemy.potion);
            console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

            this.roundNumber++;

            if (this.roundNumber < this.enemies.length) {
                this.currentEnemy = this.enemies[this.roundNumber];
                this.startNewBattle();
            } else {
                console.log('You win!');
            }
        } else {
            console.log("You've been defeated!");
        }
    }
};

module.exports = Game;