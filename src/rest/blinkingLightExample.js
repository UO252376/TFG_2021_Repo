
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
export default class BlinkLight {
    constructor() {
        this.LED = new Gpio(4, 'out');
        
        //this.blinkInterval = setInterval(this.blinkLed, 250);
        //setTimeout(this.endBlink, 5000); //stop blinking after 5 seconds
    }

    blinkLed()  { //function to start blinking
        if (this.LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
            this.LED.writeSync(1); //set pin state to 1 (turn LED on)
        } else {
            this.LED.writeSync(0); //set pin state to 0 (turn LED off)
        }
    }

    endBlink() { //function to stop blinking
        clearInterval(this.blinkInterval); // Stop blink intervals
        this.LED.writeSync(0); // Turn LED off
        this.LED.unexport(); // Unexport GPIO to free resources
    }

    switchLight() {
        if (this.LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
            this.LED.writeSync(1); //set pin state to 1 (turn LED on)
        } else {
            this.LED.writeSync(0); //set pin state to 0 (turn LED off)
        }
    }
}