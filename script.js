// script.js
document.addEventListener('DOMContentLoaded', () => {
    const charInput = document.getElementById('charInput');
    const resultsTable = document.getElementById('resultsTable');
    const statusMessage = document.getElementById('statusMessage');

    // 獲取所有結果顯示欄位的 ID
    const resultElements = {
        char: document.getElementById('res_char'),
        unicode: document.getElementById('res_unicode'),
        decimal: document.getElementById('res_decimal'),
        hex: document.getElementById('res_hex'),
        html_dec: document.getElementById('res_html_dec'),
        html_hex: document.getElementById('res_html_hex')
    };

    /**
     * 根據輸入的單一字元計算並顯示所有編碼
     */
    function calculateEncoding() {
        const inputChar = charInput.value;

        if (inputChar.length === 0) {
            resultsTable.style.display = 'none';
            statusMessage.style.display = 'block';
            statusMessage.textContent = '請輸入一個字元來查詢。';
            statusMessage.className = 'status-error';
            return;
        }

        // 確保只處理第一個字元（雖然 HTML 已經設置了 maxlength=1）
        const char = inputChar.charAt(0);
        
        // 使用 codePointAt(0) 來正確處理 Unicode 輔助平面字符
        // 例如：𠮷 (吉字上多一橫)
        const codePoint = char.codePointAt(0);

        if (codePoint === undefined) {
             // 處理輸入無效的情況，理論上在瀏覽器上很少發生
            resultsTable.style.display = 'none';
            statusMessage.style.display = 'block';
            statusMessage.textContent = '輸入無效，請嘗試其他單一字元。';
            return;
        }

        // 1. 十進制 / ASCII 值
        const decimalValue = codePoint; 

        // 2. 十六進制
        const hexValue = codePoint.toString(16).toUpperCase();

        // 3. HTML 實體碼 (十進制和十六進制)
        const htmlDec = `&#${decimalValue};`;
        const htmlHex = `&#x${hexValue};`;

        // 更新顯示結果
        resultElements.char.textContent = char;
        resultElements.unicode.textContent = `U+${hexValue.padStart(4, '0')}`;
        resultElements.decimal.textContent = decimalValue;
        resultElements.hex.textContent = `0x${hexValue}`;
        resultElements.html_dec.textContent = htmlDec;
        resultElements.html_hex.textContent = htmlHex;

        // 顯示表格，隱藏狀態訊息
        resultsTable.style.display = 'table';
        statusMessage.style.display = 'none';
    }

    // 實時監聽輸入事件
    charInput.addEventListener('input', calculateEncoding);
});