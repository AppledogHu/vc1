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
 * Created (for the second time) on December 26, 2005, 9:40 PM
 *
// Color defenitions.
// Can help look up RGB colors by IBM Graphics color number :)
*
* rebuilt from 064 source and 072 class file 2019-05-28
*
*/

class Color {
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

    static GRAY = Color.LIGHT_GRAY;
    static gray = Color.LIGHT_GRAY;
    static GREY = Color.LIGHT_GREY;
    static grey = Color.LIGHT_GREY;
    static HI_DOMESTIC = Color.WHITE;
    static HI_LORD = Color.MAGENTA;
    static HI_ZAP = Color.LIGHT_BLUE;
    static HI_GOLD = Color.YELLOW;
    static HI_PAPER = Color.WHITE;
    static HI_LEATHER = Color.BROWN;
    static HI_WOOD = Color.BROWN;
    static HI_METAL = Color.LIGHT_GRAY;
    static DRAGON_SILVER = Color.LIGHT_GRAY;
    static ORANGE = Color.BROWN;
    static orange = Color.BROWN;
    static BRIGHT_GREEN = Color.LIGHT_GREEN;
    static bright_green = Color.LIGHT_GREEN;
    static brightgreen = Color.LIGHT_GREEN;
    static BRIGHT_BLUE = Color.LIGHT_BLUE;
    static bright_blue = Color.LIGHT_BLUE;
    static brightblue = Color.LIGHT_BLUE;

    // Extra colors // look and feel approximations
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