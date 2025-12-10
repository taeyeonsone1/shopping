// 生成更多商品数据的脚本
const fs = require('fs');

// 读取现有数据文件
const dataFile = fs.readFileSync('./js/data.js', 'utf8');

// 商品分类和模板
const categories = [
    { name: 'electronics', display: '📱 电子产品', desc: '采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。' },
    { name: 'clothing', display: '👔 服装配饰', desc: '精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。' },
    { name: 'cosmetics', display: '💄 美妆护肤', desc: '精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。' },
    { name: 'home', display: '🏠 家居用品', desc: '设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。' },
    { name: 'sports', display: '⚽ 运动健身', desc: '专业设计，性能出色，助力运动表现。适合热爱运动的用户。' },
    { name: 'food', display: '🍔 食品饮料', desc: '精选原料，新鲜美味，营养健康。适合追求品质生活的用户。' },
    { name: 'books', display: '📚 图书文具', desc: '内容丰富，知识性强，提升学习效率。适合热爱学习的用户。' },
    { name: 'baby', display: '👶 母婴用品', desc: '安全可靠，贴心设计，呵护宝宝成长。适合新手父母。' },
    { name: 'car', display: '🚗 汽车用品', desc: '品质可靠，性能出色，安全耐用。适合爱车人士。' }
];

// 商品名称模板
const productTemplates = {
    electronics: [
        '智能手表', '平板电脑', '笔记本电脑', '台式电脑', '显示器', '键盘', '鼠标', '路由器',
        '智能音箱', '智能家居', '智能门锁', '智能摄像头', '智能插座', '智能灯泡', '智能窗帘',
        '蓝牙耳机', '有线耳机', '游戏耳机', '录音笔', '翻译器', '电子书阅读器', '投影仪',
        '打印机', '扫描仪', '复印机', '传真机', '电话机', '对讲机', '收音机', 'MP3播放器',
        'VR眼镜', '游戏手柄', '游戏机', '无人机', '运动相机', '行车记录仪', 'GPS导航',
        '车载充电器', '车载冰箱', '车载吸尘器', '车载空气净化器', '车载按摩器'
    ],
    clothing: [
        'T恤', '衬衫', '毛衣', '卫衣', '夹克', '风衣', '大衣', '羽绒服', '皮衣', '西装',
        '马甲', '背心', '裙子', '连衣裙', '半身裙', '裤子', '牛仔裤', '休闲裤', '运动裤',
        '短裤', '打底裤', '丝袜', '袜子', '内衣', '睡衣', '泳衣', '泳裤', '帽子', '围巾',
        '手套', '腰带', '领带', '领结', '袖扣', '胸针', '发夹', '发带', '头绳', '太阳镜',
        '眼镜框', '手表', '手链', '项链', '耳环', '戒指', '脚链', '背包', '手提包', '钱包'
    ],
    cosmetics: [
        '洗面奶', '爽肤水', '精华液', '乳液', '面霜', '眼霜', '面膜', '防晒霜', '隔离霜',
        '粉底液', '粉饼', '散粉', '腮红', '眼影', '眼线笔', '睫毛膏', '眉笔', '口红',
        '唇彩', '唇膏', '指甲油', '香水', '身体乳', '沐浴露', '洗发水', '护发素',
        '发膜', '护发精油', '发胶', '发蜡', '染发剂', '烫发水', '脱毛膏', '剃须刀',
        '剃须膏', '牙刷牙膏', '漱口水', '牙线', '化妆棉', '化妆刷', '美容仪', '蒸脸器'
    ],
    home: [
        '沙发', '茶几', '电视柜', '餐桌', '餐椅', '书桌', '书柜', '衣柜', '床', '床头柜',
        '鞋柜', '置物架', '屏风', '窗帘', '地毯', '墙纸', '灯具', '台灯', '落地灯',
        '吊灯', '壁灯', '吸顶灯', '灯泡', '开关', '插座', '电线', '水管', '水龙头',
        '马桶', '浴缸', '淋浴房', '洗手盆', '镜子', '毛巾架', '浴帘', '垃圾桶', '扫把',
        '拖把', '吸尘器', '洗衣机', '冰箱', '空调', '热水器', '微波炉', '电磁炉', '电饭煲'
    ],
    sports: [
        '篮球', '足球', '排球', '乒乓球', '羽毛球', '网球', '高尔夫球', '保龄球', '棒球',
        '橄榄球', '飞盘', '毽子', '跳绳', '哑铃', '杠铃', '健身车', '跑步机', '椭圆机',
        '划船机', '瑜伽垫', '瑜伽球', '拉力带', '护腕', '护膝', '护肘', '头盔', '手套',
        '运动鞋', '运动服', '运动包', '水壶', '计步器', '心率表', '运动手表', '泳镜',
        '泳帽', '浮板', '潜水镜', '滑雪板', '滑雪杖', '滑板', '轮滑鞋', '自行车', '头盔'
    ],
    food: [
        '大米', '面粉', '面条', '面包', '饼干', '蛋糕', '巧克力', '糖果', '薯片', '坚果',
        '瓜子', '花生', '核桃', '杏仁', '腰果', '开心果', '葡萄干', '红枣', '枸杞',
        '茶叶', '咖啡', '果汁', '牛奶', '酸奶', '豆浆', '矿泉水', '碳酸饮料', '运动饮料',
        '啤酒', '红酒', '白酒', '黄酒', '米酒', '酱油', '醋', '盐', '糖', '味精',
        '鸡精', '胡椒粉', '辣椒粉', '花椒', '八角', '桂皮', '香叶', '食用油', '芝麻油'
    ],
    books: [
        '小说', '散文', '诗歌', '传记', '历史', '哲学', '心理学', '经济学', '管理学',
        '法律', '医学', '科技', '计算机', '编程', '数学', '物理', '化学', '生物',
        '地理', '天文', '艺术', '音乐', '绘画', '摄影', '设计', '建筑', '烹饪',
        '旅游', '体育', '游戏', '动漫', '杂志', '报纸', '教材', '词典', '百科全书',
        '笔记本', '钢笔', '铅笔', '圆珠笔', '毛笔', '墨水', '橡皮', '尺子', '计算器'
    ],
    baby: [
        '奶粉', '尿不湿', '奶瓶', '奶嘴', '辅食', '婴儿车', '婴儿床', '安全座椅', '学步车',
        '玩具', '积木', '拼图', '绘本', '衣服', '鞋子', '袜子', '帽子', '围嘴',
        '浴巾', '毛巾', '沐浴露', '洗发水', '润肤露', '护臀膏', '湿巾', '棉签', '体温计',
        '吸鼻器', '指甲剪', '牙胶', '安抚奶嘴', '背带', '腰凳', '游戏垫', '摇铃',
        '音乐盒', '故事机', '学饮杯', '餐具', '餐椅', '安全门', '防撞条', '监控器'
    ],
    car: [
        '机油', '机滤', '空滤', '汽滤', '火花塞', '刹车片', '刹车盘', '刹车油', '变速箱油',
        '防冻液', '玻璃水', '雨刮器', '轮胎', '轮毂', '电瓶', '发电机', '启动机', '喇叭',
        '车灯', '灯泡', '保险丝', '继电器', '传感器', '氧传感器', '节气门', '喷油嘴',
        '水泵', '水箱', '水管', '皮带', '离合器', '减震器', '弹簧', '轴承', '球头',
        '拉杆', '支架', '螺丝', '螺母', '垫片', '密封圈', '胶条', '蜡', '清洁剂'
    ]
};

