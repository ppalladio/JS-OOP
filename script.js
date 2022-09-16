'use strict';

/**
 * ! cant use arrow functions because it doesn't have 'this' keyword and a constructor function needs 'this' keyword.
 * ! constructor function starts with capitalied letter
 *
 *  */

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};
//** create instance use 'new' keyword */

const ana = new Person('ana', 1991);

console.log(ana instanceof Person); // true
//** to add methods, prototypal inheritance */

Person.prototype.getAge = function (year) {
    // stored in the __proto__ property
    const age = year - this.birthYear;
    console.log(age);
};

ana.getAge(2022);

console.log(ana.__proto__);
console.log(Person.prototype);

//** add property */

Person.prototype.species = 'Homo Sacpiens'; // stored in the __proto__ property

//**  proto chain and inheritance

console.log(ana.__proto__.__proto__);

//** array proto */

const arr = Array.from({ length: 7 }, (_, i) => i + 1);

console.log(arr.__proto__.__proto__);

//** add new method to Array constructor function */
Array.prototype.unique = function () {
    return [new Set(this)];
};

//**- es6 syntex*/

class PersonaEs {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
    //** method is added to the proto */
    currentAge(){
        console.log(2022-this.birthYear);
    }
}

const Jessica = new PersonaEs ('Jessica', 1990)

Jessica.currentAge()

//**. classes are not hoisted, need to init before using */