const mysql = require('mysql2/promise');
const fs = require('fs');

// MySQL数据库配置
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'shopping_db'
};

async function initDatabase() {
    let connection;
    
    try {
        // 连接MySQL服务器（不指定数据库）
        connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
        });
        
        console.log('已连接到MySQL服务器');
        
        // 创建数据库（如果不存在）
        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        console.log(`✓ 数据库 ${dbConfig.database} 创建成功`);
        
        // 选择数据库
        await connection.execute(`USE ${dbConfig.database}`);
        
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
        
        // 创建表
        console.log('\n开始创建数据表...');
        
        // 用户表
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                phone VARCHAR(20) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✓ users表创建成功');
        
        // 商品表
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS products (
                id INT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                category VARCHAR(50) NOT NULL,
                image VARCHAR(500),
                rating DECIMAL(2,1) DEFAULT 0,
                description TEXT,
                reviews JSON DEFAULT '[]',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_category (category),
                INDEX idx_price (price),
                INDEX idx_rating (rating),
                INDEX idx_name (name)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✓ products表创建成功');
        
        // 平替方案表
        await connection.execute(`
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
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✓ alternatives表创建成功');
        
        // 收藏表
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS favorites (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                product_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                UNIQUE KEY unique_favorite (user_id, product_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✓ favorites表创建成功');
        
        // 插入数据
        console.log('\n开始插入数据...');
        const { products, alternatives } = loadProductsData();
        
        // 清空现有数据
        await connection.execute('DELETE FROM alternatives');
        await connection.execute('DELETE FROM favorites');
        await connection.execute('DELETE FROM products');
        
        // 插入商品数据
        for (const product of products) {
            await connection.execute(
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
                ]
            );
        }
        console.log(`✓ 已插入 ${products.length} 个商品`);
        
        // 插入平替方案数据
        for (const alt of alternatives) {
            await connection.execute(
                'INSERT INTO alternatives (original_id, replacement_id, savings, reason) VALUES (?, ?, ?, ?)',
                [
                    alt.original.id,
                    alt.replacement.id,
                    alt.savings,
                    alt.reason || ''
                ]
            );
        }
        console.log(`✓ 已插入 ${alternatives.length} 个平替方案`);
        
        console.log('\n🎉 MySQL数据库初始化完成！');
        console.log(`数据库: ${dbConfig.database}`);
        console.log(`商品数量: ${products.length}`);
        console.log(`平替方案: ${alternatives.length}`);
        
    } catch (error) {
        console.error('数据库初始化失败:', error.message);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('请检查MySQL用户名和密码是否正确');
        } else if (error.code === 'ECONNREFUSED') {
            console.log('请确保MySQL服务已启动');
        }
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('\n数据库连接已关闭');
        }
    }
}

// 运行初始化
initDatabase();