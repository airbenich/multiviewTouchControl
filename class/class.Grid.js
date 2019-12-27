class Grid {
    constructor(domElement) {
        this.domElement = $(domElement);
        this.grid = [];
        this.elementList = [];
    }

    addColumn() {
        this.grid.push([]);
    }

    addRowInColumn(columnNumber,element) {
        // position element in grid
        this.grid[columnNumber][element.name] = element;

        // put reference also in list for associative search ability
        this.elementList[element.name] = element;
    }

    render() {
        this.grid.forEach(column => {
            for (let key in column) {
                var elementInRow = column[key];
                elementInRow.render(this.domElement);
            }
        });
    }
}