// 品牌名称
const brands = [
    '苹果', '小米', '华为', '三星', 'OPPO', 'VIVO', '荣耀', '联想', '戴尔', '惠普',
    '索尼', '佳能', '尼康', '松下', '飞利浦', '美的', '格力', '海尔', '海信', 'TCL',
    '创维', '长虹', '康佳', 'LG', '夏普', '东芝', '三菱', '西门子', '博世', '伊莱克斯',
    '松下', '大金', '日立', '三菱电机', '奥克斯', '志高', '科龙', '格兰仕', '苏泊尔',
    '九阳', '小熊', '奔腾', '爱仕达', '双立人', '菲仕乐', 'WMF', '膳魔师', '虎牌', '象印'
];

// 生成新商品
function generateNewProducts(startId, count) {
    const newProducts = [];
    
    for (let i = 0; i < count; i++) {
        const id = startId + i;
        const categoryIndex = Math.floor(Math.random() * categories.length);
        const category = categories[categoryIndex];
        
        // 随机选择商品名称模板
        const templateNames = productTemplates[category.name];
        const productName = templateNames[Math.floor(Math.random() * templateNames.length)];
        
        // 随机选择品牌
        const brand = brands[Math.floor(Math.random() * brands.length)];
        
        // 生成价格（根据不同分类设置不同价格范围）
        let price;
        switch(category.name) {
            case 'electronics': price = Math.floor(Math.random() * 10000) + 1000; break;
            case 'clothing': price = Math.floor(Math.random() * 2000) + 100; break;
            case 'cosmetics': price = Math.floor(Math.random() * 1000) + 50; break;
            case 'home': price = Math.floor(Math.random() * 5000) + 200; break;
            case 'sports': price = Math.floor(Math.random() * 3000) + 100; break;
            case 'food': price = Math.floor(Math.random() * 200) + 10; break;
            case 'books': price = Math.floor(Math.random() * 500) + 20; break;
            case 'baby': price = Math.floor(Math.random() * 2000) + 50; break;
            case 'car': price = Math.floor(Math.random() * 5000) + 100; break;
            default: price = Math.floor(Math.random() * 1000) + 50;
        }
        
        // 生成评分（4.0-5.0之间）
        const rating = (Math.random() * 1 + 4).toFixed(1);
        
        const product = {
            id: id,
            name: `${brand}${productName}`,
            price: price,
            category: category.name,
            image: `https://picsum.photos/seed/${id}/400/300`,
            rating: parseFloat(rating),
            description: `【产品特色】 ${brand}${productName}，${category.desc}`,
            reviews: []
        };
        
        newProducts.push(product);
    }
    
    return newProducts;
}

// 生成294个新商品（从207到500）
const newProducts = generateNewProducts(207, 294);

// 将新商品转换为JavaScript数组格式
const newProductsCode = newProducts.map(product => 
    `    {
        id: ${product.id},
        name: "${product.name}",
        price: ${product.price},
        category: "${product.category}",
        image: "${product.image}",
        rating: ${product.rating},
        description: "${product.description}",
        reviews: []
    }`
).join(',\n');

console.log(`已生成 ${newProducts.length} 个新商品，ID范围: 207-500`);

// 将新商品代码写入文件
fs.writeFileSync('./new-products.js', `// 新生成的商品数据（ID: 207-500）
const newProducts = [
${newProductsCode}
];

module.exports = newProducts;`);

console.log('新商品数据已保存到 new-products.js 文件');