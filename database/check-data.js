const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'shopping_db'
});

connection.connect(() => {
    console.log('🔍 查看商品分类统计：');
    
    connection.query('SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY count DESC', (err, results) => {
        if (!err) {
            console.log('\n📊 商品分类统计：');
            results.forEach(row => {
                console.log(`  ${row.category}: ${row.count} 件`);
            });
        }
        
        connection.query('SELECT COUNT(*) as total FROM products', (err, result) => {
            if (!err) {
                console.log(`\n🛒 数据库中商品总数：${result[0].total} 条`);
            }
            console.log('\n🎉 数据检查完成！');
            connection.end();
        });
    });
});