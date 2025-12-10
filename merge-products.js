const fs = require('fs');

// 读取新生成的产品数据
const newProductsFile = fs.readFileSync('./new-products.js', 'utf8');
const newProductsMatch = newProductsFile.match(/const newProducts = \[([\s\S]*?)\];/);
const newProductsCode = newProductsMatch ? newProductsMatch[1] : '';

// 读取现有的数据文件
const dataFile = fs.readFileSync('./js/data.js', 'utf8');

// 找到商品数组的结束位置并插入新商品
const updatedData = dataFile.replace(
    /\]\;\s*\/\/\s*平替方案数据/,
    '],\n' + newProductsCode + '\n];\n\n// 平替方案数据'
);

// 写入更新后的文件
fs.writeFileSync('./js/data.js', updatedData);

console.log('商品数据已成功合并到 js/data.js');

// 验证商品数量
const productsMatch = updatedData.match(/const products = \[([\s\S]*?)\]\;/);
if (productsMatch) {
    const productsCode = productsMatch[1];
    const productCount = (productsCode.match(/\{\s*id:/g) || []).length;
    console.log('总商品数量:', productCount);
}