const mysql = require('mysql2');

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

// 创建表的SQL语句
const createTables = `
    -- 用户表
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    
    -- 商品表
    CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        image VARCHAR(500),
        rating DECIMAL(2,1) DEFAULT 0,
        description TEXT,
        reviews JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_price (price),
        INDEX idx_rating (rating),
        INDEX idx_name (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    
    -- 平替方案表
    CREATE TABLE IF NOT EXISTS alternatives (
        id INT AUTO_INCREMENT PRIMARY KEY,
        original_id INT NOT NULL,
        replacement_id INT NOT NULL,
        savings DECIMAL(10,2) NOT NULL,
        reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (original_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (replacement_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_savings (savings)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    
    -- 收藏表
    CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_favorite (user_id, product_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

// 分批执行建表语句
const tables = createTables.split(';').filter(sql => sql.trim());

tables.forEach((sql, index) => {
    if (sql.trim()) {
        connection.query(sql, (err, result) => {
            if (err) {
                console.error(`建表错误 ${index + 1}:`, err);
            } else {
                console.log(`✓ 表 ${index + 1} 创建成功`);
            }
            
            // 最后一个表创建完成后关闭连接
            if (index === tables.length - 1) {
                setTimeout(() => {
                    console.log('\n📊 数据表创建完成！');
                    connection.end();
                }, 500);
            }
        });
    }
});