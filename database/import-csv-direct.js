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
const csvPath = path.join(__dirname, '500 条产品数据.csv');

function parseCSVLine(line) {
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
    
    const insertProduct = (row, index) => {
        return new Promise((resolve) => {
            const values = parseCSVLine(row);
            
            // 创建商品对象
            const product = {};
            headers.forEach((header, i) => {
                product[header] = values[i] || '';
            });
            
            // 提取商品信息
            const id = parseInt(product.id) || 0;
            const name = product.name || '';
            const price = parseFloat(product.price) || 0;
            const category = product.category || 'other';
            const image = product.image || '';
            const rating = parseFloat(product.rating) || 4.5;
            const description = product.description || '';
            
            if (!name || price <= 0 || id <= 0) {
                console.log(`第 ${index + 1} 行数据无效：`, { id, name, price, category });
                errorCount++;
                resolve();
                return;
            }

            // 插入数据库（先删除可能重复的记录）
            const deleteSql = `DELETE FROM products WHERE id = ?`;
            const sql = `
                INSERT INTO products (id, name, price, category, image, rating, description, reviews) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            const sqlValues = [
                id,
                name,
                price,
                category,
                image,
                rating,
                JSON.stringify([]) // 默认空评论
            ];
            
            // 先删除可能重复的记录
            connection.query(deleteSql, [id], (err) => {
                // 不管删除是否成功都继续插入
                connection.query(sql, sqlValues, (err, result) => {
                if (err) {
                    console.error(`第 ${index + 1} 行插入错误：`, err.message);
                    errorCount++;
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
        console.log(`📋 总计处理：${lines.length - 1} 条`);
        
        // 查询当前商品总数
        connection.query('SELECT COUNT(*) as total FROM products', (err, result) => {
            if (!err) {
                console.log(`🛒 数据库中商品总数：${result[0].total} 条`);
            }
            
            // 显示分类统计
            connection.query('SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY count DESC', (err, results) => {
                if (!err) {
                    console.log('\n📈 商品分类统计：');
                    results.forEach(row => {
                        console.log(`  ${row.category}: ${row.count} 件`);
                    });
                }
                
                console.log('\n🎉 Excel数据导入完成！');
                connection.end();
            });
        });
    }

    insertAllProducts();
    
} catch (error) {
    console.error('读取CSV文件错误:', error.message);
    connection.end();
}