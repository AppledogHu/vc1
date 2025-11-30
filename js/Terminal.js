class Terminal {
    constructor(cols, rows) {
        this.charWidth = 18;
        this.charHeight = 32;
        this.cols = cols;
        this.rows = rows;
        this.theme = 'P70';
        this.color = ColorMap.p70amber2;
        this.background = ColorMap.ibm3270_amber2d7;

        // input() echo
        this.input_mode = false;
        this.input_echo = true;

        // Cursor metrics
        this.cx = 0;
        this.cy = 0;
        this.interval = 535; // 535ms
        this.cc = false;
        this.cursor = true;
        this.timerId = false;
        this.startCursorTimer();

        // the program
        this.program = []


        this.buf = new Array(rows);
        for (let y = 0; y < rows; y++) {
            this.buf[y] = new Array(cols);
            for (let x = 0; x < cols; x++) {
                this.buf[y][x] = new Character(' ', this.color, this.background);
            }
        }

        this.calcFontMetrics()
        this.setTheme(this.theme, this.color, this.background)
    }

    calcFontMetrics() {
        // Measure the width of a single character (assuming monospaced font)
        const measureTextResult = ctx.measureText('@');
        //console.log(measureTextResult);

        // Calculate the baseline offset
        // If there is a problem, adjust by hand.
        // PxPlus_IBM_VGA_9x16 seems to work well at 24...
        this.font_yadj = Math.round(32 - measureTextResult.fontBoundingBoxAscent) + 1;
        this.font_yadj = 24
        //console.log("Calculating font Y adjust: " + this.font_yadj);
    }

    // Function to schedule the timer to repeat
    startCursorTimer() {
        if (this.timerId == false) {
            this.timerId = setInterval(() => {
                this.cc = !this.cc;
                //console.log(`Cursor state: ${this.cc ? 'On' : 'Off'}`);
            }, this.interval);
        }
    }

    stopCursorTimer() {
        // Stopping the timer
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null; // Optional: Set to null to indicate that the timer is not active
        }
    }

    setch(x, y, ch, color = this.color, background = this.background) {
        this.buf[y][x].ch = ch;
        this.buf[y][x].color = color;
        this.buf[y][x].background = background;
    }

//    setColor(c) {
//        this.color = c
//    }

