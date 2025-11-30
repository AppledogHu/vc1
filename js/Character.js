
class Character {
  static fg = ColorMap.lightgray;
  static bg = ColorMap.black;

  constructor(ch = ' ', color = this.fg, background = this.bg) {
    this.ch = ch;
    this.color = color;
    this.background = background;
  }
}
