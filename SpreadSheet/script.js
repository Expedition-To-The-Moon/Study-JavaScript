const spreadSheetContanier = document.querySelector("#spreadsheet-con");
const exportBtn = document.querySelector('#export-btn');

const rows = 10;
const cols = 10;
const spreadSheet = [];
const alp = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

class Cell {
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

exportBtn.onclick = function (e) {
    let csv = '';
    for (let i = 0; i < spreadSheet.length; i++) {
        if (i === 0) continue;
        csv += spreadSheet[i]
            .filter((item) => !item.isHeader)
            .map((item) => item.data)
            .join(",") + "\r\n";
    }

    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    console.log("csv", csvUrl);

    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = "Spreadsheet File Name.csv";
    a.click();
}

initSpreadSheet();

function initSpreadSheet() {
    for (let i = 0; i < rows; i++) {
        let spreadSheetRow = [];
        for (let j = 0; j < cols; j++) {
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
                cellData = alp[j - 1];
                isHeader = true;
                disabled = true;
            } 
            
            if (!cellData) {
                cellData = '';
            }

            const rowName = i;
            const colName = alp[j - 1];

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, colName, false);
            spreadSheetRow.push(cell);
        }
        spreadSheet.push(spreadSheetRow);
    }
    drawSheet();
}

function createCellEl(cell) {
    const cellEl = document.createElement('input');
    cellEl.className = "cell";
    cellEl.id = "cell_" + cell.row + cell.column;
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;

    if (cell.isHeader) {
        cellEl.classList.add('header');
    }

    cellEl.onclick = () => handleCellClick(cell);
    cellEl.onchange = (e) => handleOnChange(e.target.value ,cell);
    return cellEl;
}
// 선택 영역 표시
function handleCellClick(cell) {
    clearHeaderActiveStates();
    const colHeader = spreadSheet[0][cell.column];
    const rowHeader = spreadSheet[cell.row][0];
    const colHeaderEl = getElFromRowCol(colHeader.row, colHeader.column);
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
    colHeaderEl.classList.add('active');
    rowHeaderEl.classList.add('active'); 
    document.querySelector('#cell-status').innerHTML = cell.colName + "" + cell.rowName;
}
// 이전 선택 영역 표시 삭제
function clearHeaderActiveStates() {
    const headers = document.querySelectorAll('.header');

    headers.forEach((header) => {
        header.classList.remove('active');
    })
}
function getElFromRowCol(row, col) {
    return document.querySelector("#cell_" + row + col);
}

function handleOnChange(data, cell) {
    cell.data = data;
}

function drawSheet() {
    for (let i = 0; i < spreadSheet.length; i++) {
        const rowContainerEl = document.createElement('div');
        rowContainerEl.className = "cell-row";
        for (let j = 0; j < spreadSheet[i].length; j++) {
            const cell = spreadSheet[i][j];
            rowContainerEl.append(createCellEl(cell));
        }
        spreadSheetContanier.append(rowContainerEl);
    }
}