// VC-1 Computer System
// Copyright (C) 2023 Appledog Hu
//
// SPDX-License-Identifier: GPL-2.0-only WITH VC-1-runtime-exception
// See LICENSE file for details.
//

/*
 * ColorMap.java
 * (C) 2005 Oliver Richman
 *
 * reCreated on December 26, 2005, 9:40 PM
 *
// Color defenitions.
// Can help look up RGB colors by IBM Graphics color number :)
*
* rebuilt from 064 source and 072 class file 2019-05-28
*
*/

class ColorMap {
    static colormap = new Array(16);

    constructor() {
        ColorMap.use_default();
    }

    static use_default() {
        ColorMap.use_VGA();
    }

    // The following is an approximation of IBM PC VGA colors.
    // I had this table a long time ago and ChatGPT repeated it to me in 2023.
    static use_VGA() {
        this.colormap[Color.BLACK] = '#000000';
        this.colormap[Color.RED] = '#aa0000';
        this.colormap[Color.GREEN] = '#00aa00';
        this.colormap[Color.BLUE] = '#0000aa';
        this.colormap[Color.CYAN] = '#00aaaa';
        this.colormap[Color.MAGENTA] = '#aa00aa';
        this.colormap[Color.BROWN] = '#aa5500';
        this.colormap[Color.LIGHT_GRAY] = '#aaaaaa';
        this.colormap[Color.DARK_GRAY] = '#777777';
        this.colormap[Color.LIGHT_RED] = '#ff5555';
        this.colormap[Color.LIGHT_GREEN] = '#55ff55';
        this.colormap[Color.LIGHT_BLUE] = '#5555ff';
        this.colormap[Color.LIGHT_CYAN] = '#55ffff';
        this.colormap[Color.LIGHT_MAGENTA] = '#ff55ff';
        this.colormap[Color.YELLOW] = '#ffff55';
        this.colormap[Color.WHITE] = '#ffffff';
    }



    static use_eterm() {
        this.colormap[Color.BLACK] = '#000000';
        this.colormap[Color.RED] = '#cc0000';
        this.colormap[Color.GREEN] = '#00cc00';
        this.colormap[Color.BLUE] = '#0000cc';
        this.colormap[Color.CYAN] = '#00cccc';
        this.colormap[Color.MAGENTA] = '#cc00cc';
        this.colormap[Color.BROWN] = '#cccc00';
        this.colormap[Color.LIGHT_GRAY] = '#faebd7';
        this.colormap[Color.DARK_GRAY] = '#333333';
        this.colormap[Color.LIGHT_RED] = '#ff0000';
        this.colormap[Color.LIGHT_GREEN] = '#00ff00';
        this.colormap[Color.LIGHT_BLUE] = '#0000ff';
        this.colormap[Color.LIGHT_CYAN] = '#00ffff';
        this.colormap[Color.LIGHT_MAGENTA] = '#ff00ff';
        this.colormap[Color.YELLOW] = '#ffff00';
        this.colormap[Color.WHITE] = '#ffffff';
    }

    static use_gnometerminal() {
        this.colormap[Color.BLACK] = '#000000';
        this.colormap[Color.RED] = '#aa0000';
        this.colormap[Color.GREEN] = '#00aa00';
        this.colormap[Color.BLUE] = '#0000aa';
        this.colormap[Color.CYAN] = '#00aaaa';
        this.colormap[Color.MAGENTA] = '#aa00aa';
        this.colormap[Color.BROWN] = '#aa5500';
        this.colormap[Color.LIGHT_GRAY] = '#aaaaaa';
        this.colormap[Color.DARK_GRAY] = '#555555';
        this.colormap[Color.LIGHT_RED] = '#ff5555';
        this.colormap[Color.LIGHT_GREEN] = '#55ff55';
        this.colormap[Color.LIGHT_BLUE] = '#5555ff';
        this.colormap[Color.LIGHT_CYAN] = '#55ffff';
        this.colormap[Color.LIGHT_MAGENTA] = '#ff55ff';
        this.colormap[Color.YELLOW] = '#ffff55';
        this.colormap[Color.WHITE] = '#ffffff';
    }

    static use_ANSI() {
        this.colormap[Color.BLACK] = '#000000';
        this.colormap[Color.RED] = '#aa0000';
        this.colormap[Color.GREEN] = '#00aa00';
        this.colormap[Color.BLUE] = '#0000aa';
        this.colormap[Color.CYAN] = '#00aaaa';
        this.colormap[Color.MAGENTA] = '#aa00aa';
        this.colormap[Color.BROWN] = '#aaaa00';
        this.colormap[Color.LIGHT_GRAY] = '#aaaaaa';
        this.colormap[Color.DARK_GRAY] = '#444444';
        this.colormap[Color.LIGHT_RED] = '#ff4444';
        this.colormap[Color.LIGHT_GREEN] = '#44ff44';
        this.colormap[Color.LIGHT_BLUE] = '#4444ff';
        this.colormap[Color.LIGHT_CYAN] = '#44ffff';
        this.colormap[Color.LIGHT_MAGENTA] = '#ff44ff';
        this.colormap[Color.YELLOW] = '#ffff44';
        this.colormap[Color.WHITE] = '#ffffff';
    }

    static get(x) {
        return this.colormap[x];
    }

}

// Initialize with VGA palette
ColorMap.use_VGA();