// Begin project!

/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.

  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function GameObject(stuff){
  this.createdAt = stuff.createdAt;
  this.dimensions = stuff.dimensions
}

GameObject.prototype.destroy = function() {
  // return this.name + ' was removed from the game.'
  // see explodingbarrel.destroy() test,
  // undefined results returning is bad.
  // I have a theory that if I put in an if-else I can get error handling in case name is empty?
  if (this.name !== undefined) {
    return this.name + ' was removed from the game.'
    } else {
        return 'Object was removed from the game.'
  }
  // Verified, worked!
}

/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(stuff){
  GameObject.call(this,stuff);
  this.healthPoints = stuff.healthPoints;
  this.name = stuff.name;
}

CharacterStats.prototype = Object.create(GameObject.prototype);
// I can't help but feel I'm doing something wrong with ordering things but whatever.
CharacterStats.prototype.takeDamage = function() {
    return this.name + ' took damage.'
}


/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(stuff) {
  CharacterStats.call(this,stuff);
  this.team = stuff.team;
  this.weapons = stuff.weapons;
  this.language = stuff.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test your work by un-commenting these 3 objects and the list of console logs below:

// /*
  const explodingbarrel = new GameObject({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    }
  });
  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
  console.log(explodingbarrel.destroy());
*/

  // Stretch task:
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

function Fightable(stuff){
  Humanoid.call(this,stuff);
  this.epithet = stuff.epithet;
}

Fightable.prototype = Object.create(Humanoid.prototype);

Fightable.prototype.arrive = function() {
  console.log(`${this.name} ${this.epithet} strides into the arena!`)
}

Fightable.prototype.takeRealDamage = function(damage) {
  // This function is actually invoked _BY THE FIGHTABLE BEING HIT_.
  // You have to specify some amount of damage, then it subtracts

  this.healthPoints -= damage;
  if (this.healthPoints < 0) {
    console.log(`${this.name} takes fatal damage!`);
    console.log(this.destroy());
  } else {
    console.log(`${this.takeDamage()} ${this.healthPoints} health points remaining.`);
  }
}

function Hero(stuff){
  Fightable.call(this,stuff);
}

Hero.prototype = Object.create(Fightable.prototype);

Hero.prototype.stab = function(target) {
  if (this.weapons.includes('Dagger')) {
    let damage = 1;
    console.log(`${this.name} stabs ${target.name}!`)
    target.takeRealDamage(damage);
  } else {
    console.log('Error!');
  }
}

function Villain(stuff){
  Fightable.call(this,stuff);
}

Villain.prototype = Object.create(Fightable.prototype);
Villain.prototype.stomp = function(target) {
  // needs to specify the target ^
  if (target.dimensions.height === undefined) {
    // had initially written with target.height
    console.log('Error!');
  } else if (this.dimensions.height > target.dimensions.height) {
    console.log(`${this.name} stomps on ${target.name}!`);
    let damage = this.dimensions.height - target.dimensions.height;
      target.takeRealDamage(damage);
  } else if (this.dimensions.height < target.dimensions.height) {
    console.log(`${this.name} tries to stomp on ${target.name} but can't get a leg up!`);
  }
}

const ogre = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 9,
  },
  healthPoints: 20,
  name: 'Rek',
  epithet: 'the Ogre',
  team: 'Bad Guy',
  weapons: [
    'Giant Club',
  ],
  language: 'Black Speech',
});

const halfling = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Smalls',
    epithet: 'the Halfling',
    team: 'Good Guy',
    weapons: [
      'Dagger',
    ],
    language: 'Common',
  });

const herodragon = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 20,
      width: 10,
      height: 20,
    },
    healthPoints: 30,
    name: 'Auros',
    epithet: 'the Golden Dragon',
    team: 'Good Guy',
    weapons: [
      'Fangs',
      'Claws'
    ],
    language: 'Dragon',
  });

// debug testing to determine that I needed to refer to object.dimensions.height to make Stomp work;
// console.log(halfling.height);
// console.log(halfling.dimensions.height);
ogre.arrive();
halfling.arrive();
halfling.stab(ogre);
ogre.stomp(halfling);
herodragon.arrive();
ogre.stomp(herodragon);

// current output from node prototypes.js
// Rek the Ogre strides into the arena!
// Smalls the Halfling strides into the arena!
// Smalls stabs Rek!
// Rek took damage. 19 health points remaining.
// Rek stomps on Smalls!
// Smalls takes fatal damage!
// Smalls was removed from the game.
// Auros the Golden Dragon strides into the arena!
// Rek tries to stomp on Auros but can't get a leg up!
