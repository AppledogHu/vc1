//
// JavaScript Terminal v3.0
// (Technical Demo Mode)
// Copyright (C) 2023 Appledog
// NetWhack is Copyright (C) 1997, 2007, 2017, 2023 Appledog
// 25th anniversary JavaScript version is Copyright (C) 2023 Appledog
// main.js
// starting point, i.e. main()
//

// Set up Canvas and get ctx (context) for drawing.
let canvas = document.getElementById('fsc');
let ctx = canvas.getContext('2d');

// Set up Terminal
var maxtrows = 10
var maxtcols = 10
var terminal = new Terminal(10, 10)

// Terminal Control
terminal.echo = true;       // this is on by default but I am putting it here anyways.
terminal.cc;                // Cursor control (true/false for on/off)
terminal.inputmode = false; // In input mode, we simulate an input() command but will lose context.
var terminalmode = true;    // if the terminal should capture certain commands when you press enter.
var touchmode = false;      // in touch mode, cursor is moved by mouse.

// Program control
var runmode = false;        // this begins 'programming queue' execution.

// load font
var fontLoader = new FontLoader('myvga', 'PxPlus_IBM_VGA_9x16.ttf');

// Put up a cute message.
var totalhits = ' ';
function system_message() {
    terminal.clearline(0);
    terminal.clearline(1);
    terminal.clearline(2);
    terminal.clearline(3);
    terminal.clearline(4);
    terminal.clearline(5);

    msgline1 = "**** JavaScript Terminal Demo v2.0 ****";
    msgline2 = maxTcols + "x" + maxTrows + " " + ctx.font;

    msgline3 = 'You are visitor number ' + totalhits + '.';
    msgline4 = 'READY.';
    terminal.cx = Math.max(0, Math.floor((terminal.cols - msgline1.length) / 2));
    terminal.cy = 0;
    terminal.puts(msgline1);

    terminal.cx = Math.max(0,Math.floor((terminal.cols - msgline2.length) / 2));
    terminal.cy = 1;
    terminal.puts(msgline2);

    terminal.cx = 0;
    terminal.cy = 3;
    terminal.puts(msgline3);

    terminal.cx = 0;
    terminal.cy = 5;
    terminal.puts(msgline4);

    terminal.cx = 0;
    terminal.cy = 6;
}

// Function to resize and recreate the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    maxTcols = Math.floor(canvas.width / terminal.charWidth)
    maxTrows = Math.floor(canvas.height / terminal.charHeight);

    t = new Terminal(maxTcols, maxTrows);
    terminal.copyContentTo(t);
    terminal = t;

    ctx.font = '32px myvga'; // this seems to be needed here.

    //console.log("Terminal Resize Event")
    //console.log("Available Pixel Dimensions: " + canvas.width + "x" + canvas.height);
    //console.log("Calculating Maximum Terminal Size: " + maxTcols + "x" + maxTrows);
    //console.log("Actual Pixel Dimensions: " + maxTcols * terminal.charWidth + "x" + maxTrows * terminal.charHeight);

    system_message();
}

// Resize and recreate the canvas
window.addEventListener('resize', resizeCanvas);


// Attach the click event listener to the canvas
canvas.addEventListener('click', function (event) {
    event_queue.push("CLICK " + event.clientX + " " + event.clientY)
    console.log(event);

    // do not process clicks unless we're in touch mode.
    if (touchmode == false) {
        return;
    }

    // Get the mouse coordinates relative to the canvas
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;


    // Calculate Canvas Areas
    // 1. Left Side
    leftx = canvas.width * 0.363380227632; // * (1 - (2/pi)) makes the center a bit smaller than /3.
    rightx = canvas.width - leftx;
    topy = canvas.height * 0.363380227632;
    bottomy = canvas.height - topy;

    // Check if the click is within a specific region (e.g., a rectangle)
    if (x <= leftx) {
        if (y <= topy) {
            //console.log("top left")
            terminal.arrowleft();
            terminal.arrowup();
        }
        if (y >= bottomy) {
            //console.log("bottom left");
            terminal.arrowleft();
            terminal.arrowdown();
        }
        if ((y < bottomy) && (y > topy)) {
            //console.log("middle left");
            terminal.arrowleft();
        }
    }

    if (x >= rightx) {
        if (y <= topy) {
            //  console.log("top right")
            terminal.arrowright();
            terminal.arrowup();
        }
        if (y >= bottomy) {
            //console.log("bottom right");
            terminal.arrowright();
            terminal.arrowdown();
        }
        if ((y < bottomy) && (y > topy)) {
            //console.log("middle right");
            terminal.arrowright();
        }
    }

    if ((x > leftx) && (x < rightx)) {
        if (y <= topy) {
            //console.log("top middle")
            terminal.arrowup();
        }
        if (y >= bottomy) {
            //console.log("bottom middle");
            terminal.arrowdown();
        }
        if ((y < bottomy) && (y > topy)) {
            //console.log("middle middle");
            let mx = getRandomInt(0, terminal.cols - 1);
            let my = getRandomInt(0, terminal.rows - 1);
            let mch = getRandomLetter();
            let mcolor = Color.getColor(getRandomInt(0, 15));
            let mbackground = Color.black;
            terminal.setch(mx, my, mch, mcolor, mbackground);
        }
    }

});

// Keyboard listener
document.addEventListener('keydown', function (event) {
    // log all io to the construct.
    event_queue.push("KEY " + event.key);
});


var event_queue = [];
// Update began to only call check_events(), so, here we are.
// was: check_events()
function update() {
    // While there are events to process,
    while (event_queue.length > 0) {
        let cmd = event_queue.shift();
        let para = cmd;

        if (cmd.indexOf(' ') > 0) {
            // contains internal spaces, determine parameters.
            para = cmd.substring(cmd.indexOf(' ') + 1);
            cmd = cmd.substring(0, cmd.indexOf(' '));
        }

        if (cmd.length == 0) {
            return;
        }

        cmd = cmd.toUpperCase().trim();

        // Now, cmd is the event/command and para contains any parameters to it.
        switch (cmd) {
            case 'KEY':
                console.log("KEY event: [" + para + "]");
                terminal.type(para);    // type to terminal.
                break;
            default:
                console.log("unknown event: " + cmd + " " + para);
                break;
        } // switch
    } // while has events
} // check_events

// All we really need to do is draw the terminal.
// What is on the terminal is done using (ex.) Terminal.setch()
function render() {
    // clear screen
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw characters on terminal
    terminal.draw(ctx);
}

function gameLoop(timestamp) {
    // Update game logic here
    update()

    // Render the game state
    render();

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Initial canvas setup
resizeCanvas();

// Test procedure
//test_screen(terminal);

terminal.cc = true;

// Wait for the font to load before starting the update/render loop.
let waitTimerId; // Variable to store the interval identifier
let loading_div;

function waitForFonts() {

    waitTimerId = setInterval(() => {
        // Check the condition (replace this with your actual condition)
        if (fontLoader.loaded) {
            // Clear the interval
            clearInterval(waitTimerId);

            // Start Game Loop
            gameLoop();
        }
    }, 100); // Set the interval time in milliseconds (e.g., 1000 ms = 1 second)
}

waitForFonts()

async function fetchData() {
    const phpScriptURL = 'php/hitcounter.php?key=jttd3';

    try {
        const response = await fetch(phpScriptURL);
        const data = await response.json();

        console.log(data);

        // You can now use ex. json.totalHits and json.userHits
        totalhits = data.totalHits;
        system_message();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the asynchronous function
fetchData();
