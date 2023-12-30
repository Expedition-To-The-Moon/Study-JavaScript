import { Cell } from './Cell.js';

export class Sheet {
    constructor(rows, cols, alp, spreadSheetContanier) {
        this.rows = rows;
        this.cols = cols;
        this.spreadSheet = [];
        this.alp = alp;
        this.spreadSheetContanier = spreadSheetContanier;
    }

    initSpreadSheet() {
        for (let i = 0; i < this.rows; i++) {
            let spreadSheetRow = [];
            for (let j = 0; j < this.cols; j++) {
                let cellData = '';
                let isHeader = false;
                let disabled = false;

                // 첫번째 열에 숫자 넣기
                if (j === 0) {
                    cellData = i;
                    isHeader = true;
                    disabled = true;
                } 
                // 첫번째 행에 알파벳 넣기
                if (i === 0) {
                    cellData = this.alp[j - 1];
                    isHeader = true;
                    disabled = true;
                } 
                
                if (!cellData) {
                    cellData = '';
                }

                const rowName = i;
                const colName = this.alp[j - 1];

                const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, colName, false);
                spreadSheetRow.push(cell);
            }
            this.spreadSheet.push(spreadSheetRow);
        }
        this.drawSheet();
    }

    createCellEl(cell) {
        const cellEl = document.createElement('input');
        cellEl.className = "cell";
        cellEl.id = "cell_" + cell.row + cell.column;
        cellEl.value = cell.data;
        cellEl.disabled = cell.disabled;

        if (cell.isHeader) {
            cellEl.classList.add('header');
        }

        cellEl.onfocus = () => this.handleCellFocus(cell);
        cellEl.onchange = (e) => this.handleOnChange(e.target.value, cell);
        return cellEl;
    }

    handleCellFocus(cell) {
        this.clearHeaderActiveStates();
        const colHeader = this.spreadSheet[0][cell.column];
        const rowHeader = this.spreadSheet[cell.row][0];
        const colHeaderEl = this.getElFromRowCol(colHeader.row, colHeader.column);
        const rowHeaderEl = this.getElFromRowCol(rowHeader.row, rowHeader.column);
        colHeaderEl.classList.add('active');
        rowHeaderEl.classList.add('active'); 
        document.querySelector('#cell-status').innerHTML = cell.colName + "" + cell.rowName;
    }

    clearHeaderActiveStates() {
        const headers = document.querySelectorAll('.header');
        headers.forEach((header) => {
            header.classList.remove('active');
        });
    }

    getElFromRowCol(row, col) {
        return document.querySelector("#cell_" + row + col);
    }

    handleOnChange(data, cell) {
        cell.data = data;
    }

    drawSheet() {
        for (let i = 0; i < this.spreadSheet.length; i++) {
            const rowContainerEl = document.createElement('div');
            rowContainerEl.className = "cell-row";
            for (let j = 0; j < this.spreadSheet[i].length; j++) {
                const cell = this.spreadSheet[i][j];
                rowContainerEl.append(this.createCellEl(cell));
            }
            this.spreadSheetContanier.append(rowContainerEl);
        }
    }
    // 스프레드시트 데이터를 내보내기
    getSpreadSheetData() {
        return this.spreadSheet;
    }
}