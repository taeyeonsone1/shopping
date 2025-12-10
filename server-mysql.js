const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// MySQL数据库配置
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'shopping_db',
    charset: 'utf8mb4'
};

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // 提供静态文件服务

// 数据库连接池
let pool;

async function initDB() {
    try {
        pool = mysql.createPool({
            ...dbConfig,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('已连接到MySQL数据库');
        return pool;
    } catch (error) {
        console.error('数据库连接失败:', error.message);
        process.exit(1);
    }
}

// JWT验证中间件
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: '未提供访问令牌' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: '无效的访问令牌' });
        }
        req.user = user;
        next();
    });
};

// ========== 用户相关API ==========

// 用户注册
app.post('/api/register', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { username, email, phone, password } = req.body;

        // 验证输入
        if (!username || !email || !phone || !password) {
            return res.status(400).json({ error: '请填写所有必填字段' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: '密码长度至少6个字符' });
        }

        // 检查用户名是否已存在
        const [existingUsers] = await connection.execute(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: '用户名已存在' });
        }

        // 检查邮箱是否已注册
        const [existingEmails] = await connection.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );
        if (existingEmails.length > 0) {
            return res.status(400).json({ error: '邮箱已被注册' });
        }

        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 插入新用户
        const [result] = await connection.execute(
            'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)',
            [username, email, phone, hashedPassword]
        );

        // 生成JWT令牌
        const token = jwt.sign(
            { id: result.insertId, username, email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: '注册成功',
            token,
            user: {
                id: result.insertId,
                username,
                email,
                phone
            }
        });
    } catch (error) {
        console.error('注册错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// 用户登录
app.post('/api/login', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: '请输入用户名和密码' });
        }

        const [users] = await connection.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: '用户名或密码错误' });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: '用户名或密码错误' });
        }

        // 生成JWT令牌
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: '登录成功',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// 获取当前用户信息
app.get('/api/user', authenticateToken, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [users] = await connection.execute(
            'SELECT id, username, email, phone, created_at FROM users WHERE id = ?',
            [req.user.id]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ error: '用户不存在' });
        }
        
        res.json(users[0]);
    } catch (error) {
        console.error('获取用户信息错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// ========== 商品相关API ==========

// 获取所有商品
app.get('/api/products', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { category, price, rating, search, sort, page = 1, limit = 12 } = req.query;
        
        let query = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        if (price) {
            if (price === '1000+') {
                query += ' AND price >= ?';
                params.push(1000);
            } else {
                const [min, max] = price.split('-').map(Number);
                query += ' AND price >= ? AND price <= ?';
                params.push(min, max);
            }
        }

        if (rating) {
            const minRating = parseFloat(rating);
            query += ' AND rating >= ?';
            params.push(minRating);
        }

        if (search) {
            query += ' AND name LIKE ?';
            params.push(`%${search}%`);
        }

        // 排序
        if (sort === 'price-asc') {
            query += ' ORDER BY price ASC';
        } else if (sort === 'price-desc') {
            query += ' ORDER BY price DESC';
        } else if (sort === 'rating') {
            query += ' ORDER BY rating DESC';
        } else if (sort === 'name') {
            query += ' ORDER BY name ASC';
        } else {
            query += ' ORDER BY id ASC';
        }

        // 分页
        const offset = (parseInt(page) - 1) * parseInt(limit);
        query += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), offset);

        const [products] = await connection.execute(query, params);

        // 获取总数
        let countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
        const countParams = [];

        if (category) {
            countQuery += ' AND category = ?';
            countParams.push(category);
        }
        if (price) {
            if (price === '1000+') {
                countQuery += ' AND price >= ?';
                countParams.push(1000);
            } else {
                const [min, max] = price.split('-').map(Number);
                countQuery += ' AND price >= ? AND price <= ?';
                countParams.push(min, max);
            }
        }
        if (rating) {
            countQuery += ' AND rating >= ?';
            countParams.push(parseFloat(rating));
        }
        if (search) {
            countQuery += ' AND name LIKE ?';
            countParams.push(`%${search}%`);
        }

        const [countResult] = await connection.execute(countQuery, countParams);

        res.json({
            products: products.map(p => ({
                ...p,
                reviews: JSON.parse(p.reviews || '[]')
            })),
            total: countResult[0].total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(countResult[0].total / parseInt(limit))
        });
    } catch (error) {
        console.error('获取商品错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// 获取单个商品详情
app.get('/api/products/:id', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { id } = req.params;

        const [products] = await connection.execute(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );
        
        if (products.length === 0) {
            return res.status(404).json({ error: '商品不存在' });
        }

        const product = products[0];
        res.json({
            ...product,
            reviews: JSON.parse(product.reviews || '[]')
        });
    } catch (error) {
        console.error('获取商品详情错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// ========== 平替方案相关API ==========

// 获取所有平替方案
app.get('/api/alternatives', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { category, savings, sort } = req.query;

        let query = `
            SELECT a.*, 
                   p1.name as original_name, p1.price as original_price, p1.image as original_image,
                   p2.name as replacement_name, p2.price as replacement_price, p2.image as replacement_image
            FROM alternatives a
            JOIN products p1 ON a.original_id = p1.id
            JOIN products p2 ON a.replacement_id = p2.id
            WHERE 1=1
        `;
        const params = [];

        if (category) {
            query += ' AND p1.category = ?';
            params.push(category);
        }

        if (savings) {
            if (savings === '5000+') {
                query += ' AND a.savings >= ?';
                params.push(5000);
            } else if (savings === '2000-5000') {
                query += ' AND a.savings >= ? AND a.savings < ?';
                params.push(2000, 5000);
            } else if (savings === '1000-2000') {
                query += ' AND a.savings >= ? AND a.savings < ?';
                params.push(1000, 2000);
            } else if (savings === '0-1000') {
                query += ' AND a.savings < ?';
                params.push(1000);
            }
        }

        if (sort === 'savings-desc') {
            query += ' ORDER BY a.savings DESC';
        } else if (sort === 'savings-asc') {
            query += ' ORDER BY a.savings ASC';
        } else if (sort === 'percentage-desc') {
            query += ' ORDER BY (a.savings / p1.price) DESC';
        } else {
            query += ' ORDER BY a.id ASC';
        }

        const [rows] = await connection.execute(query, params);

        const alternatives = rows.map(row => ({
            id: row.id,
            original: {
                id: row.original_id,
                name: row.original_name,
                price: row.original_price,
                image: row.original_image
            },
            replacement: {
                id: row.replacement_id,
                name: row.replacement_name,
                price: row.replacement_price,
                image: row.replacement_image
            },
            savings: row.savings,
            reason: row.reason
        }));

        res.json(alternatives);
    } catch (error) {
        console.error('获取平替方案错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// ========== 收藏相关API ==========

// 获取用户收藏
app.get('/api/favorites', authenticateToken, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [products] = await connection.execute(
            `SELECT p.* FROM favorites f
             JOIN products p ON f.product_id = p.id
             WHERE f.user_id = ?`,
            [req.user.id]
        );

        res.json(products.map(p => ({
            ...p,
            reviews: JSON.parse(p.reviews || '[]')
        })));
    } catch (error) {
        console.error('获取收藏错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// 添加收藏
app.post('/api/favorites', authenticateToken, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: '请提供商品ID' });
        }

        // 检查是否已收藏
        const [existing] = await connection.execute(
            'SELECT * FROM favorites WHERE user_id = ? AND product_id = ?',
            [req.user.id, productId]
        );
        
        if (existing.length > 0) {
            return res.status(400).json({ error: '该商品已在收藏列表中' });
        }

        const [result] = await connection.execute(
            'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)',
            [req.user.id, productId]
        );

        res.json({ message: '已添加收藏', id: result.insertId });
    } catch (error) {
        console.error('添加收藏错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// 取消收藏
app.delete('/api/favorites/:productId', authenticateToken, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { productId } = req.params;

        const [result] = await connection.execute(
            'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
            [req.user.id, productId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: '收藏不存在' });
        }

        res.json({ message: '已取消收藏' });
    } catch (error) {
        console.error('取消收藏错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// 检查是否已收藏
app.get('/api/favorites/check/:productId', authenticateToken, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { productId } = req.params;

        const [favorites] = await connection.execute(
            'SELECT * FROM favorites WHERE user_id = ? AND product_id = ?',
            [req.user.id, productId]
        );

        res.json({ isFavorite: favorites.length > 0 });
    } catch (error) {
        console.error('检查收藏状态错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// ========== 评价相关API ==========

// 添加商品评价
app.post('/api/products/:id/reviews', authenticateToken, async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const { id } = req.params;
        const { rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ error: '请提供评分和评论' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: '评分必须在1-5之间' });
        }

        // 获取商品信息
        const [products] = await connection.execute(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );
        
        if (products.length === 0) {
            return res.status(404).json({ error: '商品不存在' });
        }

        const product = products[0];

        // 获取用户信息
        const [users] = await connection.execute(
            'SELECT username FROM users WHERE id = ?',
            [req.user.id]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ error: '用户不存在' });
        }

        const user = users[0];
        const reviews = JSON.parse(product.reviews || '[]');
        reviews.push({
            author: user.username,
            rating: parseInt(rating),
            comment: comment,
            date: new Date().toISOString()
        });

        // 计算新平均评分
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const newRating = (totalRating / reviews.length).toFixed(1);

        // 更新商品
        await connection.execute(
            'UPDATE products SET reviews = ?, rating = ? WHERE id = ?',
            [JSON.stringify(reviews), newRating, id]
        );

        res.json({
            message: '评价添加成功',
            reviews: reviews,
            rating: parseFloat(newRating)
        });
    } catch (error) {
        console.error('添加评价错误:', error);
        res.status(500).json({ error: '服务器错误' });
    } finally {
        if (connection) connection.release();
    }
});

// 启动服务器
async function startServer() {
    await initDB();
    app.listen(PORT, () => {
        console.log(`服务器运行在 http://localhost:${PORT}`);
        console.log('使用MySQL数据库');
    });
}

startServer();

// 优雅关闭
process.on('SIGINT', async () => {
    if (pool) {
        await pool.end();
        console.log('数据库连接池已关闭');
    }
    process.exit(0);
});