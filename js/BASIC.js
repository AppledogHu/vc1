// VC-1 Computer System
// Copyright (C) 2023 Appledog Hu
//
// SPDX-License-Identifier: GPL-2.0-only WITH VC-1-runtime-exception
// See LICENSE file for details.
//

//
// BASIC.js
// Copyright (C) 2023 Appledog
//
// Basic version zero.
// Note that this is totally wrong. We can't do this in a loop.
// We need to do it on a timer, because we have to let the rest of the program run.
// So we process one instruction every timer cycle,
// and re-set the timer to run the program at 10 to 100 lines per second, for example.
//
// The reason is because an endless loop leaves no time for the ui code to run and
// update the canvas.
//

class BASIC {
    // Parse a command string, ex "HELP".

    run(p) {
        this.program = p;

        let pc = 0; // program counter.

        // build a list of line numbers.
        let pca = [];
        for (var n in this.program) {
            pca[pc] = n;
            pc++
        }

        // set pc = 0 and start.
        pc = 0
        var runmode = true

        while (runmode) {
            // fetch
            var l = this.program[pca[pc]];

            // fetch
            var l = this.program[pca[pc]];

            // Check if line exists
            if (!l) {
                pc++;
                continue;
            }

            // parse
            let kw = l
            let para = "";


            if (kw.indexOf(' ') > 0) {
                // contains internal spaces, determine parameters.
                para = kw.substring(kw.indexOf(' ') + 1);
                kw = kw.substring(0, kw.indexOf(' '));
            }

            if (kw.length == 0) {
                console.log("BASIC parse error: [" + l + "]");
                return;
            }

            kw = kw.toUpperCase().trim();

            // Now, cmd is the event/command and para contains any parameters to it.
            switch (kw) {
                case 'PRINT':
                    this.terminal.puts(para);
                    console.log("printed: [" + para + "]"); // for demonstration only
                    this.terminal.cr();
                    this.terminal.lf();
                    break;
                case 'GOTO':
                    var found = false;
                    for (n in pca) {
                        console.log(n + " = " + pca[n]);
                        if (pca[n] == para) {
                            pc = n;
                            found = true;
                            console.log("jumping to line no. " + pca[n]); // for demo only
                        }
                    }
                    if (found == false) {
                        this.terminal.puts("ERROR in " + kw + " " + para);
                        runmode = false
                    }
                    continue;
                    break;
                default:
                    this.terminal.puts("ERROR " + kw);
                    runmode = false;
                    continue;
                    break;
            }

            // inc memory pointer.
            pc++;

            // check runmode
            if (pc >= pca.length) {
                runmode = false;
            }
            // loop will fetch at start using new pc.
        }
    }
}