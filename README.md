# 购物推荐网站

一个简化版的购物推荐网站，重点展示昂贵商品的平替方案。

## 功能特点

- ✅ 商品浏览和搜索
- ✅ 商品分类筛选（9大品类）
- ✅ 商品详情查看
- ✅ **平替方案推荐**（核心功能，30+方案）
- ✅ **用户注册和登录**（完善版）
- ✅ 商品收藏
- ✅ 用户评价
- ✅ **后端API服务**
- ✅ **SQLite数据库**

## 技术栈

### 前端
- HTML5
- CSS3
- JavaScript (ES6+)
- 响应式设计

### 后端
- Node.js
- Express.js
- SQLite3
- JWT认证
- bcryptjs密码加密

## 项目结构

```
├── index.html              # 首页
├── products.html           # 商品列表页
├── product-detail.html     # 商品详情页
├── alternatives.html       # 平替推荐页
├── login.html              # 登录页
├── register.html           # 注册页
├── favorites.html          # 收藏页
├── server.js               # 后端服务器
├── init-db.js              # 数据库初始化脚本
├── package.json            # 项目依赖配置
├── database.db             # SQLite数据库（运行后生成）
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── data.js            # 商品数据（用于初始化）
│   ├── api.js             # API客户端
│   ├── imageHelper.js     # 图片助手
│   ├── main.js            # 主要功能
│   ├── products.js        # 商品列表功能
│   ├── product-detail.js  # 商品详情功能
│   ├── alternatives.js    # 平替推荐功能
│   ├── login.js           # 登录功能
│   ├── register.js        # 注册功能
│   ├── favorites.js       # 收藏功能
│   └── banner.js          # 横幅功能
└── README.md
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 初始化数据库

```bash
npm run init-db
```

这将创建SQLite数据库并导入所有商品数据和平替方案。

### 3. 启动服务器

```bash
npm start
```

或者使用开发模式（自动重启）：

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动。

### 4. 访问网站

在浏览器中打开 `http://localhost:3000/index.html`

## API接口

### 用户相关
- `POST /api/register` - 用户注册
- `POST /api/login` - 用户登录
- `GET /api/user` - 获取当前用户信息（需要认证）

### 商品相关
- `GET /api/products` - 获取商品列表（支持筛选、排序、分页）
- `GET /api/products/:id` - 获取商品详情

### 平替方案相关
- `GET /api/alternatives` - 获取平替方案列表（支持筛选、排序）

### 收藏相关
- `GET /api/favorites` - 获取用户收藏（需要认证）
- `POST /api/favorites` - 添加收藏（需要认证）
- `DELETE /api/favorites/:productId` - 取消收藏（需要认证）
- `GET /api/favorites/check/:productId` - 检查是否已收藏（需要认证）

### 评价相关
- `POST /api/products/:id/reviews` - 添加商品评价（需要认证）

## 数据库结构

### users 表
- id (主键)
- username (用户名，唯一)
- email (邮箱，唯一)
- phone (手机号)
- password (加密密码)
- created_at (创建时间)

### products 表
- id (主键)
- name (商品名称)
- price (价格)
- category (分类)
- image (图片URL)
- rating (评分)
- description (描述)
- reviews (评价JSON)
- created_at (创建时间)

### alternatives 表
- id (主键)
- original_id (原商品ID，外键)
- replacement_id (平替商品ID，外键)
- savings (节省金额)
- reason (推荐理由)
- created_at (创建时间)

### favorites 表
- id (主键)
- user_id (用户ID，外键)
- product_id (商品ID，外键)
- created_at (创建时间)

## 注意事项

- 默认JWT密钥为 `your-secret-key-change-in-production`，生产环境请修改
- 数据库文件 `database.db` 会在首次运行时自动创建
- 前端代码包含API失败时的本地数据后备方案
- 所有密码使用bcryptjs加密存储
- API请求需要JWT token认证（除了注册、登录和商品查询）

## 开发说明

- 修改商品数据：编辑 `js/data.js`，然后重新运行 `npm run init-db`
- 修改API端口：编辑 `server.js` 中的 `PORT` 变量
- 修改API地址：编辑 `js/api.js` 中的 `API_BASE_URL`
