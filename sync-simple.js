// 简化的商品同步脚本
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');

// 连接到数据库
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('数据库连接错误:', err.message);
        process.exit(1);
    }
    console.log('已连接到SQLite数据库');
});

// 同步函数
function syncProducts() {
    console.log('开始同步商品数据...');
    
    // 清空商品表
    db.run('DELETE FROM products', (err) => {
        if (err) {
            console.error('清空商品表错误:', err);
            db.close();
            return;
        }
        console.log('✓ 已清空商品表');
        
        // 重新初始化数据库
        const { exec } = require('child_process');
        exec('node init-db.js', (error, stdout, stderr) => {
            if (error) {
                console.error('初始化数据库错误:', error);
            } else {
                console.log('数据库初始化完成');
                console.log(stdout);
            }
            
            // 验证数据库中的商品数量
            db.get('SELECT COUNT(*) as count FROM products', (err, result) => {
                if (err) {
                    console.error('验证商品数量错误:', err);
                } else {
                    console.log(`\n✓ 同步完成！`);
                    console.log(`数据库中的商品数量: ${result.count} 个`);
                }
                
                db.close();
                console.log('数据库连接已关闭');
            });
        });
    });
}

// 执行同步
syncProducts();