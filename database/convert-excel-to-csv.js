// 尝试使用Windows自带的PowerShell来转换Excel到CSV
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const excelPath = path.join(__dirname, '500 条产品数据.xlsx');
const csvPath = path.join(__dirname, 'products_data.csv');

console.log('尝试使用PowerShell转换Excel文件...');

const powershellScript = `
$excel = New-Object -ComObject Excel.Application;
$excel.Visible = $false;
$workbook = $excel.Workbooks.Open('${excelPath.replace(/\\/g, '\\\\')}');
$worksheet = $workbook.Sheets.Item(1);
$worksheet.SaveAs('${csvPath.replace(/\\/g, '\\\\')}', 6);
$workbook.Close($false);
$excel.Quit();
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null;
Write-Host "转换完成";
`;

exec(`powershell -Command "${powershellScript}"`, (error, stdout, stderr) => {
    if (error) {
        console.error('PowerShell转换失败:', error.message);
        // 如果PowerShell失败，尝试手动CSV格式
        console.log('\n请手动将Excel文件另存为CSV格式，命名为products_data.csv');
        console.log('或者，你可以直接复制粘贴Excel数据到这里，我将帮你转换成数据库格式。');
        process.exit(1);
    } else {
        console.log('Excel文件已成功转换为CSV格式');
        // 现在读取CSV文件并导入数据库
        require('./import-csv-products');
    }
});