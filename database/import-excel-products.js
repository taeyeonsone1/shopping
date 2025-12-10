const XLSX = require('xlsx');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// MySQL数据库配置
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'shopping_db'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('连接错误:', err);
        return;
    }
    console.log('已连接到MySQL数据库');
});

// 读取Excel文件
const excelPath = path.join(__dirname, '500 条产品数据.xlsx');

try {
    if (!fs.existsSync(excelPath)) {
        console.error('Excel文件不存在:', excelPath);
        process.exit(1);
    }

    // 读取Excel文件
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0]; // 读取第一个工作表
    const worksheet = workbook.Sheets[sheetName];
    
    // 转换为JSON格式
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`从Excel读取到 ${jsonData.length} 条数据`);
    
    if (jsonData.length === 0) {
        console.log('Excel文件中没有数据');
        connection.end();
        return;
    }

    // 显示前几条数据的结构
    console.log('\n数据结构示例：');
    console.log(JSON.stringify(jsonData[0], null, 2));
    
    // 准备插入数据
    let successCount = 0;
    let errorCount = 0;
    let duplicateCount = 0;
    
    const insertProduct = (product, index) => {
        return new Promise((resolve) => {
            // 检查必要的字段
            const name = product['商品名称'] || product['产品名称'] || product['name'] || '';
            const price = parseFloat(product['价格'] || product['price'] || 0);
            const category = product['分类'] || product['category'] || 'other';
            const description = product['描述'] || product['description'] || product['简介'] || '';
            const image = product['图片'] || product['image'] || '';
            
            if (!name || price <= 0) {
                console.log(`第 ${index + 1} 行数据无效：`, product);
                errorCount++;
                resolve();
                return;
            }

            // 生成一个唯一的ID（基于时间戳和索引）
            const id = 1000 + index; // 从1000开始，避免与现有商品ID冲突

            // 插入数据库
            const sql = `
                INSERT INTO products (id, name, price, category, image, rating, description, reviews) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            const values = [
                id,
                name,
                price,
                category,
                image,
                4.5, // 默认评分
                description,
                JSON.stringify([]) // 默认空评论
            ];
            
            connection.query(sql, values, (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        console.log(`第 ${index + 1} 行数据重复，跳过：${name}`);
                        duplicateCount++;
                    } else {
                        console.error(`第 ${index + 1} 行插入错误：`, err.message);
                        errorCount++;
                    }
                } else {
                    successCount++;
                    if (successCount % 50 === 0) {
                        console.log(`已成功插入 ${successCount} 条数据...`);
                    }
                }
                resolve();
            });
        });
    };

    // 批量插入数据
    async function insertAllProducts() {
        console.log('\n开始插入数据...');
        
        for (let i = 0; i < jsonData.length; i++) {
            await insertProduct(jsonData[i], i);
        }
        
        console.log('\n📊 导入完成统计：');
        console.log(`✅ 成功插入：${successCount} 条`);
        console.log(`❌ 插入失败：${errorCount} 条`);
        console.log(`⚠️ 重复数据：${duplicateCount} 条`);
        console.log(`📋 总计处理：${jsonData.length} 条`);
        
        // 查询当前商品总数
        connection.query('SELECT COUNT(*) as total FROM products', (err, result) => {
            if (!err) {
                console.log(`🛒 数据库中商品总数：${result[0].total} 条`);
            }
            
            console.log('\n🎉 Excel数据导入完成！');
            connection.end();
        });
    }

    insertAllProducts();
    
} catch (error) {
    console.error('读取Excel文件错误:', error.message);
    connection.end();
}