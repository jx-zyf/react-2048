function Board(size) {
    this.size = size;
    this.grid = this.init();
}
Board.prototype = {
    init() {  // 形成一个空矩阵
        let grid = [];
        for (let i = 0; i < this.size; i++) {
            grid[i] = [];
            for (let j = 0; j < this.size; j++) {
                grid[i].push("");
            }
        }
        return grid;
    },
    usefulCell() { // 记录为空的格子
        let cells = [];
        for (let i = 0; i < this.size; i++)
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === "") {  // 若可用则记录坐标
                    cells.push({
                        x: i,
                        y: j
                    });
                }
            }
        return cells;
    },
    selectCell() { // 从可填充格子中随机选一个
        let cells = this.usefulCell();
        if (cells.length) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
    },
    cellEmpty() {  // 可用格子是否为空，为空返回true
        return !this.usefulCell().length;
    }
};

module.exports = Board;