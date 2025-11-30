//
// OS.js
// Copyright (C) 2023 Appledog
//
// Process terminal mode / shell commands like HELP.
// So it's more like a shell on top of an OS, but not a shell, more old-school.
//
// Process commands sent from Terminal, when in terminal mode.
// The intent is that if the commands are sent to here they will be processed.
// We are not responsible for checking 'terminal mode', that is done by the sender.
//

class OS {
    var terminal = 0;

    // Parse a command string, ex "HELP".
    parse(s) {
        if (s === 'input') {
            terminal.input("INPUT_TEST", "Input Test? ");
            return;
        }

        if (s === 'help') {
            terminal.puts("This is a technical demo of a terminal emulator in JavaScript.");
            terminal.cr();
            terminal.lf();
            terminal.puts("Help Commands: DATE, HELP, VERSION, WEBSITE");
            terminal.cr();
            terminal.lf();
            terminal.puts("Color Commands: NOTHEME, THEME, P1, P3, P3D, P70, VGA");
            terminal.cr();
            terminal.lf();
            terminal.puts("System Commands: EXIT HALT QUIT RUN LIST RENUMBER");
            terminal.cr();
            terminal.lf();
            terminal.puts("Demo Commands: INPUT");
            terminal.cr();
            terminal.lf();
            terminal.puts("Pressing ENTER on a line will enter that line as a console command.");
            terminal.cr();
            terminal.lf();
            terminal.puts("Press ESC to exit terminal mode and begin command processing.");
            terminal.cr();
            terminal.lf();
            terminal.puts("Press ESC again to return to terminal mode.");
            terminal.cr();
            terminal.lf();
            return;
        }

        if (s === 'version') {
            terminal.puts("JavaScript Terminal Technical Demo version 3.0");
            terminal.cr();
            terminal.lf();
            return;
        }

        if (s === 'date') {
            terminal.puts("Version 2.0, November 21st, 2023");
            terminal.cr();
            terminal.lf();
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
            this.setTheme('p1', Color.ibm3270_green1, Color.ibm3270_green2);
            return;
        }

        if (s === 'p3') {
            console.log("changing theme to p3");
            this.setTheme('p3', Color.ibm3270_amber1, Color.ibm3270_amber2);
            return;
        }

        if (s === 'p70') {
            console.log("changing theme to IBM P70 Portable");
            this.setTheme('P70', Color.p70amber2, Color.ibm3270_amber2d7);
            return;
        }


        if ((s === 'p3d') || (s === 'p3dark') || (s === 'p3-dark')) {
            console.log("changing theme to p3-dark");
            this.setTheme('p3', Color.ibm3270_amber1d4, Color.ibm3270_amber2d7);
            return;
        }


        if (s === 'vga') {
            console.log("changing theme to VGA");
            this.setTheme('vga', Color.lightgray, Color.black);
            return;
        }

        if (s === 'notheme') {
            console.log("changing theme to none");
            this.setTheme('', Color.lightgray, Color.black);
            return;
        }

        // Is it a line number?
        var l = this.separateDigitsAndCode(s);
        console.log(l);
        if (l.num > 0) {
            console.log("Line number detected... " + l.num);
            console.log("program command: [" + l.line.trim() + "]");
            event_queue.push("BASIC " + s);
            return;
        }

        // unknown commands get added as event-commands by default.
        console.log('Pressed Enter on line ' + this.cy + ', found: "' + s + '".');
        console.log("adding event-command 'ENTER " + s + "'");
        event_queue.push("ENTER " + s);
        return;

    }
}