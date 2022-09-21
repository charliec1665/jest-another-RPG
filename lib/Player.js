// Constructor functions should be created to do as little work as possible, working independently of one another if possible
const Potion = require('./Potion');
const Character = require('./Character');

class Player extends Character {
    constructor(name = '') {
        super(name);

        this.inventory = [new Potion('health'), new Potion()];
    }

    // returns an object with various player properties
    // Remember: no using arrow functions for constructor functions!

    // using the prototype method you are only creating the method once on the constructor function itself!
    // that's good! it means less work for the code. The code just be written once and not directly added to EVERY object
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    // returns the inventory array or false if empty
    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    }

    addPotion(potion) {
        this.inventory.push(potion);
    }

    usePotion(index) {
        // the original inventory array has a single potion removed at the specified index value and
        // put into a new 'removed items' array, then the potion at index [0] of this new array is
        // saved in a potion variable
        const potion = this.inventory.splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    }
};

module.exports = Player;