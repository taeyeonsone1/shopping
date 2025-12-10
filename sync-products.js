// 同步500种商品到数据库的脚本
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
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

// 读取所有商品数据
function loadAllProducts() {
    try {
        // 读取主要商品数据文件
        const dataFile = fs.readFileSync('./js/data.js', 'utf8');
        
        // 提取products数组
        const productsMatch = dataFile.match(/const products = (\[[\s\S]*?\]);/);
        if (!productsMatch) {
            throw new Error('无法解析主要商品数据');
        }
        
        // 读取新生成的商品数据
        const newProductsFile = fs.readFileSync('./new-products.js', 'utf8');
        const newProductsMatch = newProductsFile.match(/const newProducts = (\[[\s\S]*?\]);/);
        if (!newProductsMatch) {
            throw new Error('无法解析新商品数据');
        }
        
        // 使用Function构造器安全地解析JSON
        const mainProducts = eval(productsMatch[1]);
        const newProducts = eval(newProductsMatch[1]);
        
        // 合并所有商品数据
        const allProducts = [...mainProducts, ...newProducts];
        
        console.log(`读取到 ${mainProducts.length} 个主要商品`);
        console.log(`读取到 ${newProducts.length} 个新商品`);
        console.log(`总计 ${allProducts.length} 个商品`);
        
        return allProducts;
    } catch (error) {
        console.error('数据加载错误:', error.message);
        process.exit(1);
    }
}

// 同步商品数据到数据库
function syncProductsToDatabase() {
    const allProducts = loadAllProducts();
    
    db.serialize(() => {
        // 清空现有商品数据
        db.run('DELETE FROM products', (err) => {
            if (err) {
                console.error('清空商品表错误:', err);
            } else {
                console.log('✓ 已清空商品表');
            }
        });
        
        // 插入所有商品数据
        const insertProduct = db.prepare(`INSERT INTO products 
            (id, name, price, category, image, rating, description, reviews) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
        
        let successCount = 0;
        let errorCount = 0;
        
        allProducts.forEach(product => {
            insertProduct.run(
                product.id,
                product.name,
                product.price,
                product.category,
                product.image || '',
                product.rating || 0,
                product.description || '',
                JSON.stringify(product.reviews || [])
            , (err) => {
                if (err) {
                    console.error(`插入商品 ${product.id} 失败:`, err);
                    errorCount++;
                } else {
                    successCount++;
                }
            });
        });
        
        insertProduct.finalize((err) => {
            if (err) {
                console.error('插入商品数据错误:', err);
            } else {
                console.log(`\n✓ 同步完成！`);
                console.log(`成功插入: ${successCount} 个商品`);
                console.log(`失败数量: ${errorCount} 个商品`);
                console.log(`总计商品: ${allProducts.length} 个`);
                
                // 验证数据库中的商品数量
                db.get('SELECT COUNT(*) as count FROM products', (err, result) => {
                    if (err) {
                        console.error('验证商品数量错误:', err);
                    } else {
                        console.log(`数据库中的商品数量: ${result.count} 个`);
                    }
                    
                    db.close();
                    console.log('数据库连接已关闭');
                });
            }
        });
    });
}

// 执行同步
console.log('开始同步500种商品到数据库...');
syncProductsToDatabase();