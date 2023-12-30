import { Sheet } from './sheet.js';
import { ExportFile } from './export.js';

const spreadSheetContanier = document.querySelector("#spreadsheet-con");
const rows = 10;
const cols = 10;
const alp = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const spreadSheet = new Sheet(rows, cols, alp, spreadSheetContanier);
const exportFile = new ExportFile(spreadSheet);

spreadSheet.initSpreadSheet();