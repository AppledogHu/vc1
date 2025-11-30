class FontLoader {
    constructor(fontFamily, fontUrl) {
        this.fontFamily = fontFamily;
        this.fontUrl = fontUrl;
        this.loaded = false;
        this.metrics = null;

        this.loadFont();
    }

    loadFont() {
        const font = new FontFace(this.fontFamily, `url(${this.fontUrl})`);

        font.load().then(() => {
            document.fonts.add(font);
            this.loaded = true;
            this.metrics = this.getFontMetrics();
        });
    }

    getFontMetrics() {
        if (!this.loaded) {
            console.error('Font not loaded yet. Call this method after the font is loaded.');
            return null;
        }

        const div = document.createElement('div');
        div.style.fontFamily = this.fontFamily;
        div.style.visibility = 'hidden';
        div.style.position = 'absolute';
        div.style.fontSize = '1em'; // Set to a default font size

        document.body.appendChild(div);

        const metrics = {
            fontSize: parseFloat(getComputedStyle(div).fontSize),
            ascent: div.offsetHeight,
        };

        document.body.removeChild(div);

        return metrics;
    }
}
