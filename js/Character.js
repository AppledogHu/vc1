// VC-1 Computer System
// Copyright (C) 2023 Appledog Hu
//
// SPDX-License-Identifier: GPL-2.0-only WITH VC-1-runtime-exception
// See LICENSE file for details.
//

class Character {
  static fg = Color.lightgray;
  static bg = Color.black;

  constructor(ch = ' ', color = this.fg, background = this.bg) {
    this.ch = ch;
    this.color = color;
    this.background = background;
  }
}
