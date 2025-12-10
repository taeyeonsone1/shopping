// 图片URL生成辅助函数
// 根据商品名称和类别生成对应的图片

// 商品名称到图片关键词的映射
const productImageMap = {
    // 电子产品
    'iPhone': 'iphone smartphone',
    '小米': 'xiaomi phone',
    'AirPods': 'airpods earbuds',
    '华为': 'huawei phone',
    'MacBook': 'macbook laptop',
    'ThinkPad': 'thinkpad laptop',
    'iPad': 'ipad tablet',
    'MatePad': 'tablet',
    'Apple Watch': 'apple watch smartwatch',
    'Watch': 'smartwatch',
    'Sony': 'sony camera',
    '佳能': 'canon camera',
    '富士': 'fujifilm camera',
    'OPPO': 'oppo phone',
    'vivo': 'vivo phone',
    
    // 服装配饰
    'T恤': 't-shirt',
    '运动鞋': 'sneakers shoes',
    'Nike': 'nike shoes',
    'Adidas': 'adidas shoes',
    '安踏': 'sports shoes',
    'Coach': 'coach handbag',
    'CK': 'handbag purse',
    'Zara': 'jacket clothing',
    'H&M': 'jacket',
    'Ray-Ban': 'sunglasses',
    '暴龙': 'sunglasses',
    
    // 美妆护肤
    'SK-II': 'skincare serum',
    '自然堂': 'skincare',
    '兰蔻': 'lancome skincare',
    '欧莱雅': 'loreal skincare',
    '雅诗兰黛': 'estee lauder skincare',
    '珀莱雅': 'skincare',
    'Dior': 'dior lipstick',
    '完美日记': 'lipstick',
    'La Mer': 'la mer cream',
    '玉兰油': 'olay cream',
    '资生堂': 'shiseido skincare',
    '薇诺娜': 'skincare',
    
    // 家居用品
    'Dyson': 'dyson vacuum',
    '小米吸尘器': 'vacuum cleaner',
    '吹风机': 'hair dryer',
    '飞科': 'hair dryer',
    '洗碗机': 'dishwasher',
    '西门子': 'siemens dishwasher',
    '美的': 'midea dishwasher',
    '空气净化器': 'air purifier',
    '飞利浦': 'philips air purifier',
    '沙发': 'sofa',
    '宜家': 'ikea furniture',
    '顾家': 'sofa furniture',
    '床上用品': 'bedding',
    '无印良品': 'muji bedding',
    '水星': 'bedding',
    
    // 运动健身
    'Air Max': 'nike air max',
    'Lululemon': 'yoga pants',
    'Keep': 'yoga pants',
    'Under Armour': 'sportswear',
    'UA': 'sportswear',
    '迪卡侬': 'sportswear',
    'Fitness': 'fitness app',
    'Peloton': 'exercise bike',
    '野小兽': 'exercise bike',
    
    // 食品饮料
    '星巴克': 'starbucks coffee',
    '三顿半': 'coffee',
    '雀巢': 'nescafe coffee',
    'Godiva': 'godiva chocolate',
    '德芙': 'dove chocolate',
    '依云': 'evian water',
    '农夫山泉': 'water bottle',
    '车厘子': 'cherries',
    '樱桃': 'cherries',
    
    // 图书文具
    'Kindle': 'kindle e-reader',
    'iReader': 'e-reader',
    'Lamy': 'lamy pen',
    '英雄': 'fountain pen',
    'Moleskine': 'moleskine notebook',
    '得力': 'notebook',
    
    // 母婴用品
    'Pampers': 'diapers',
    '好奇': 'diapers',
    'Avent': 'baby bottle',
    '贝亲': 'baby bottle',
    
    // 汽车用品
    '3M': 'car window tint',
    '龙膜': 'car window tint',
    '米其林': 'michelin tire',
    '朝阳': 'tire'
};

// 根据商品名称获取图片关键词
function getImageKeyword(productName, category) {
    // 遍历映射表，找到匹配的关键词
    for (const [key, keyword] of Object.entries(productImageMap)) {
        if (productName.includes(key)) {
            return keyword;
        }
    }
    
    // 如果没有匹配，根据类别返回默认关键词
    const categoryKeywords = {
        'electronics': 'electronics technology',
        'clothing': 'fashion clothing',
        'cosmetics': 'cosmetics beauty',
        'home': 'home appliance',
        'sports': 'sports fitness',
        'food': 'food',
        'books': 'book stationery',
        'baby': 'baby products',
        'car': 'car accessories'
    };
    
    return categoryKeywords[category] || 'product';
}

// 生成商品图片URL
function getProductImage(productId, productName, category) {
    const keyword = getImageKeyword(productName, category);
    const width = 400;
    const height = 300;
    
    // 使用商品ID作为种子，确保每个商品都有固定的图片
    // 使用Picsum Photos API，通过seed确保图片一致性
    // 格式: https://picsum.photos/seed/{seed}/{width}/{height}
    const seed = productId;
    
    return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

// 为所有商品更新图片URL
function updateProductImages() {
    if (typeof products === 'undefined') return;
    
    products.forEach(product => {
        // 如果图片是占位符，则生成新图片
        if (product.image && product.image.includes('placeholder.com')) {
            product.image = getProductImage(product.id, product.name, product.category);
        }
        // 确保所有商品都有图片
        if (!product.image) {
            product.image = getProductImage(product.id, product.name, product.category);
        }
    });
    
    // 更新平替方案中的图片
    if (typeof alternatives !== 'undefined') {
        alternatives.forEach(alt => {
            const originalProduct = products.find(p => p.id === alt.original.id);
            const replacementProduct = products.find(p => p.id === alt.replacement.id);
            
            if (originalProduct && originalProduct.image) {
                alt.original.image = originalProduct.image;
            }
            if (replacementProduct && replacementProduct.image) {
                alt.replacement.image = replacementProduct.image;
            }
        });
    }
}

// 页面加载时自动更新图片
function initProductImages() {
    // 延迟执行，确保data.js已加载
    if (typeof products !== 'undefined') {
        updateProductImages();
    } else {
        // 如果products还未加载，等待一段时间后重试
        setTimeout(initProductImages, 100);
    }
}

// 页面加载时自动更新图片
document.addEventListener('DOMContentLoaded', function() {
    initProductImages();
});

// 如果DOM已经加载完成，立即执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductImages);
} else {
    initProductImages();
}