//    setBkg(b) {
//        this.background = background
//    }

    type(key) {
        if (key.length == 1) {
            if (this.input_mode) {
                // input mode! Put this character in the input string!
                this.input_str += key;
            }

            if ((!this.input_mode) || (this.input_echo)) {
                // Put if it's not input mode,
                // or if we are in input mode but echo is on.
                this.putch(key);
            }

            return;
        }

        // It's nonstandard.
        if (key.length < 1) {
            return;
        }

        // control the terminal according to special keys
        this.terminal_control(key);
    }

    // These are the control keys as interpreted by the terminal emulator
    // in pure immediate mode (terminal emulation mode).
    terminal_control(key) {
        // Enter is special, since we may have to process 'immediate mode' commands.
        if (key == "Enter") {
            this.terminal_control_enter();
            return;
        }

        if (key === "Backspace") {
            if (this.input_mode) {
                if (this.input_str.length <= 0) {
                    // don't do anything.
                    return;
                }
            }
            this.arrowleft_jump();
            this.delete();
            if (this.input_mode) {
                // cut the last position off the string.
                this.input_str = this.input_str.substring(0, this.input_str.length - 1);
            }

            return;
        }

        if (key === "Delete") {
            if (this.input_mode) {
                return; // turned off
            }
            this.delete();
            return;
        }

        if (key === "ArrowLeft") {
            if (this.input_mode) {
                return; // turned off
            }
            this.arrowleft();
            return;
        }

        if (key === "ArrowRight") {
            if (this.input_mode) {
                return; // turned off
            }
            this.arrowright();
            return;
        }

        // The following is only used in terminal mode.
        if (key === "ArrowUp") {
            if (this.input_mode) {
                return; // turned off
            }
            this.cy = this.cy - 1;
            if (this.cy < 0) {
                this.cy = 0;
            }
            return;
        }

        if (key === "ArrowDown") {
            if (this.input_mode) {
                return; // turned off
            }
            this.cy = this.cy + 1;
            if (this.cy >= this.rows) {
                this.cy = this.rows - 1;
            }
        }
        return;
    }

    // Anything on the line when you press enter goes to here.
    // I.E. commands like HELP.
    terminal_control_enter() {
        // If we are in input mode, we send the input() command to the event queue.
        // This input_str was specially constructed elsewhere so we ignore s.
        if (this.inputmode) {
            let a = this.input_command + " " + this.input_str;
            console.log("input: " + a);
            event_queue.push(a);
            this.input_mode = false; // that's it!
            return;
        }

        // Not in input mode.
        // First we build s, which is the command they typed.
        // We will take the entire line they are on and send it.
        let s = "";
        for (let i = 0; i < this.cols; i++) {
            let c = this.buf[this.cy][i].ch;
            s = s + c;
        }

        // Display the enter before we process anything.
        this.cr();
        this.lf();


        // clean up s for processing.
        s = s.trim();
        s = s.toLowerCase();

        if (s === 'input') {
            this.input("INPUT_TEST", "Input Test? ");
            return;
        }

        if (s === 'help') {
            this.puts("This is a technical demo of a terminal emulator in JavaScript.");
            this.cr();
            this.lf();
            this.puts("Help Commands: DATE, HELP, VERSION, WEBSITE");
            this.cr();
            this.lf();
            this.puts("Color Commands: NOTHEME, THEME, P1, P3, P3D, P70, VGA");
            this.cr();
            this.lf();
            this.puts("System Commands: EXIT HALT QUIT RUN LIST RENUMBER");
            this.cr();
            this.lf();
            this.puts("Demo Commands: INPUT");
            this.cr();
            this.lf();
            this.puts("Pressing ENTER on a line will enter that line as a console command.");
            this.cr();
            this.lf();
            this.puts("Press ESC to exit terminal mode and begin command processing.");
            this.cr();
            this.lf();
            this.puts("Press ESC again to return to terminal mode.");
            this.cr();
            this.lf();
            return;
        }

        if (s === 'version') {
            this.puts("JavaScript Terminal Technical Demo version 3.0");
            this.cr();
            this.lf();
            return;
        }

        if (s === 'date') {
            this.puts("Version 2.0, November 21st, 2023");
            this.cr();
            this.lf();
            return;
        }

        if (s === 'website') {
            this.puts("https://www.helloneo.ca/wiki/doku.php?id=javascript_terminal_v2");
            this.cr();
            this.lf();
            this.puts("helloneo.ca --> Wiki --> JavaScript Season 2");
            this.cr();
            this.lf();
        }

        if (s === 'theme') {
            this.puts("Current theme is " + this.theme + ": " + this.color + ", " + this.background + ".");
            this.cr();
            this.lf();
            return;
        }

        if (s === 'p1') {
            console.log("changing theme to p1");
            this.setTheme('p1', ColorMap.ibm3270_green1, ColorMap.ibm3270_green2);
            return;
        }

        if (s === 'p3') {
            console.log("changing theme to p3");
            this.setTheme('p3', ColorMap.ibm3270_amber1, ColorMap.ibm3270_amber2);
            return;
        }

        if (s === 'p70') {
            console.log("changing theme to IBM P70 Portable");
            this.setTheme('P70', ColorMap.p70amber2, ColorMap.ibm3270_amber2d7);
            return;
        }


        if ((s === 'p3d') || (s === 'p3dark') || (s === 'p3-dark')) {
            console.log("changing theme to p3-dark");
            this.setTheme('p3', ColorMap.ibm3270_amber1d4, ColorMap.ibm3270_amber2d7);
            return;
        }

        if (s === 'vga') {
            console.log("changing theme to VGA");
            this.setTheme('vga', ColorMap.lightgray, ColorMap.black);
            return;
        }

        if (s === 'notheme') {
            console.log("changing theme to none");
            this.setTheme('', ColorMap.lightgray, ColorMap.black);
            return;
        }

        if (s === 'list') {
            for (var n in this.program) {
                this.puts(n + " " + this.program[n]);
                this.cr();
                this.lf();
            }
            return;
        }

        // NOTE: This is incorrect.
        // We can't do it this way. We need to make a state machine.
        // This is just an example of how it would work.
        if (s === 'run') {
            var b = new BASIC();
            b.terminal = this;
            b.run(this.program);
            return;
        }

        // Is it a line number?
        var l = this.separateDigitsAndCode(s);
        console.log(l);
        if (l.num > 0) {
            l.line = l.line.trim();
            console.log("Line number detected... " + l.num);
            console.log("program command: [" + l.line + "]");
            //event_queue.push("BASIC " + s);
            this.program[l.num] = l.line;
            return;
        }

        // unknown commands get added as event-commands by default.
        console.log('Pressed Enter on line ' + this.cy + ', found: "' + s + '".');
        console.log("adding event-command 'ENTER " + s + "'");
        event_queue.push("ENTER " + s);
        return;

    }

    // Input
    // This is a big one. We use a separate mode within the terminal/immediate mode.
    input(event_command, s) {
        this.input_str = "";
        this.input_mode = true;
        this.input_command = event_command;
        this.input_cx = this.cx;
        this.input_cy = this.cy;
        this.puts(s);
        // When input_mode is set to true, go see what happens in type()!
    }

    putch(ch, color = this.color, background = this.background) {
        this.cxcyok();

        this.buf[this.cy][this.cx].ch = ch;
        this.buf[this.cy][this.cx].color = color;
        this.buf[this.cy][this.cx].background = background;

        if (this.arrowright()) {
            this.cr();
            this.lf();
        }
    }

    puts(s, delay = true) {
        if (delay) {
            this.delayMin = 150; // minimum delay in milliseconds
            this.delayMax = 350; // maximum delay in milliseconds
        }

        for (let i = 0; i < s.length; i++) {
            let c = s.charAt(i);
            if (delay) {
                const dtime = this.delayMin + Math.floor(Math.random() * (this.delayMax - this.delayMin + 1));
                setTimeout(() => {
                }, dtime);
            }
            this.putch(c);
        }
    }


    putsxy(s, x, y) {
        this.cxcyok();
        this.cx = x;
        this.cy = y;
        this.puts(s);
    }

    // ensure bounds.
    cxcyok() {
        if (this.cx < 0) {
            this.cx = 0;
        }
        if (this.cx >= this.cols) {
            this.cx = this.cols - 1;
        }
        if (this.cy < 0) {
            this.cy = 0;
        }
        if (this.cy >= this.rows) {
            this.cy = this.rows - 1;
        }
    }

    delete() {
        if (this.cx >= this.cols) {
            return;
        }

        for (let i = this.cx; i < this.cols; i++) {
            // copy next into here;
            if ((i + 1) < this.cols) {
                this.buf[this.cy][i].ch = this.buf[this.cy][i + 1].ch;
                this.buf[this.cy][i].color = this.buf[this.cy][i + 1].color;
                this.buf[this.cy][i].background = this.buf[this.cy][i + 1].background;
                this.buf[this.cy][i + 1].ch = ' ';
                this.buf[this.cy][i + 1].color = this.color;
                this.buf[this.cy][i + 1].background = this.background;
            }
        }
    }

    backspace() {
        this.putch("Backspace");
    }

    arrowleft_jump() {
        var skip = this.arrowleft();

        while (skip) {
            if (this.buf[this.cy][this.cx].ch == ' ') {
                this.cx = this.cx - 1;
                if (this.cx < 0) {
                    this.cx = 0;
                    skip = false;
                }
            } else {
                skip = false;
                this.cx = this.cx + 1;
            }

        }
    }

    arrowleft() {
        this.cx = this.cx - 1;
        if (this.cx < 0) {
            this.cx = 0;
            if (this.cy > 0) {
                this.cy = this.cy - 1;
                this.cx = this.cols - 1;
                return true; // y - 1. signal true for arrowleft_jump() to skip spaces.
            }
        }
        return false; // didn't go up
    }

    arrowright() {
        this.cx = this.cx + 1;
        if (this.cx >= this.cols) {
            this.cx = 0;

            this.cy = this.cy + 1;
            if (this.cy >= this.rows) {
                this.cy = this.rows - 1;
                return true; // signal that a cr/lf is needed to 'go down'.
            } else {
                return false; // signal we handled the arrow in-terminal.
            }
        }
    }

    arrowup() {
        this.cy = this.cy - 1;
        if (this.cy < 0) {
            this.cy = 0
        }
    }

    arrowdown() {
        this.cy = this.cy + 1;
        if (this.cy >= this.rows) {
            this.cy = this.rows - 1;
        }
        // arrow downs on the bottom do nothing (they don't cause a lf).
    }

    cr() {
        this.cx = 0;
    }

    lf() {
        this.cy = this.cy + 1;
        if (this.cy >= this.rows) {
            this.cy = this.rows - 1;
            this.hard_lf()
        }
    }

    hard_lf() {
        for (let y = 1; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.buf[y - 1][x].ch = this.buf[y][x].ch;
                this.buf[y - 1][x].color = this.buf[y][x].color;
                this.buf[y - 1][x].background = this.buf[y][x].background;
            }

        }

        for (let x = 0; x < this.cols; x++) {
            this.buf[this.rows - 1][x].ch = ' ';
            this.buf[this.rows - 1][x].color = this.color;
            this.buf[this.rows - 1][x].background = this.background;
        }
        this.cx = 0;
        this.cy = this.rows - 1;
    }

    clearline(y) {
        if ((y < 0) || (y >= this.rows)) {
            console.log("invalid y in clearline(y), aborting.");
            return;
        }

        for (let x = 0; x < this.cols; x++) {
            this.buf[y][x].ch = ' ';
            this.buf[y][x].color = this.color;
            this.buf[y][x].background = this.background;
        }
    }

    drawCharacter(ctx, x, y, ch, color = this.color, background = this.background) {
        // It looks like we have to do this because of various factors.
        ctx.font = '32px myvga';

        // Calculate the actual position on the canvas based on character width and height
        const xPos = x * this.charWidth;
        const yPos = (y * this.charHeight);


        // Set the background
        ctx.fillStyle = background;
        ctx.fillRect(xPos, yPos, this.charWidth, this.charHeight);

        // Draw the character on the canvas
        ctx.fillStyle = color;
        ctx.fillText(ch, xPos, yPos + this.font_yadj);

    }

    draw(ctx) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                // Get the character and color from the buf array
                const ch = this.buf[y][x].ch;
                const fg = this.buf[y][x].color;
                const bg = this.buf[y][x].background;
                this.drawCharacter(ctx, x, y, ch, fg, bg);
            }
        }

        // draw the cursor
        if (this.cursor && this.cc) {
            const xPos = this.cx * this.charWidth;
            const yPos = (this.cy * this.charHeight);
            ctx.fillStyle = this.color;
            ctx.fillText("\u005F", xPos, yPos + this.font_yadj);
        }
    }

    copyContentTo(newTerminal) {
        // Determine the number of rows and columns to copy
        const rowsToCopy = Math.min(this.rows, newTerminal.rows);
        const colsToCopy = Math.min(this.cols, newTerminal.cols);

        // Copy content from the old terminal to the new terminal
        for (let y = 0; y < rowsToCopy; y++) {
            for (let x = 0; x < colsToCopy; x++) {
                const nch = this.buf[y][x].ch;
                const ncolor = this.buf[y][x].color;
                const nbackground = this.buf[y][x].background;

                newTerminal.setch(x, y, nch, ncolor, nbackground);
            }
        }

        // Copy vital data
        newTerminal.cx = this.cx
        newTerminal.cy = this.cy
        newTerminal.cc = this.cc
        newTerminal.font_baseline = this.font_baseline;
        newTerminal.color = this.color
        newTerminal.background = this.background;
        newTerminal.theme = this.theme;
        newTerminal.setTheme(this.theme, this.color, this.background);

        if (this.timerId) {
            this.stopCursorTimer()
            newTerminal.startCursorTimer()
        }

    }

    setTheme(name, fg, bg) {
        this.theme = name;
        this.color = fg;
        this.background = bg;

        if (name.length == 0) {
            return;
        }

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.buf[y][x].color = fg;
                this.buf[y][x].background = bg;
            }

        }
    }

    separateDigitsAndCode(inputString) {
        // Initialize variables
        var line_no = "";
        var line = ""

        var q = true;

        // Iterate through each character in the input string
        for (var i = 0; i < inputString.length; i++) {
            var currentChar = inputString.charAt(i);

            // Check if the character is a digit
            if (q && (/\d/.test(currentChar))) {
                // If it's a digit, append it to line_no
                line_no += currentChar;
            } else {
                q = false;
                // If the first non-digit is encountered, copy the rest into line
                line = inputString.slice(i);
                break;
            }
        }

        // Return the result
        return { num: line_no, line: line };
    }

}