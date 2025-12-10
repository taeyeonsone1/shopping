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
    
    console.log(`从CSV读取到 ${lines.length} 行数据`);
    
    // 解析表头
    const headers = parseCSVLine(lines[0]);
    console.log('表头:', headers);
    
    let successCount = 0;
    let errorCount = 0;
    
    // 逐行插入数据
    async function insertAllProducts() {
        console.log('\n开始插入数据...');
        
        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            
            const product = {};
            headers.forEach((header, index) => {
                product[header] = values[index] || '';
            });
            
            const id = parseInt(product.id) || 0;
            const name = product.name || '';
            const price = parseFloat(product.price) || 0;
            const category = product.category || 'other';
            const image = product.image || '';
            const rating = parseFloat(product.rating) || 4.5;
            const description = product.description || '';
            
            if (!name || price <= 0 || id <= 0) {
                errorCount++;
                continue;
            }

            // 使用Promise包装insert操作
            await new Promise((resolve) => {
                // 先删除可能重复的记录
                connection.query('DELETE FROM products WHERE id = ?', [id], () => {
                    // 插入新记录
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
                        description,
                        JSON.stringify([])
                    ];
                    
                    connection.query(sql, sqlValues, (err, result) => {
                        if (err) {
                            console.error(`插入错误 (ID: ${id}):`, err.message);
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
            });
        }
        
        console.log('\n📊 导入完成统计：');
        console.log(`✅ 成功插入：${successCount} 条`);
        console.log(`❌ 插入失败：${errorCount} 条`);
        
        // 查询总数
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