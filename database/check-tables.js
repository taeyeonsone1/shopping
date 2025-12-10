const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'shopping_db'
});

connection.connect(() => {
    console.log('🔍 检查表结构...\n');
    
    // 检查用户表结构
    connection.query('DESCRIBE users', (err, results) => {
        if (!err) {
            console.log('👤 用户表结构：');
            results.forEach(row => {
                console.log(`  ${row.Field}: ${row.Type}`);
            });
        }
        
        // 检查收藏表结构
        connection.query('DESCRIBE favorites', (err, results) => {
            if (!err) {
                console.log('\n❤️ 收藏表结构：');
                results.forEach(row => {
                    console.log(`  ${row.Field}: ${row.Type}`);
                });
            }
            connection.end();
        });
    });
});