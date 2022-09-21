// NEVER use arrow functions as constructor functions! Why?
// they change the meaning of the keyword 'this'

class Potion {
    constructor(name) {
        this.types = ['strength', 'agility', 'health'];
        // this expression will be evaluated so that if name is truthy, then this.name = name
        // IF name is NOT truthy, this.name = this.types[Math.floor....etc
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        if (this.name === 'health') {
            this.value = Math.floor(Math.random() * 10 + 30);
        } else {
            this.value = Math.floor(Math.random() * 5 + 7);
        }
    }
};

module.exports = Potion;