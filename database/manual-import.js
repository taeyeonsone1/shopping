const mysql = require('mysql2');

// MySQL数据库配置
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

// 示例数据格式
const sampleProducts = [
    {
        name: "示例商品1",
        price: 299.99,
        category: "electronics",
        description: "这是一个示例商品描述",
        image: "https://picsum.photos/seed/sample1/400/300"
    },
    {
        name: "示例商品2", 
        price: 199.99,
        category: "clothing",
        description: "这是另一个示例商品描述",
        image: "https://picsum.photos/seed/sample2/400/300"
    }
];

console.log('请将Excel数据复制到这里，格式如下：');
console.log('每行一个商品，包含：商品名称,价格,分类,描述');
console.log('例如：');
console.log('iPhone 15 Pro,8999,electronics,苹果最新旗舰手机');
console.log('小米14 Pro,4999,electronics,小米旗舰手机');
console.log('');
console.log('或者，你可以：');
console.log('1. 将Excel另存为CSV文件（products_data.csv）');
console.log('2. 运行: node import-csv-products.js');
console.log('');
console.log('当前将插入示例数据用于测试...');

async function insertProducts() {
    let successCount = 0;
    
    for (let i = 0; i < sampleProducts.length; i++) {
        const product = sampleProducts[i];
        const id = 1000 + i;
        
        const sql = `
            INSERT INTO products (id, name, price, category, image, rating, description, reviews) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const values = [
            id,
            product.name,
            product.price,
            product.category,
            product.image,
            4.5, // 默认评分
            product.description,
            JSON.stringify([]) // 默认空评论
        ];
        
        await new Promise((resolve) => {
            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.error(`插入错误：`, err.message);
                } else {
                    successCount++;
                    console.log(`✅ 插入成功：${product.name}`);
                }
                resolve();
            });
        });
    }
    
    // 查询总数
    connection.query('SELECT COUNT(*) as total FROM products', (err, result) => {
        if (!err) {
            console.log(`🛒 数据库中商品总数：${result[0].total} 条`);
        }
        console.log('\n🎉 示例数据插入完成！');
        connection.end();
    });
}

insertProducts();

// 提供手动输入功能
process.stdin.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    
    if (lines.length > 0 && lines[0] !== '') {
        console.log('\n检测到输入数据，开始插入...');
        insertManualData(lines);
    }
});

async function insertManualData(lines) {
    let successCount = 0;
    let startIndex = 1000; // 从1000开始ID
    
    // 先获取当前最大ID
    connection.query('SELECT MAX(id) as maxId FROM products', (err, result) => {
        if (!err && result[0].maxId) {
            startIndex = result[0].maxId + 1;
        }
        
        insertDataFromLines();
    });
    
    function insertDataFromLines() {
        lines.forEach(async (line, index) => {
            const parts = line.split(',').map(part => part.trim());
            if (parts.length >= 3) {
                const [name, price, category, description = ''] = parts;
                const numPrice = parseFloat(price);
                
                if (name && !isNaN(numPrice) && numPrice > 0) {
                    const id = startIndex + index;
                    
                    const sql = `
                        INSERT INTO products (id, name, price, category, image, rating, description, reviews) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `;
                    
                    const values = [
                        id,
                        name,
                        numPrice,
                        category,
                        '', // 图片留空
                        4.5, // 默认评分
                        description,
                        JSON.stringify([]) // 默认空评论
                    ];
                    
                    connection.query(sql, values, (err, result) => {
                        if (!err) {
                            successCount++;
                            if (successCount % 10 === 0) {
                                console.log(`已插入 ${successCount} 条数据...`);
                            }
                        }
                    });
                }
            }
        });
        
        setTimeout(() => {
            connection.query('SELECT COUNT(*) as total FROM products', (err, result) => {
                if (!err) {
                    console.log(`\n🛒 数据库中商品总数：${result[0].total} 条`);
                }
                console.log(`✅ 新增插入：${successCount} 条`);
                connection.end();
            });
        }, 2000);
    }
}