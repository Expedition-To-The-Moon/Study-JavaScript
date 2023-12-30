import { Sheet } from './sheet.js';

export class ExportFile {
    constructor(spreadSheet) {
        this.exportBtn = document.querySelector('#export-btn');
        this.spreadSheet = spreadSheet;
        this.exportBtn.addEventListener('click', this.exportSheet.bind(this));
    }

    exportSheet() {
        const spreadSheetData = this.spreadSheet.getSpreadSheetData();

        let csv = '';
        for (let i = 0; i < spreadSheetData.length; i++) {
            if (i === 0) continue;
            csv += spreadSheetData[i]
                .filter((item) => !item.isHeader)
                .map((item) => item.data)
                .join(",") + "\r\n";
        }

        const csvObj = new Blob([csv]);
        const csvUrl = URL.createObjectURL(csvObj);
        console.log("csv", csvUrl);

        const a = document.createElement('a');
        a.href = csvUrl;
        a.download = "Spreadsheet File Name.csv ";
        a.click();
    }
}
