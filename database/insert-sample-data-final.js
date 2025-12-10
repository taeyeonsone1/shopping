const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'shopping_db'
});

connection.connect((err) => {
    if (err) {
        console.error('连接错误:', err);
        return;
    }
    console.log('已连接到MySQL数据库');
    
    // 1. 先插入用户数据
    console.log('\n👥 生成用户数据...');
    
    // 清空用户表
    connection.query('DELETE FROM users', () => {
        console.log('已清空用户表');
        
        const users = [
            {
                username: 'zhangsan',
                email: 'zhangsan@example.com',
                phone: '13800138001',
                password: '123456'
            },
            {
                username: 'lisi',
                email: 'lisi@example.com',
                phone: '13800138002',
                password: '123456'
            },
            {
                username: 'wangwu',
                email: 'wangwu@example.com',
                phone: '13800138003',
                password: '123456'
            },
            {
                username: 'admin',
                email: 'admin@example.com',
                phone: '13800138004',
                password: 'admin123'
            },
            {
                username: 'shopper',
                email: 'shopper@example.com',
                phone: '13800138005',
                password: 'shop123'
            }
        ];
        
        let usersInserted = 0;
        users.forEach((user, index) => {
            const sql = 'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)';
            
            connection.query(sql, [user.username, user.email, user.phone, user.password], (err, result) => {
                if (err) {
                    console.error('插入用户错误:', err);
                } else {
                    console.log(`✅ 插入用户: ${user.username} (ID: ${result.insertId})`);
                    usersInserted++;
                }
                
                if (usersInserted === users.length) {
                    console.log(`\n👤 成功插入 ${usersInserted} 个用户`);
                    insertFavorites();
                }
            });
        });
    });
    
    // 2. 随机选择商品插入收藏表
    function insertFavorites() {
        console.log('\n🎯 随机选择商品插入收藏表...');
        connection.query('SELECT id FROM products ORDER BY RAND() LIMIT 5', (err, products) => {
            if (err) {
                console.error('查询商品错误:', err);
                return;
            }
            
            console.log('选中的商品ID:', products.map(p => p.id));
            
            // 清空收藏表
            connection.query('DELETE FROM favorites', () => {
                console.log('已清空收藏表');
                
                // 插入随机收藏数据
                let favoritesInserted = 0;
                products.forEach((product, index) => {
                    const userId = (index % 5) + 1; // 用户ID: 1, 2, 3, 4, 5
                    const sql = 'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)';
                    
                    connection.query(sql, [userId, product.id], (err) => {
                        if (err) {
                            console.error('插入收藏错误:', err);
                        } else {
                            console.log(`✅ 用户${userId}收藏了商品ID ${product.id}`);
                            favoritesInserted++;
                        }
                        
                        if (favoritesInserted === products.length) {
                            console.log(`\n📚 成功插入 ${favoritesInserted} 条收藏记录`);
                            showResults();
                        }
                    });
                });
            });
        });
    }
    
    // 3. 显示结果
    function showResults() {
        console.log('\n📊 查看插入结果...');
        
        // 查看用户
        connection.query('SELECT id, username, email, phone FROM users', (err, users) => {
            if (!err) {
                console.log('\n👤 用户列表：');
                users.forEach(user => {
                    console.log(`  ID: ${user.id}, 用户名: ${user.username}, 邮箱: ${user.email}, 电话: ${user.phone}`);
                });
            }
            
            // 查看收藏
            connection.query(`
                SELECT f.id, u.username, p.name as product_name, p.price, p.category, f.created_at 
                FROM favorites f 
                JOIN users u ON f.user_id = u.id 
                JOIN products p ON f.product_id = p.id 
                ORDER BY f.created_at DESC
            `, (err, favorites) => {
                if (!err) {
                    console.log('\n❤️ 收藏记录：');
                    favorites.forEach(fav => {
                        console.log(`  ID: ${fav.id}, 用户: ${fav.username}, 商品: ${fav.product_name}, 价格: ¥${fav.price}, 分类: ${fav.category}`);
                    });
                }
                
                console.log('\n🎉 样本数据插入完成！');
                connection.end();
            });
        });
    }
});