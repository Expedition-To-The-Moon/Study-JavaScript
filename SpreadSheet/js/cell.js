export class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, colName, active = false) {
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.colName = colName;
        this.active = active;
    }
}