/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. "This" is a pronoun. It refers to whatever it binds to, and tries to bind to the first thing it "sees". If called in the global environment, the first thing it sees is the Global Object (usually the Window) which it tries to bind to.
* 2. Fortunately, we can point "this" in various directions by placing it closer to wherever we want that impressionable little code snippet to imprint on, so if a method is called from an object, "this" refers "implicitly" to the object (pointing back to where it came). This is "implicit" binding.
* 3. A constructor function, as it creates an object, will push "this" inside the object being generated and therefore bind on it. This is true even if the constructor function calls a bunch of other objects to serve as the inheritance of that object. People call this "New" Binding because "this" binds on the new object.
* 4. We can use "call" and "apply" as ways to redirect "this" and its binding in the direction we want, invoking the method of the original object that we want to call or apply and then specifying the object we want to call or apply it to.
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
console.log(this);
// will return an object which is the Window on a browser console.

// Principle 2

// code example for Implicit Binding
const megaMan = {
  name: 'Rock',
  tool: 'Mega Buster',
  chargeup: function() {
      console.log(`${this.name} begins charging the ${this.tool}!`)
    }
  }

megaMan.chargeup();
  // Result: the "this" refers to


// Principle 3

// code example for New Binding
function RobotMaster(schtick,weapon) {
  this.schtick = schtick;
  this.weapon = weapon;
  this.name = `${schtick} Man`,
  this.tool = `${this.weapon} ${this.schtick}`
  this.arrive = () => {console.log(`${this.name} drops out of the ceiling!`)}
  this.die = function() {
      console.log(`You got ${this.tool}!`)
    }
  }

const cutMan = new RobotMaster('Cut','Rolling');
cutMan.arrive();
cutMan.die();


// Principle 4

// code example for Explicit Binding
cutMan.die.apply(megaMan);
cutMan.die.call(megaMan);
megaMan.chargeup.apply(cutMan);
megaMan.chargeup.call(cutMan);
