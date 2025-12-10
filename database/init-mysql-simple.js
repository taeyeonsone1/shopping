const mysql = require('mysql2');
const fs = require('fs');

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

// 读取商品数据
function loadProductsData() {
    const dataFile = fs.readFileSync('./js/data.js', 'utf8');
    
    // 提取products数组
    const productsMatch = dataFile.match(/const products = (\[[\s\S]*?\]);/);
    if (!productsMatch) {
        throw new Error('无法解析商品数据');
    }
    
    // 提取alternatives数组
    const alternativesMatch = dataFile.match(/const alternatives = (\[[\s\S]*?\]);/);
    if (!alternativesMatch) {
        throw new Error('无法解析平替方案数据');
    }
    
    // 使用Function构造器安全地解析JSON
    const products = eval(productsMatch[1]);
    const alternatives = eval(alternativesMatch[1]);
    
    return { products, alternatives };
}

async function initDatabase() {
    try {
        const { products, alternatives } = loadProductsData();
        
        console.log('开始插入数据...');
        
        // 清空现有数据
        connection.query('DELETE FROM alternatives', (err) => {
            if (err) console.error('清空alternatives表错误:', err);
        });
        
        connection.query('DELETE FROM favorites', (err) => {
            if (err) console.error('清空favorites表错误:', err);
        });
        
        connection.query('DELETE FROM products', (err) => {
            if (err) console.error('清空products表错误:', err);
        });
        
        // 插入商品数据
        let productCount = 0;
        for (const product of products) {
            connection.query(
                'INSERT INTO products (id, name, price, category, image, rating, description, reviews) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    product.id,
                    product.name,
                    product.price,
                    product.category,
                    product.image || '',
                    product.rating || 0,
                    product.description || '',
                    JSON.stringify(product.reviews || [])
                ],
                (err) => {
                    if (err) console.error('插入商品错误:', err);
                }
            );
            productCount++;
        }
        
        // 插入平替方案数据
        let altCount = 0;
        for (const alt of alternatives) {
            connection.query(
                'INSERT INTO alternatives (original_id, replacement_id, savings, reason) VALUES (?, ?, ?, ?)',
                [
                    alt.original.id,
                    alt.replacement.id,
                    alt.savings,
                    alt.reason || ''
                ],
                (err) => {
                    if (err) console.error('插入平替方案错误:', err);
                }
            );
            altCount++;
        }
        
        setTimeout(() => {
            console.log(`✓ 已插入 ${productCount} 个商品`);
            console.log(`✓ 已插入 ${altCount} 个平替方案`);
            console.log('\n🎉 MySQL数据库初始化完成！');
            connection.end();
        }, 1000);
        
    } catch (error) {
        console.error('初始化错误:', error);
        connection.end();
    }
}

initDatabase();