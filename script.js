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

//**> static method (instance method) */

Person.welcome = function () {
    console.log('grettings');
    console.log(this);
};

//**' wont work on instances method*/
//** create instance use 'new' keyword */

const ana = new Person('ana', 1991); //ana.welcome() ana.welcome is not a function

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

//**> es6 syntex*/

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
        if (name.includes(' ')) {
            this._fullName = name; //**' use _to avoid duplication conflict */
        } else {
            alert(`${name} is not a fullName`);
        }
    }
    //**' the underlying parameter is still _fullName, just use get to so we can call jessica.fullName instead of jessica._fullName. checkout the end for the output notes*/
    get fullName() {
        return this._fullName;
    }

    static welcome() {
        //** static method */
        console.log('greetings');
    }
}
PersonaEs.welcome();

const Jessica = new PersonaEs('Jessica Davis', 1990);

Jessica.currentAge();
console.log(Jessica.age);
//**. classes are not hoisted, need to init before using */

//> getter and setter

const account = {
    owner: 'Jessica',
    movements: [100, 200, 300, 400, 500],

    //*get
    get latest() {
        return this.movements.slice(-1).pop();
    },

    //*set
    set lastest(mov) {
        this.movements.push(mov);
    },
};
console.log(account.latest);

account.lastest = 50;

console.log(account.movements); //[ 100, 200, 300, 400, 500, 50 ]
//**get and set, dont need paretethesis are more like property than function, and SET needs exactly one parameter. */

//> method object.create

const PersonProto = {
    getAge(year) {
        const age = year - this.birthYear; // it gets this keyword because it is not an arrow function, string literal.
        console.log(age);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const sven = Object.create(PersonProto); //. it is empty at first
sven.birthYear = 1990;
sven.getAge(2002);

const hadar = Object.create(PersonProto); //. use init method

hadar.init('hadar', 1980);
hadar.getAge(2002);

//~* class inheritance
//>1 constructor inheritance]

const classInheretance = function () {
    // create isolated block
    const Person = function (firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    };
    Person.prototype.getAge = function (year) {
        const age = year - this.birthYear;
        console.log(age);
    };
};

const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear); //' use call method to manually set this keyword
    this.course = course;
};
Student.prototype = Object.create(Person.prototype); //' must be declared right after the initialization
const mike = new Student('mike', 2000, 'cs');
Student.prototype.introduce = function () {
    console.log(`my name is ${this.firstName}`);
};
mike.introduce(); //my name is mike
mike.getAge(2030); //30

Student.prototype.constructor = Student; //! make sure the prototype is Student, or it will point to its parent class

//>2 Es6 class inheritance
class StudentEs extends PersonaEs {
    // if no new parameter is introduced, there is no need to call constructor. but constructor needs to be called first.
    constructor(fullName, birthYear, course) {
        super(fullName, birthYear);
        this.course = course;
    }
    // overwrite the currentAge function
    currentAge() {
        // because this function appears first in the prototype chain
        console.log(2022 - this.birthYear + 10);
    }
}
const zac = new StudentEs('zac mac', 2000, 'cs');
console.log(zac);
zac.currentAge(); ///2

//> 3 object.create method

const jim = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto); //. by using the create, personproto is the prototype of studentproto, which means perosonproto inherites from studentproto

StudentProto.init = function (fullName, birthYear, course) {
    PersonProto.init.call(this, fullName, birthYear);
    this.course = course;
};

const jay = Object.create(StudentProto); //. jay's prototype is studentproto , using create we establish hierarchy from jay(child) -> studentproto(child) -> personproto(child)-> object(root)

jay.init('jay', 2000, 'cs');
jay.getAge(2020);

//~* encapsulation

class Account {
    l; // public fields (instance based)
    location = navigator.language;

    // private fields (instance based)

    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
    }

    getMov() {
        return this.#movements; // private fields
    }

    deposit(val) {
        this.#movements.push(val);
    }

    withdraw(val) {
        this.#movements.push(val);
    }

    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
        }
    }

    // private methods
    #approveLoan(val) {
        return true;
    }
}

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
