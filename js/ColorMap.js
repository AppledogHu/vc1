/*
 * ColorMap.java
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
    static BLACK = 0;
    static black = 0;
    static RED = 1;
    static red = 0
    static GREEN = 2;
    static green = 2;
    static BLUE = 3;
    static blue = 3;
    static CYAN = 4;
    static cyan = 4;
    static MAGENTA = 5;
    static magenta = 5;
    static PURPLE = 5;
    static purple = 5
    static BROWN = 6;
    static brown = 6;
    static LIGHT_GRAY = 7;
    static lightgray = 7;
    static light_gray = 7;
    static LIGHT_GREY = 7;
    static lightgrey = 7;
    static light_grey = 7;
    static DARK_GRAY = 8;
    static darkgray = 8;
    static dark_gray = 8;
    static DARK_GREY = 8;
    static darkgrey = 8;
    static dark_grey = 8;
    static LIGHT_RED = 9;
    static lightred = 9;
    static light_red = 9;
    static LIGHT_GREEN = 10;
    static lightgreen = 10;
    static light_green = 10;
    static LIGHT_BLUE = 11;
    static lightblue = 11;
    static light_blue = 11;
    static LIGHT_CYAN = 12;
    static lightcyan = 12;
    static light_cyan = 12;
    static LIGHT_MAGENTA = 13;
    static lightmagenta = 13;
    static light_magenta = 13;
    static LIGHT_PURPLE = 13;
    static lightpurple = 13;
    static light_purple = 13;
    static YELLOW = 14;
    static yellow = 14;
    static WHITE = 15;
    static white = 15;
    static MAX_COLOR = 16;
    static max_color = 16;
    static maxcolor = 16;

    static GRAY = ColorMap.LIGHT_GRAY;
    static gray = ColorMap.LIGHT_GRAY;
    static GREY = ColorMap.LIGHT_GREY;
    static grey = ColorMap.LIGHT_GREY;
    static HI_DOMESTIC = ColorMap.WHITE;
    static HI_LORD = ColorMap.MAGENTA;
    static HI_ZAP = ColorMap.LIGHT_BLUE;
    static HI_GOLD = ColorMap.YELLOW;
    static HI_PAPER = ColorMap.WHITE;
    static HI_LEATHER = ColorMap.BROWN;
    static HI_WOOD = ColorMap.BROWN;
    static HI_METAL = ColorMap.LIGHT_GRAY;
    static DRAGON_SILVER = ColorMap.LIGHT_GRAY;
    static ORANGE = ColorMap.BROWN;
    static orange = ColorMap.BROWN;
    static BRIGHT_GREEN = ColorMap.LIGHT_GREEN;
    static bright_green = ColorMap.LIGHT_GREEN;
    static brightgreen = ColorMap.LIGHT_GREEN;
    static BRIGHT_BLUE = ColorMap.LIGHT_BLUE;
    static bright_blue = ColorMap.LIGHT_BLUE;
    static brightblue = ColorMap.LIGHT_BLUE;

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
        ColorMap.colormap[ColorMap.BLACK] = '#000000';
        ColorMap.colormap[ColorMap.RED] = '#aa0000';
        this.colormap[ColorMap.GREEN] = '#00aa00';
        this.colormap[ColorMap.BLUE] = '#0000aa';
        this.colormap[ColorMap.CYAN] = '#00aaaa';
        this.colormap[ColorMap.MAGENTA] = '#aa00aa';
        this.colormap[ColorMap.BROWN] = '#aa5500';
        this.colormap[ColorMap.LIGHT_GRAY] = '#aaaaaa';
        this.colormap[ColorMap.DARK_GRAY] = '#777777';
        this.colormap[ColorMap.LIGHT_RED] = '#ff5555';
        this.colormap[ColorMap.LIGHT_GREEN] = '#55ff55';
        this.colormap[ColorMap.LIGHT_BLUE] = '#5555ff';
        this.colormap[ColorMap.LIGHT_CYAN] = '#55ffff';
        this.colormap[ColorMap.LIGHT_MAGENTA] = '#ff55ff';
        this.colormap[ColorMap.YELLOW] = '#ffff55';
        this.colormap[ColorMap.WHITE] = '#ffffff';
    }



    static use_eterm() {
        this.colormap[ColorMap.BLACK] = '#000000';
        this.colormap[ColorMap.RED] = '#cc0000';
        this.colormap[ColorMap.GREEN] = '#00cc00';
        this.colormap[ColorMap.BLUE] = '#0000cc';
        this.colormap[ColorMap.CYAN] = '#00cccc';
        this.colormap[ColorMap.MAGENTA] = '#cc00cc';
        this.colormap[ColorMap.BROWN] = '#cccc00';
        this.colormap[ColorMap.LIGHT_GRAY] = '#faebd7';
        this.colormap[ColorMap.DARK_GRAY] = '#333333';
        this.colormap[ColorMap.LIGHT_RED] = '#ff0000';
        this.colormap[ColorMap.LIGHT_GREEN] = '#00ff00';
        this.colormap[ColorMap.LIGHT_BLUE] = '#0000ff';
        this.colormap[ColorMap.LIGHT_CYAN] = '#00ffff';
        this.colormap[ColorMap.LIGHT_MAGENTA] = '#ff00ff';
        this.colormap[ColorMap.YELLOW] = '#ffff00';
        this.colormap[ColorMap.WHITE] = '#ffffff';
    }

    static use_gnometerminal() {
        this.colormap[ColorMap.BLACK] = '#000000';
        this.colormap[ColorMap.RED] = '#aa0000';
        this.colormap[ColorMap.GREEN] = '#00aa00';
        this.colormap[ColorMap.BLUE] = '#0000aa';
        this.colormap[ColorMap.CYAN] = '#00aaaa';
        this.colormap[ColorMap.MAGENTA] = '#aa00aa';
        this.colormap[ColorMap.BROWN] = '#aa5500';
        this.colormap[ColorMap.LIGHT_GRAY] = '#aaaaaa';
        this.colormap[ColorMap.DARK_GRAY] = '#555555';
        this.colormap[ColorMap.LIGHT_RED] = '#ff5555';
        this.colormap[ColorMap.LIGHT_GREEN] = '#55ff55';
        this.colormap[ColorMap.LIGHT_BLUE] = '#5555ff';
        this.colormap[ColorMap.LIGHT_CYAN] = '#55ffff';
        this.colormap[ColorMap.LIGHT_MAGENTA] = '#ff55ff';
        this.colormap[ColorMap.YELLOW] = '#ffff55';
        this.colormap[ColorMap.WHITE] = '#ffffff';
    }

    static use_ANSI() {
        this.colormap[ColorMap.BLACK] = '#000000';
        this.colormap[ColorMap.RED] = '#aa0000';
        this.colormap[ColorMap.GREEN] = '#00aa00';
        this.colormap[ColorMap.BLUE] = '#0000aa';
        this.colormap[ColorMap.CYAN] = '#00aaaa';
        this.colormap[ColorMap.MAGENTA] = '#aa00aa';
        this.colormap[ColorMap.BROWN] = '#aaaa00';
        this.colormap[ColorMap.LIGHT_GRAY] = '#aaaaaa';
        this.colormap[ColorMap.DARK_GRAY] = '#444444';
        this.colormap[ColorMap.LIGHT_RED] = '#ff4444';
        this.colormap[ColorMap.LIGHT_GREEN] = '#44ff44';
        this.colormap[ColorMap.LIGHT_BLUE] = '#4444ff';
        this.colormap[ColorMap.LIGHT_CYAN] = '#44ffff';
        this.colormap[ColorMap.LIGHT_MAGENTA] = '#ff44ff';
        this.colormap[ColorMap.YELLOW] = '#ffff44';
        this.colormap[ColorMap.WHITE] = '#ffffff';
    }


    static get(x) {
        return this.colormap[x];
    }

    // Extra colors
    static P1_Green_528nm = '#41FF00';
    static P3_Amber_600nm = '#FFB000';
    static P3_LightAmber_593nm = '#FFCC00';
    static Green1_524nm = '#33FF00';
    static P1_AppleII = '#33FF33'; // Probably close to 520nm based on Green1.
    static Green2_506nm = '#00FF33';
    static P24_AppleIIc = '#66FF66'; // P24 green is 505nm
    static Green3_502nm = '#00FF66';
    static VTBlack = '#282828';
    static OldAmber = '#BA8200';
    static ibm3270_green1 = '#00FF00'; // look and feel approximation
    static ibm3270_green2 = '#003300'; // look and feel approximation
    static ibm3270_green2d1 = '#002200'; // look and feel approximation
    static ibm3270_green2d2 = '#001100'; // look and feel approximation
    static ibm3270_amber1 = '#FFCC00'; // look and feel approximation
    static ibm3270_amber2 = '#663300'; // look and feel approximation
    static ibm3270_amber1d3 = '#E1AE00'; // look and feel approximation
    static ibm3270_amber1d4 = '#D7A400'; // look and feel approximation
    static ibm3270_amber1d5 = '#CD9A00'; // look and feel approximation
    static ibm3270_amber2d2 = '#521F00'; // look and feel approximation
    static ibm3270_amber2d3 = '#481500'; // look and feel approximation
    static ibm3270_amber2d4 = '#3E0B00'; // look and feel approximation
    static ibm3270_amber2d5 = '#340100'; // look and feel approximation
    static ibm3270_amber2d6 = '#2A0000'; // look and feel approximation
    static ibm3270_amber2d7 = '#200000'; // look and feel approximation
    static p70amber1 = '#FF4500'; // deep amber
    static p70amber2 = '#FFA500'; // warm amber
    static p70amber3 = '#FFD700'; // golden orange
}

ColorMap.use_VGA();