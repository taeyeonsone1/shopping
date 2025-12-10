const fs = require('fs');
const mysql = require('mysql2');
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

// 读取CSV文件
const csvPath = path.join(__dirname, 'products_data.csv');

function parseCSVLine(line) {
    // 简单的CSV解析，处理逗号分隔
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

try {
    if (!fs.existsSync(csvPath)) {
        console.error('CSV文件不存在:', csvPath);
        console.log('\n请按以下步骤操作：');
        console.log('1. 打开Excel文件 "500 条产品数据.xlsx"');
        console.log('2. 点击"文件" -> "另存为"');
        console.log('3. 选择"CSV (逗号分隔)(*.csv)"格式');
        console.log('4. 保存为 "products_data.csv" 在当前目录');
        console.log('5. 重新运行此脚本');
        connection.end();
        return;
    }

    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
        console.log('CSV文件中没有数据');
        connection.end();
        return;
    }

    console.log(`从CSV读取到 ${lines.length} 行数据`);
    
    // 解析表头
    const headers = parseCSVLine(lines[0]);
    console.log('表头:', headers);
    
    // 准备插入数据
    let successCount = 0;
    let errorCount = 0;
    let duplicateCount = 0;
    
    const insertProduct = (row, index) => {
        return new Promise((resolve) => {
            const values = parseCSVLine(row);
            
            // 创建字段映射
            const product = {};
            headers.forEach((header, i) => {
                product[header] = values[i] || '';
            });
            
            // 提取商品信息
            const name = product['商品名称'] || product['产品名称'] || product['名称'] || product['name'] || '';
            let price = parseFloat(product['价格'] || product['price'] || 0);
            const category = product['分类'] || product['类别'] || product['category'] || 'other';
            const description = product['描述'] || product['描述'] || product['简介'] || product['description'] || '';
            const image = product['图片'] || product['图片链接'] || product['image'] || '';
            
            // 如果价格格式不对，尝试清理
            if (isNaN(price) && typeof product['价格'] === 'string') {
                price = parseFloat(product['价格'].replace(/[^0-9.]/g, ''));
            }
            
            if (!name || price <= 0 || isNaN(price)) {
                console.log(`第 ${index + 1} 行数据无效：`, { name, price, category });
                errorCount++;
                resolve();
                return;
            }

            // 生成一个唯一的ID
            const id = 1000 + index;

            // 插入数据库
            const sql = `
                INSERT INTO products (id, name, price, category, image, rating, description, reviews) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                price = VALUES(price),
                category = VALUES(category),
                image = VALUES(image),
                description = VALUES(description)
            `;
            
            const sqlValues = [
                id,
                name,
                price,
                category,
                image,
                4.5, // 默认评分
                description,
                JSON.stringify([]) // 默认空评论
            ];
            
            connection.query(sql, sqlValues, (err, result) => {
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
        
        for (let i = 1; i < lines.length; i++) { // 跳过表头
            await insertProduct(lines[i], i - 1);
        }
        
        console.log('\n📊 导入完成统计：');
        console.log(`✅ 成功插入：${successCount} 条`);
        console.log(`❌ 插入失败：${errorCount} 条`);
        console.log(`⚠️ 重复数据：${duplicateCount} 条`);
        console.log(`📋 总计处理：${lines.length - 1} 条`);
        
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
    console.error('读取CSV文件错误:', error.message);
    connection.end();
}