const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');

// 读取最新的商品数据
function loadProductsData() {
    const dataFile = fs.readFileSync('./js/data.js', 'utf8');
    
    // 提取products数组
    const productsMatch = dataFile.match(/const products = (\[[\s\S]*?\]);/);
    if (!productsMatch) {
        throw new Error('无法解析商品数据');
    }
    
    // 使用Function构造器安全地解析JSON
    const products = eval(productsMatch[1]);
    return products;
}

// 更新数据库中的商品数据
function updateProducts() {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('数据库连接错误:', err.message);
            return;
        }
        
        console.log('已连接到SQLite数据库');
        
        // 读取最新的商品数据
        const products = loadProductsData();
        console.log('从data.js读取到商品数量:', products.length);
        
        // 开始事务
        db.serialize(() => {
            // 先删除所有现有商品
            db.run('DELETE FROM products', (err) => {
                if (err) {
                    console.error('删除商品失败:', err.message);
                } else {
                    console.log('已删除所有现有商品');
                }
            });
            
            // 插入新的商品数据
            const stmt = db.prepare('INSERT INTO products (id, name, price, category, image, rating, description) VALUES (?, ?, ?, ?, ?, ?, ?)');
            
            products.forEach(product => {
                stmt.run([
                    product.id,
                    product.name,
                    product.price,
                    product.category,
                    product.image,
                    product.rating,
                    product.description
                ]);
            });
            
            stmt.finalize((err) => {
                if (err) {
                    console.error('插入商品失败:', err.message);
                } else {
                    console.log('成功插入', products.length, '个商品');
                }
                
                // 验证插入的商品数量
                db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
                    if (err) {
                        console.error('查询商品数量失败:', err.message);
                    } else {
                        console.log('数据库中的商品数量:', row.count);
                    }
                    
                    db.close();
                });
            });
        });
    });
}

// 执行更新
updateProducts();