const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('数据库连接错误:', err.message);
        process.exit(1);
    }
    console.log('已连接到SQLite数据库');
});

// 创建表
const createTables = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
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
                if (err) {
                    console.error('创建products表错误:', err);
                    reject(err);
                } else {
                    console.log('✓ products表创建成功');
                }
            });

            // 其他表...
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`, (err) => {
                if (err) {
                    console.error('创建users表错误:', err);
                    reject(err);
                } else {
                    console.log('✓ users表创建成功');
                }
            });

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
                if (err) {
                    console.error('创建alternatives表错误:', err);
                    reject(err);
                } else {
                    console.log('✓ alternatives表创建成功');
                }
            });

            db.run(`CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (product_id) REFERENCES products(id),
                UNIQUE(user_id, product_id)
            )`, (err) => {
                if (err) {
                    console.error('创建favorites表错误:', err);
                    reject(err);
                } else {
                    console.log('✓ favorites表创建成功');
                    resolve();
                }
            });
        });
    });
};

// 插入示例商品数据
const insertSampleData = () => {
    return new Promise((resolve, reject) => {
        const sampleProducts = [
            {
                id: 1,
                name: "iPhone 15 Pro",
                price: 8999,
                category: "electronics",
                image: "https://picsum.photos/seed/1/400/300",
                rating: 4.8,
                description: "苹果最新旗舰手机",
                reviews: '[]'
            },
            {
                id: 2,
                name: "小米14 Pro",
                price: 4999,
                category: "electronics",
                image: "https://picsum.photos/seed/2/400/300",
                rating: 4.7,
                description: "小米旗舰手机",
                reviews: '[]'
            },
            {
                id: 3,
                name: "AirPods Pro 2",
                price: 1899,
                category: "electronics",
                image: "https://picsum.photos/seed/3/400/300",
                rating: 4.6,
                description: "苹果降噪耳机",
                reviews: '[]'
            },
            {
                id: 4,
                name: "华为FreeBuds Pro 3",
                price: 999,
                category: "electronics",
                image: "https://picsum.photos/seed/4/400/300",
                rating: 4.5,
                description: "华为降噪耳机",
                reviews: '[]'
            },
            {
                id: 5,
                name: "优衣库基础T恤",
                price: 79,
                category: "clothing",
                image: "https://picsum.photos/seed/5/400/300",
                rating: 4.6,
                description: "优衣库经典基础款",
                reviews: '[]'
            }
        ];

        const insertProduct = db.prepare(`INSERT OR REPLACE INTO products 
            (id, name, price, category, image, rating, description, reviews) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
        
        let count = 0;
        sampleProducts.forEach(product => {
            insertProduct.run(
                product.id,
                product.name,
                product.price,
                product.category,
                product.image,
                product.rating,
                product.description,
                product.reviews
            );
            count++;
        });
        
        insertProduct.finalize((err) => {
            if (err) {
                console.error('插入商品数据错误:', err);
                reject(err);
            } else {
                console.log(`✓ 已插入 ${count} 个示例商品`);
                resolve();
            }
        });
    });
};

// 主初始化函数
const initDatabase = async () => {
    try {
        await createTables();
        await insertSampleData();
        console.log('数据库初始化完成！');
        db.close();
    } catch (error) {
        console.error('数据库初始化失败:', error);
        db.close();
    }
};

initDatabase();