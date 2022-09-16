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
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    //** method is added to the proto */
    currentAge() {
        console.log(2022 - this.birthYear);
    }

    get age() {
        return 2022 - this.birthYear;
    }

    set fullName(name) {
        if (name.includes(' ')) { this._fullName = name //**' use _to avoid duplication conflict */
            
        } else {
            alert (`${name} is not a fullName`)
        }
    }
    //**' the underlying parameter is still _fullName, just use get to so we can call jessica.fullName instead of jessica._fullName . checkout the end for the output notes*/
    get fullName(){
        return this._fullName
    }
}

const Jessica = new PersonaEs('Jessica Davis', 1990);

Jessica.currentAge();
console.log(Jessica.age);
//**. classes are not hoisted, need to init before using */

//- getter and setter

const account = {
    owner: 'Jessica',
    movements: [100, 200, 300, 400, 500],

    //**getter */
    get latest() {
        return this.movements.slice(-1).pop();
    },

    //**they(get and set, dont need paretethesis) more like a property than a function, and it needs exactly one parameter. */
    set lastest(mov) {
        this.movements.push(mov);
    },
};
console.log(account.latest);

account.lastest = 50;

console.log(account.movements); //[ 100, 200, 300, 400, 500, 50 ]


//: Jessica console output
/**
 * birthYear: 1990
 * ' _fullName: "Jessica Davis"   line 67 as set to _fullName
 * ' age: (...) the dots are from get and set, will be shown once clicked
 * ' fullName: (...) this wouldnt be here with set fullName  
 * [[Prototype]]: Object
 * age: (...)
 * constructor: class PersonaEs
 * currentAge: ƒ currentAge()
 * ' fullName: "Jessica Davis"  nor this
*/


