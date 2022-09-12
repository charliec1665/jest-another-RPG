// NEVER use arrow functions as constructor functions! Why?
// they change the meaning of the keyword 'this'

function Potion(name) {
    this.name = name;

    if (this.name === 'health') {
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

module.exports = Potion;