const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // 提供静态文件服务

// 数据库连接
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('数据库连接错误:', err.message);
    } else {
        console.log('已连接到SQLite数据库');
    }
});

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
    try {
        const { username, email, phone, password } = req.body;

        // 验证输入
        if (!username || !email || !phone || !password) {
            return res.status(400).json({ error: '请填写所有必填字段' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: '密码长度至少6个字符' });
        }

        // 检查用户名是否已存在
        db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: '数据库错误' });
            }
            if (user) {
                return res.status(400).json({ error: '用户名已存在' });
            }

            // 检查邮箱是否已注册
            db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
                if (err) {
                    return res.status(500).json({ error: '数据库错误' });
                }
                if (user) {
                    return res.status(400).json({ error: '邮箱已被注册' });
                }

                // 加密密码
                const hashedPassword = await bcrypt.hash(password, 10);

                // 插入新用户
                db.run(
                    'INSERT INTO users (username, email, phone, password, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
                    [username, email, phone, hashedPassword],
                    function(err) {
                        if (err) {
                            return res.status(500).json({ error: '注册失败' });
                        }

                        // 生成JWT令牌
                        const token = jwt.sign(
                            { id: this.lastID, username, email },
                            JWT_SECRET,
                            { expiresIn: '7d' }
                        );

                        res.json({
                            message: '注册成功',
                            token,
                            user: {
                                id: this.lastID,
                                username,
                                email,
                                phone
                            }
                        });
                    }
                );
            });
        });
    } catch (error) {
        res.status(500).json({ error: '服务器错误' });
    }
});

// 用户登录
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: '请输入用户名和密码' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: '数据库错误' });
        }

        if (!user) {
            return res.status(401).json({ error: '用户名或密码错误' });
        }

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
    });
});

// 获取当前用户信息
app.get('/api/user', authenticateToken, (req, res) => {
    db.get('SELECT id, username, email, phone, created_at FROM users WHERE id = ?', [req.user.id], (err, user) => {
        if (err) {
            return res.status(500).json({ error: '数据库错误' });
        }
        if (!user) {
            return res.status(404).json({ error: '用户不存在' });
        }
        res.json(user);
    });
});

// ========== 商品相关API ==========

// 获取所有商品
app.get('/api/products', (req, res) => {
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

    db.all(query, params, (err, products) => {
        if (err) {
            return res.status(500).json({ error: '数据库错误' });
        }

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

        db.get(countQuery, countParams, (err, result) => {
            if (err) {
                return res.status(500).json({ error: '数据库错误' });
            }

            res.json({
                products: products.map(p => ({
                    ...p,
                    reviews: JSON.parse(p.reviews || '[]')
                })),
                total: result.total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(result.total / parseInt(limit))
            });
        });
    });
});

// 获取单个商品详情
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
        if (err) {
            return res.status(500).json({ error: '数据库错误' });
        }
        if (!product) {
            return res.status(404).json({ error: '商品不存在' });
        }

        res.json({
            ...product,
            reviews: JSON.parse(product.reviews || '[]')
        });
    });
});

// ========== 平替方案相关API ==========

// 获取所有平替方案
app.get('/api/alternatives', (req, res) => {
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
        query += ' ORDER BY (a.savings * 1.0 / p1.price) DESC';
    } else {
        query += ' ORDER BY a.id ASC';
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: '数据库错误' });
        }

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
    });
});

// ========== 收藏相关API ==========

// 获取用户收藏
app.get('/api/favorites', authenticateToken, (req, res) => {
    db.all(
        `SELECT p.* FROM favorites f
         JOIN products p ON f.product_id = p.id
         WHERE f.user_id = ?`,
        [req.user.id],
        (err, products) => {
            if (err) {
                return res.status(500).json({ error: '数据库错误' });
            }

            res.json(products.map(p => ({
                ...p,
                reviews: JSON.parse(p.reviews || '[]')
            })));
        }
    );
});

// 添加收藏
app.post('/api/favorites', authenticateToken, (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ error: '请提供商品ID' });
    }

    // 检查是否已收藏
    db.get(
        'SELECT * FROM favorites WHERE user_id = ? AND product_id = ?',
        [req.user.id, productId],
        (err, favorite) => {
            if (err) {
                return res.status(500).json({ error: '数据库错误' });
            }

            if (favorite) {
                return res.status(400).json({ error: '该商品已在收藏列表中' });
            }

            db.run(
                'INSERT INTO favorites (user_id, product_id, created_at) VALUES (?, ?, datetime("now"))',
                [req.user.id, productId],
                function(err) {
                    if (err) {
                        return res.status(500).json({ error: '添加收藏失败' });
                    }

                    res.json({ message: '已添加收藏', id: this.lastID });
                }
            );
        }
    );
});

// 取消收藏
app.delete('/api/favorites/:productId', authenticateToken, (req, res) => {
    const { productId } = req.params;

    db.run(
        'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
        [req.user.id, productId],
        function(err) {
            if (err) {
                return res.status(500).json({ error: '取消收藏失败' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: '收藏不存在' });
            }

            res.json({ message: '已取消收藏' });
        }
    );
});

// 检查是否已收藏
app.get('/api/favorites/check/:productId', authenticateToken, (req, res) => {
    const { productId } = req.params;

    db.get(
        'SELECT * FROM favorites WHERE user_id = ? AND product_id = ?',
        [req.user.id, productId],
        (err, favorite) => {
            if (err) {
                return res.status(500).json({ error: '数据库错误' });
            }

            res.json({ isFavorite: !!favorite });
        }
    );
});

// ========== 评价相关API ==========

// 添加商品评价
app.post('/api/products/:id/reviews', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({ error: '请提供评分和评论' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: '评分必须在1-5之间' });
    }

    // 获取商品信息
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
        if (err) {
            return res.status(500).json({ error: '数据库错误' });
        }
        if (!product) {
            return res.status(404).json({ error: '商品不存在' });
        }

        // 获取用户信息
        db.get('SELECT username FROM users WHERE id = ?', [req.user.id], (err, user) => {
            if (err) {
                return res.status(500).json({ error: '数据库错误' });
            }

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
            db.run(
                'UPDATE products SET reviews = ?, rating = ? WHERE id = ?',
                [JSON.stringify(reviews), newRating, id],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: '添加评价失败' });
                    }

                    res.json({
                        message: '评价添加成功',
                        reviews: reviews,
                        rating: parseFloat(newRating)
                    });
                }
            );
        });
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});

// 优雅关闭
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('数据库连接已关闭');
        process.exit(0);
    });
});

