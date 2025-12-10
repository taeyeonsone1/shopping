const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('数据库连接错误:', err.message);
        process.exit(1);
    }
    console.log('已连接到SQLite数据库');
});

// 读取商品数据（从data.js文件）
function loadProductsData() {
    // 直接导入数据文件，避免解析错误
    delete require.cache[require.resolve('./js/data.js')];
    const data = require('./js/data.js');
    
    return { 
        products: data.products, 
        alternatives: data.alternatives 
    };
}

// 创建表
db.serialize(() => {
    // 用户表
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('创建users表错误:', err);
        else console.log('✓ users表创建成功');
    });

    // 商品表
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        rating REAL DEFAULT 0,
        description TEXT,
        reviews TEXT DEFAULT '[]',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('创建products表错误:', err);
        else console.log('✓ products表创建成功');
    });

    // 平替方案表
    db.run(`CREATE TABLE IF NOT EXISTS alternatives (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_id INTEGER NOT NULL,
        replacement_id INTEGER NOT NULL,
        savings REAL NOT NULL,
        reason TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (original_id) REFERENCES products(id),
        FOREIGN KEY (replacement_id) REFERENCES products(id)
    )`, (err) => {
        if (err) console.error('创建alternatives表错误:', err);
        else console.log('✓ alternatives表创建成功');
    });

    // 收藏表
    db.run(`CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        UNIQUE(user_id, product_id)
    )`, (err) => {
        if (err) console.error('创建favorites表错误:', err);
        else console.log('✓ favorites表创建成功');
    });

    // 等待表创建完成后插入数据
    setTimeout(() => {
        try {
            const { products, alternatives } = loadProductsData();
            
            // 插入商品数据
            const insertProduct = db.prepare(`INSERT INTO products 
                (id, name, price, category, image, rating, description, reviews) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
            
            let productCount = 0;
            products.forEach(product => {
                insertProduct.run(
                    product.id,
                    product.name,
                    product.price,
                    product.category,
                    product.image || '',
                    product.rating || 0,
                    product.description || '',
                    JSON.stringify(product.reviews || [])
                );
                productCount++;
            });
            
            insertProduct.finalize((err) => {
                if (err) {
                    console.error('插入商品数据错误:', err);
                } else {
                    console.log(`✓ 已插入 ${productCount} 个商品`);
                }
            });

            // 插入平替方案数据
            const insertAlternative = db.prepare(`INSERT INTO alternatives 
                (id, original_id, replacement_id, savings, reason) 
                VALUES (?, ?, ?, ?, ?)`);
            
            let altCount = 0;
            alternatives.forEach(alt => {
                insertAlternative.run(
                    alt.id,
                    alt.original.id,
                    alt.replacement.id,
                    alt.savings,
                    alt.reason || ''
                );
                altCount++;
            });
            
            insertAlternative.finalize((err) => {
                if (err) {
                    console.error('插入平替方案数据错误:', err);
                } else {
                    console.log(`✓ 已插入 ${altCount} 个平替方案`);
                    console.log('\n数据库初始化完成！');
                    db.close();
                }
            });
        } catch (error) {
            console.error('数据加载错误:', error.message);
            db.close();
        }
    }, 500);
});
