// Maps have tiles.

class Tile {
    constructor(type) {
        this.name = '';
        this.ch = new Character();
        this.vis = this.ch;
        this.inv = [];
        this.walkable = true;
        this.blockslight = false;
        this.setType(type);
    }

    setType(type) {
        // Retreive the tile data which starts with name
        const tileData = Tile.tiledata.find(
            tile => tile[0] === type.toLowerCase()
        );

        if (tileData) {
            this.name = tileData[0];
            this.ch.ch = tileData[1];
            this.ch.color = Color.getColorByName(tileData[2]);
            this.ch.background = Color.getColorByName(tileData[3]);
            this.walkable = tileData[4];
            this.blockslight = tileData[5];
        } else {
            // Handle the case where the tile type is not found
            console.error("Tile type '" + type + "' not found.");
        }

    }
}

// Move tiledata outside the class definition
Tile.tiledata = [
    // [ name, character, color, background, walkable, blockslight ]
    [ 'floor', ' ', 'lightgray', 'black', true, false ],
    [ 'wall', '#', 'lightgray', 'black', false, true ]
];