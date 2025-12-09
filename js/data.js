// 商品数据 - 大幅扩展版本
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 8999,
        category: "electronics",
        image: "https://picsum.photos/seed/1/400/300",
        rating: 4.8,
        description: "【产品特色】 苹果最新旗舰手机，A17 Pro芯片，钛金属材质 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: [{"author":"张三","rating":5,"comment":"非常流畅，拍照效果很棒！"},{"author":"李四","rating":4,"comment":"价格有点贵，但性能确实强"}]
    },
    {
        id: 2,
        name: "小米14 Pro",
        price: 4999,
        category: "electronics",
        image: "https://picsum.photos/seed/2/400/300",
        rating: 4.7,
        description: "【产品特色】 小米旗舰手机，骁龙8 Gen3，徕卡影像 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: [{"author":"王五","rating":5,"comment":"性价比很高，系统流畅"}]
    },
    {
        id: 3,
        name: "AirPods Pro 2",
        price: 1899,
        category: "electronics",
        image: "https://picsum.photos/seed/3/400/300",
        rating: 4.6,
        description: "【产品特色】 苹果降噪耳机，空间音频，自适应通透模式 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 4,
        name: "华为FreeBuds Pro 3",
        price: 999,
        category: "electronics",
        image: "https://picsum.photos/seed/4/400/300",
        rating: 4.5,
        description: "【产品特色】 华为降噪耳机，麒麟A2芯片，高清音质 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 13,
        name: "MacBook Pro 16寸",
        price: 19999,
        category: "electronics",
        image: "https://picsum.photos/seed/13/400/300",
        rating: 4.9,
        description: "【产品特色】 苹果专业级笔记本电脑，M3 Max芯片，16寸Retina显示屏 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 14,
        name: "联想ThinkPad X1 Carbon",
        price: 8999,
        category: "electronics",
        image: "https://picsum.photos/seed/14/400/300",
        rating: 4.6,
        description: "【产品特色】 联想商务笔记本电脑，轻薄便携，性能强劲 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 15,
        name: "iPad Pro 12.9寸",
        price: 6799,
        category: "electronics",
        image: "https://picsum.photos/seed/15/400/300",
        rating: 4.7,
        description: "【产品特色】 苹果专业平板电脑，M2芯片，12.9寸Liquid Retina显示屏 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 16,
        name: "华为MatePad Pro",
        price: 3299,
        category: "electronics",
        image: "https://picsum.photos/seed/16/400/300",
        rating: 4.5,
        description: "【产品特色】 华为旗舰平板，麒麟9000S，11寸OLED屏幕 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 17,
        name: "Apple Watch Series 9",
        price: 2999,
        category: "electronics",
        image: "https://picsum.photos/seed/17/400/300",
        rating: 4.6,
        description: "【产品特色】 苹果智能手表，S9芯片，健康监测功能 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 18,
        name: "华为Watch GT 4",
        price: 1288,
        category: "electronics",
        image: "https://picsum.photos/seed/18/400/300",
        rating: 4.4,
        description: "【产品特色】 华为智能手表，长续航，运动健康监测 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 19,
        name: "Sony A7M4 相机",
        price: 16999,
        category: "electronics",
        image: "https://picsum.photos/seed/19/400/300",
        rating: 4.8,
        description: "【产品特色】 索尼全画幅微单相机，3300万像素，4K视频 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 20,
        name: "佳能EOS R6 Mark II",
        price: 15999,
        category: "electronics",
        image: "https://picsum.photos/seed/20/400/300",
        rating: 4.7,
        description: "【产品特色】 佳能全画幅微单，2420万像素，高速连拍 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 21,
        name: "富士X-T5",
        price: 11990,
        category: "electronics",
        image: "https://picsum.photos/seed/21/400/300",
        rating: 4.6,
        description: "【产品特色】 富士APS-C画幅微单，4020万像素，复古外观 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 22,
        name: "小米13 Ultra",
        price: 5999,
        category: "electronics",
        image: "https://picsum.photos/seed/22/400/300",
        rating: 4.7,
        description: "【产品特色】 小米影像旗舰，徕卡四摄，2K屏幕 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 23,
        name: "OPPO Find X6 Pro",
        price: 5999,
        category: "electronics",
        image: "https://picsum.photos/seed/23/400/300",
        rating: 4.6,
        description: "【产品特色】 OPPO旗舰手机，哈苏影像，骁龙8 Gen2 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 24,
        name: "vivo X100 Pro",
        price: 5499,
        category: "electronics",
        image: "https://picsum.photos/seed/24/400/300",
        rating: 4.6,
        description: "【产品特色】 vivo影像旗舰，蔡司镜头，天玑9300 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 11,
        name: "优衣库基础T恤",
        price: 79,
        category: "clothing",
        image: "https://picsum.photos/seed/11/400/300",
        rating: 4.6,
        description: "【产品特色】 优衣库经典基础款，纯棉材质，舒适百搭 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 25,
        name: "Nike运动T恤",
        price: 299,
        category: "clothing",
        image: "https://picsum.photos/seed/25/400/300",
        rating: 4.5,
        description: "【产品特色】 Nike运动T恤，Dri-FIT技术，透气速干 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 26,
        name: "李宁运动T恤",
        price: 129,
        category: "clothing",
        image: "https://picsum.photos/seed/26/400/300",
        rating: 4.3,
        description: "【产品特色】 李宁运动T恤，透气材质，性价比高 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 27,
        name: "Adidas运动鞋",
        price: 899,
        category: "clothing",
        image: "https://picsum.photos/seed/27/400/300",
        rating: 4.5,
        description: "【产品特色】 Adidas经典运动鞋，Boost缓震，舒适透气 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 28,
        name: "安踏运动鞋",
        price: 399,
        category: "clothing",
        image: "https://picsum.photos/seed/28/400/300",
        rating: 4.3,
        description: "【产品特色】 安踏性价比跑鞋，缓震科技，适合日常运动 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 29,
        name: "Coach手提包",
        price: 2999,
        category: "clothing",
        image: "https://picsum.photos/seed/29/400/300",
        rating: 4.6,
        description: "【产品特色】 Coach经典手提包，真皮材质，时尚百搭 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 30,
        name: "小CK手提包",
        price: 399,
        category: "clothing",
        image: "https://picsum.photos/seed/30/400/300",
        rating: 4.4,
        description: "【产品特色】 Charles & Keith时尚手提包，设计简约，性价比高 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 31,
        name: "Zara休闲外套",
        price: 399,
        category: "clothing",
        image: "https://picsum.photos/seed/31/400/300",
        rating: 4.4,
        description: "【产品特色】 Zara休闲外套，时尚设计，适合日常穿搭 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 32,
        name: "H&M基础外套",
        price: 199,
        category: "clothing",
        image: "https://picsum.photos/seed/32/400/300",
        rating: 4.2,
        description: "【产品特色】 H&M基础款外套，简约设计，价格实惠 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 33,
        name: "Ray-Ban太阳镜",
        price: 1299,
        category: "clothing",
        image: "https://picsum.photos/seed/33/400/300",
        rating: 4.6,
        description: "【产品特色】 Ray-Ban经典太阳镜，UV400防护，时尚百搭 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 34,
        name: "暴龙太阳镜",
        price: 399,
        category: "clothing",
        image: "https://picsum.photos/seed/34/400/300",
        rating: 4.3,
        description: "【产品特色】 暴龙太阳镜，UV400防护，性价比高 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 7,
        name: "SK-II 神仙水",
        price: 1590,
        category: "cosmetics",
        image: "https://picsum.photos/seed/7/400/300",
        rating: 4.7,
        description: "【产品特色】 SK-II经典护肤精华，Pitera成分，改善肌肤 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 8,
        name: "自然堂雪域精华",
        price: 299,
        category: "cosmetics",
        image: "https://picsum.photos/seed/8/400/300",
        rating: 4.4,
        description: "【产品特色】 自然堂护肤精华，雪域植物提取，补水保湿 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 35,
        name: "兰蔻小黑瓶",
        price: 1080,
        category: "cosmetics",
        image: "https://picsum.photos/seed/35/400/300",
        rating: 4.7,
        description: "【产品特色】 兰蔻精华肌底液，修护肌肤，改善细纹 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 36,
        name: "欧莱雅小黑瓶",
        price: 299,
        category: "cosmetics",
        image: "https://picsum.photos/seed/36/400/300",
        rating: 4.5,
        description: "【产品特色】 欧莱雅青春密码精华，性价比高，修护肌肤 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 37,
        name: "雅诗兰黛小棕瓶",
        price: 1150,
        category: "cosmetics",
        image: "https://picsum.photos/seed/37/400/300",
        rating: 4.8,
        description: "【产品特色】 雅诗兰黛特润修护精华，抗衰老，修护肌肤 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 38,
        name: "珀莱雅双抗精华",
        price: 269,
        category: "cosmetics",
        image: "https://picsum.photos/seed/38/400/300",
        rating: 4.4,
        description: "【产品特色】 珀莱雅双抗精华，抗氧化抗糖化，性价比高 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 39,
        name: "Dior口红999",
        price: 350,
        category: "cosmetics",
        image: "https://picsum.photos/seed/39/400/300",
        rating: 4.7,
        description: "【产品特色】 Dior经典正红色口红，持久显色，质地顺滑 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 40,
        name: "完美日记口红",
        price: 69,
        category: "cosmetics",
        image: "https://picsum.photos/seed/40/400/300",
        rating: 4.3,
        description: "【产品特色】 完美日记口红，色号丰富，性价比高 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 41,
        name: "La Mer面霜",
        price: 2800,
        category: "cosmetics",
        image: "https://picsum.photos/seed/41/400/300",
        rating: 4.9,
        description: "【产品特色】 海蓝之谜经典面霜，修护肌肤，奢华体验 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 42,
        name: "玉兰油大红瓶",
        price: 299,
        category: "cosmetics",
        image: "https://picsum.photos/seed/42/400/300",
        rating: 4.4,
        description: "【产品特色】 玉兰油大红瓶面霜，抗衰老，性价比高 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 43,
        name: "资生堂红腰子",
        price: 1180,
        category: "cosmetics",
        image: "https://picsum.photos/seed/43/400/300",
        rating: 4.6,
        description: "【产品特色】 资生堂红妍肌活精华，提升肌肤免疫力 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 44,
        name: "薇诺娜修护精华",
        price: 298,
        category: "cosmetics",
        image: "https://picsum.photos/seed/44/400/300",
        rating: 4.5,
        description: "【产品特色】 薇诺娜修护精华，敏感肌适用，温和修护 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 9,
        name: "Dyson V15 吸尘器",
        price: 4990,
        category: "home",
        image: "https://picsum.photos/seed/9/400/300",
        rating: 4.8,
        description: "【产品特色】 戴森无线吸尘器，激光探测，强劲吸力 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 10,
        name: "小米无线吸尘器",
        price: 999,
        category: "home",
        image: "https://picsum.photos/seed/10/400/300",
        rating: 4.5,
        description: "【产品特色】 小米无线吸尘器，多刷头配置，性价比高 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 45,
        name: "Dyson吹风机",
        price: 2990,
        category: "home",
        image: "https://picsum.photos/seed/45/400/300",
        rating: 4.7,
        description: "【产品特色】 戴森Supersonic吹风机，快速干发，护发科技 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 46,
        name: "飞科吹风机",
        price: 199,
        category: "home",
        image: "https://picsum.photos/seed/46/400/300",
        rating: 4.3,
        description: "【产品特色】 飞科负离子吹风机，快速干发，性价比高 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 47,
        name: "西门子洗碗机",
        price: 5999,
        category: "home",
        image: "https://picsum.photos/seed/47/400/300",
        rating: 4.7,
        description: "【产品特色】 西门子嵌入式洗碗机，13套容量，高温除菌 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 48,
        name: "美的洗碗机",
        price: 2999,
        category: "home",
        image: "https://picsum.photos/seed/48/400/300",
        rating: 4.5,
        description: "【产品特色】 美的嵌入式洗碗机，13套容量，性价比高 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 49,
        name: "飞利浦空气净化器",
        price: 3999,
        category: "home",
        image: "https://picsum.photos/seed/49/400/300",
        rating: 4.6,
        description: "【产品特色】 飞利浦空气净化器，HEPA过滤，除甲醛 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 50,
        name: "小米空气净化器",
        price: 999,
        category: "home",
        image: "https://picsum.photos/seed/50/400/300",
        rating: 4.4,
        description: "【产品特色】 小米空气净化器，HEPA过滤，智能控制 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 51,
        name: "宜家沙发",
        price: 2999,
        category: "home",
        image: "https://picsum.photos/seed/51/400/300",
        rating: 4.5,
        description: "【产品特色】 宜家三人沙发，简约设计，舒适实用 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 52,
        name: "顾家家居沙发",
        price: 5999,
        category: "home",
        image: "https://picsum.photos/seed/52/400/300",
        rating: 4.6,
        description: "【产品特色】 顾家家居真皮沙发，舒适耐用，品质保证 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 53,
        name: "无印良品床上用品",
        price: 599,
        category: "home",
        image: "https://picsum.photos/seed/53/400/300",
        rating: 4.6,
        description: "【产品特色】 无印良品纯棉四件套，简约舒适，品质优良 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 54,
        name: "水星家纺四件套",
        price: 299,
        category: "home",
        image: "https://picsum.photos/seed/54/400/300",
        rating: 4.4,
        description: "【产品特色】 水星家纺纯棉四件套，性价比高，舒适透气 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 5,
        name: "Nike Air Max 270",
        price: 1299,
        category: "sports",
        image: "https://picsum.photos/seed/5/400/300",
        rating: 4.5,
        description: "【产品特色】 耐克经典跑鞋，气垫缓震，舒适透气 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 6,
        name: "安踏运动鞋",
        price: 399,
        category: "sports",
        image: "https://picsum.photos/seed/6/400/300",
        rating: 4.3,
        description: "【产品特色】 安踏性价比跑鞋，缓震科技，适合日常运动 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 55,
        name: "Lululemon瑜伽裤",
        price: 899,
        category: "sports",
        image: "https://picsum.photos/seed/55/400/300",
        rating: 4.7,
        description: "【产品特色】 Lululemon瑜伽裤，高弹力，舒适透气 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 56,
        name: "Keep瑜伽裤",
        price: 199,
        category: "sports",
        image: "https://picsum.photos/seed/56/400/300",
        rating: 4.4,
        description: "【产品特色】 Keep瑜伽裤，高弹力，性价比高 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 57,
        name: "Under Armour运动服",
        price: 699,
        category: "sports",
        image: "https://picsum.photos/seed/57/400/300",
        rating: 4.5,
        description: "【产品特色】 Under Armour运动服，速干材质，专业运动 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 58,
        name: "迪卡侬运动服",
        price: 149,
        category: "sports",
        image: "https://picsum.photos/seed/58/400/300",
        rating: 4.3,
        description: "【产品特色】 迪卡侬运动服，速干材质，性价比极高 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 59,
        name: "Apple Fitness+",
        price: 79,
        category: "sports",
        image: "https://picsum.photos/seed/59/400/300",
        rating: 4.5,
        description: "【产品特色】 Apple Fitness+健身订阅，专业课程，每月79元 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 60,
        name: "Keep会员",
        price: 19,
        category: "sports",
        image: "https://picsum.photos/seed/60/400/300",
        rating: 4.4,
        description: "【产品特色】 Keep会员，海量课程，每月19元 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 61,
        name: "Peloton动感单车",
        price: 12999,
        category: "sports",
        image: "https://picsum.photos/seed/61/400/300",
        rating: 4.6,
        description: "【产品特色】 Peloton智能动感单车，在线课程，专业健身 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 62,
        name: "野小兽动感单车",
        price: 1999,
        category: "sports",
        image: "https://picsum.photos/seed/62/400/300",
        rating: 4.4,
        description: "【产品特色】 野小兽智能动感单车，在线课程，性价比高 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 12,
        name: "星巴克咖啡豆",
        price: 128,
        category: "food",
        image: "https://picsum.photos/seed/12/400/300",
        rating: 4.4,
        description: "【产品特色】 星巴克精选咖啡豆，阿拉比卡豆，浓郁香醇 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 63,
        name: "三顿半咖啡",
        price: 89,
        category: "food",
        image: "https://picsum.photos/seed/63/400/300",
        rating: 4.5,
        description: "【产品特色】 三顿半精品咖啡，冷萃即溶，方便快捷 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 64,
        name: "雀巢咖啡",
        price: 39,
        category: "food",
        image: "https://picsum.photos/seed/64/400/300",
        rating: 4.2,
        description: "【产品特色】 雀巢速溶咖啡，经典口味，性价比高 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 65,
        name: "Godiva巧克力",
        price: 299,
        category: "food",
        image: "https://picsum.photos/seed/65/400/300",
        rating: 4.6,
        description: "【产品特色】 Godiva比利时巧克力，精致礼盒，口感醇厚 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 66,
        name: "德芙巧克力",
        price: 49,
        category: "food",
        image: "https://picsum.photos/seed/66/400/300",
        rating: 4.3,
        description: "【产品特色】 德芙巧克力，丝滑口感，价格实惠 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 67,
        name: "依云矿泉水",
        price: 15,
        category: "food",
        image: "https://picsum.photos/seed/67/400/300",
        rating: 4.3,
        description: "【产品特色】 依云天然矿泉水，法国进口，纯净天然 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 68,
        name: "农夫山泉",
        price: 2,
        category: "food",
        image: "https://picsum.photos/seed/68/400/300",
        rating: 4.2,
        description: "【产品特色】 农夫山泉天然水，有点甜，性价比高 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 69,
        name: "进口车厘子",
        price: 199,
        category: "food",
        image: "https://picsum.photos/seed/69/400/300",
        rating: 4.5,
        description: "【产品特色】 智利进口车厘子，J级大果，新鲜甜美 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 70,
        name: "国产樱桃",
        price: 39,
        category: "food",
        image: "https://picsum.photos/seed/70/400/300",
        rating: 4.2,
        description: "【产品特色】 国产大樱桃，新鲜甜美，性价比高 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 71,
        name: "Kindle Paperwhite",
        price: 998,
        category: "books",
        image: "https://picsum.photos/seed/71/400/300",
        rating: 4.6,
        description: "【产品特色】 Kindle Paperwhite电子书阅读器，6.8寸屏幕，护眼阅读 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 72,
        name: "掌阅iReader",
        price: 599,
        category: "books",
        image: "https://picsum.photos/seed/72/400/300",
        rating: 4.4,
        description: "【产品特色】 掌阅iReader电子书，6寸屏幕，性价比高 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 73,
        name: "Lamy钢笔",
        price: 299,
        category: "books",
        image: "https://picsum.photos/seed/73/400/300",
        rating: 4.5,
        description: "【产品特色】 Lamy经典钢笔，德国制造，书写流畅 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 74,
        name: "英雄钢笔",
        price: 39,
        category: "books",
        image: "https://picsum.photos/seed/74/400/300",
        rating: 4.2,
        description: "【产品特色】 英雄经典钢笔，国货精品，性价比高 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 75,
        name: "Moleskine笔记本",
        price: 199,
        category: "books",
        image: "https://picsum.photos/seed/75/400/300",
        rating: 4.6,
        description: "【产品特色】 Moleskine经典笔记本，硬质封面，经典设计 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 76,
        name: "得力笔记本",
        price: 19,
        category: "books",
        image: "https://picsum.photos/seed/76/400/300",
        rating: 4.2,
        description: "【产品特色】 得力笔记本，实用耐用，性价比高 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 77,
        name: "Pampers纸尿裤",
        price: 199,
        category: "baby",
        image: "https://picsum.photos/seed/77/400/300",
        rating: 4.6,
        description: "【产品特色】 帮宝适纸尿裤，干爽透气，呵护宝宝 安全材质，温和配方，呵护宝宝。适合关爱宝宝的家庭。",
        reviews: []
    },
    {
        id: 78,
        name: "好奇纸尿裤",
        price: 129,
        category: "baby",
        image: "https://picsum.photos/seed/78/400/300",
        rating: 4.4,
        description: "【产品特色】 好奇纸尿裤，干爽舒适，性价比高 安全材质，温和配方，呵护宝宝。适合关爱宝宝的家庭。",
        reviews: []
    },
    {
        id: 79,
        name: "Avent奶瓶",
        price: 199,
        category: "baby",
        image: "https://picsum.photos/seed/79/400/300",
        rating: 4.5,
        description: "【产品特色】 飞利浦新安怡奶瓶，防胀气设计，安全材质 安全材质，温和配方，呵护宝宝。适合关爱宝宝的家庭。",
        reviews: []
    },
    {
        id: 80,
        name: "贝亲奶瓶",
        price: 69,
        category: "baby",
        image: "https://picsum.photos/seed/80/400/300",
        rating: 4.3,
        description: "【产品特色】 贝亲奶瓶，安全材质，性价比高 安全材质，温和配方，呵护宝宝。适合关爱宝宝的家庭。",
        reviews: []
    },
    {
        id: 81,
        name: "3M汽车贴膜",
        price: 2999,
        category: "car",
        image: "https://picsum.photos/seed/81/400/300",
        rating: 4.6,
        description: "【产品特色】 3M汽车贴膜，隔热防爆，品质保证 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 82,
        name: "龙膜汽车贴膜",
        price: 1299,
        category: "car",
        image: "https://picsum.photos/seed/82/400/300",
        rating: 4.4,
        description: "【产品特色】 龙膜汽车贴膜，隔热防爆，性价比高 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 83,
        name: "米其林轮胎",
        price: 899,
        category: "car",
        image: "https://picsum.photos/seed/83/400/300",
        rating: 4.7,
        description: "【产品特色】 米其林轮胎，静音舒适，安全可靠 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 84,
        name: "朝阳轮胎",
        price: 399,
        category: "car",
        image: "https://picsum.photos/seed/84/400/300",
        rating: 4.3,
        description: "【产品特色】 朝阳轮胎，性价比高，耐用可靠 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    // 扩展电子产品 - 手机类
    {
        id: 85,
        name: "三星Galaxy S24 Ultra",
        price: 7999,
        category: "electronics",
        image: "https://picsum.photos/seed/85/400/300",
        rating: 4.7,
        description: "【产品特色】 三星旗舰手机，骁龙8 Gen3，S Pen手写笔 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 86,
        name: "荣耀Magic6 Pro",
        price: 5299,
        category: "electronics",
        image: "https://picsum.photos/seed/86/400/300",
        rating: 4.6,
        description: "【产品特色】 荣耀旗舰手机，骁龙8 Gen3，鹰眼相机 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 87,
        name: "一加12",
        price: 4299,
        category: "electronics",
        image: "https://picsum.photos/seed/87/400/300",
        rating: 4.5,
        description: "【产品特色】 一加旗舰手机，骁龙8 Gen3，哈苏影像 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 88,
        name: "realme GT5 Pro",
        price: 3299,
        category: "electronics",
        image: "https://picsum.photos/seed/88/400/300",
        rating: 4.4,
        description: "【产品特色】 realme旗舰手机，骁龙8 Gen3，性价比高 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 89,
        name: "魅族21",
        price: 3399,
        category: "electronics",
        image: "https://picsum.photos/seed/89/400/300",
        rating: 4.3,
        description: "【产品特色】 魅族旗舰手机，骁龙8 Gen3，Flyme系统 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 90,
        name: "中兴Axon 40 Ultra",
        price: 4699,
        category: "electronics",
        image: "https://picsum.photos/seed/90/400/300",
        rating: 4.4,
        description: "【产品特色】 中兴旗舰手机，屏下摄像头，真全面屏 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    // 扩展电子产品 - 耳机类
    {
        id: 91,
        name: "Sony WH-1000XM5",
        price: 2299,
        category: "electronics",
        image: "https://picsum.photos/seed/91/400/300",
        rating: 4.8,
        description: "【产品特色】 索尼降噪耳机，30小时续航，音质出色 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 92,
        name: "Bose QuietComfort 45",
        price: 1999,
        category: "electronics",
        image: "https://picsum.photos/seed/92/400/300",
        rating: 4.7,
        description: "【产品特色】 Bose降噪耳机，舒适佩戴，降噪效果强 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 93,
        name: "小米Buds 4 Pro",
        price: 699,
        category: "electronics",
        image: "https://picsum.photos/seed/93/400/300",
        rating: 4.5,
        description: "【产品特色】 小米降噪耳机，空间音频，性价比高 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 94,
        name: "OPPO Enco X2",
        price: 899,
        category: "electronics",
        image: "https://picsum.photos/seed/94/400/300",
        rating: 4.6,
        description: "【产品特色】 OPPO降噪耳机，丹拿调音，音质优秀 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 95,
        name: "vivo TWS 3 Pro",
        price: 699,
        category: "electronics",
        image: "https://picsum.photos/seed/95/400/300",
        rating: 4.4,
        description: "【产品特色】 vivo降噪耳机，无损音质，性价比高 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 96,
        name: "漫步者NeoBuds Pro 2",
        price: 599,
        category: "electronics",
        image: "https://picsum.photos/seed/96/400/300",
        rating: 4.3,
        description: "【产品特色】 漫步者降噪耳机，Hi-Res认证，国货精品 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    // 扩展服装配饰类
    {
        id: 97,
        name: "优衣库摇粒绒外套",
        price: 199,
        category: "clothing",
        image: "https://picsum.photos/seed/97/400/300",
        rating: 4.4,
        description: "【产品特色】 优衣库经典摇粒绒外套，保暖舒适，简约百搭 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 98,
        name: "Nike运动外套",
        price: 499,
        category: "clothing",
        image: "https://picsum.photos/seed/98/400/300",
        rating: 4.5,
        description: "【产品特色】 Nike运动外套，防风防水，舒适透气 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 99,
        name: "李宁运动裤",
        price: 199,
        category: "clothing",
        image: "https://picsum.photos/seed/99/400/300",
        rating: 4.3,
        description: "【产品特色】 李宁运动裤，高弹力，舒适透气 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 100,
        name: "Adidas运动帽",
        price: 159,
        category: "clothing",
        image: "https://picsum.photos/seed/100/400/300",
        rating: 4.4,
        description: "【产品特色】 Adidas运动帽，防晒透气，时尚百搭 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 101,
        name: "Zara连衣裙",
        price: 299,
        category: "clothing",
        image: "https://picsum.photos/seed/101/400/300",
        rating: 4.5,
        description: "【产品特色】 Zara时尚连衣裙，修身剪裁，优雅大方 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 102,
        name: "H&M牛仔裤",
        price: 199,
        category: "clothing",
        image: "https://picsum.photos/seed/102/400/300",
        rating: 4.3,
        description: "【产品特色】 H&M经典牛仔裤，修身版型，舒适耐穿 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 103,
        name: "Michael Kors手提包",
        price: 2599,
        category: "clothing",
        image: "https://picsum.photos/seed/103/400/300",
        rating: 4.6,
        description: "【产品特色】 Michael Kors时尚手提包，真皮材质，经典设计 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 104,
        name: "Fossil手表",
        price: 1299,
        category: "clothing",
        image: "https://picsum.photos/seed/104/400/300",
        rating: 4.5,
        description: "【产品特色】 Fossil时尚手表，石英机芯，经典设计 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 105,
        name: "CK内衣套装",
        price: 299,
        category: "clothing",
        image: "https://picsum.photos/seed/105/400/300",
        rating: 4.4,
        description: "【产品特色】 Calvin Klein内衣套装，舒适透气，简约设计 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 106,
        name: "UGG雪地靴",
        price: 1299,
        category: "clothing",
        image: "https://picsum.photos/seed/106/400/300",
        rating: 4.6,
        description: "【产品特色】 UGG经典雪地靴，羊毛内里，保暖舒适 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 107,
        name: "匡威帆布鞋",
        price: 399,
        category: "clothing",
        image: "https://picsum.photos/seed/107/400/300",
        rating: 4.5,
        description: "【产品特色】 匡威经典帆布鞋，百搭款式，舒适耐穿 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 108,
        name: "Vans滑板鞋",
        price: 499,
        category: "clothing",
        image: "https://picsum.photos/seed/108/400/300",
        rating: 4.4,
        description: "【产品特色】 Vans经典滑板鞋，耐磨防滑，街头风格 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    // 扩展美妆护肤类
    {
        id: 109,
        name: "资生堂时光琉璃面霜",
        price: 2380,
        category: "cosmetics",
        image: "https://picsum.photos/seed/109/400/300",
        rating: 4.8,
        description: "【产品特色】 资生堂高端面霜，抗衰老，滋润保湿 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 110,
        name: "科颜氏高保湿面霜",
        price: 315,
        category: "cosmetics",
        image: "https://picsum.photos/seed/110/400/300",
        rating: 4.6,
        description: "【产品特色】 科颜氏经典面霜，高效保湿，适合干性肌肤 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 111,
        name: "倩碧黄油",
        price: 295,
        category: "cosmetics",
        image: "https://picsum.photos/seed/111/400/300",
        rating: 4.5,
        description: "【产品特色】 倩碧经典乳液，滋润保湿，适合各类肌肤 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 112,
        name: "欧舒丹护手霜",
        price: 85,
        category: "cosmetics",
        image: "https://picsum.photos/seed/112/400/300",
        rating: 4.7,
        description: "【产品特色】 欧舒丹经典护手霜，滋润保湿，多种香型 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 113,
        name: "植村秀卸妆油",
        price: 380,
        category: "cosmetics",
        image: "https://picsum.photos/seed/113/400/300",
        rating: 4.7,
        description: "【产品特色】 植村秀经典卸妆油，温和卸妆，不伤肌肤 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 114,
        name: "贝德玛卸妆水",
        price: 128,
        category: "cosmetics",
        image: "https://picsum.photos/seed/114/400/300",
        rating: 4.5,
        description: "【产品特色】 贝德玛经典卸妆水，温和不刺激，性价比高 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 115,
        name: "雅漾喷雾",
        price: 186,
        category: "cosmetics",
        image: "https://picsum.photos/seed/115/400/300",
        rating: 4.6,
        description: "【产品特色】 雅漾活泉水喷雾，舒缓镇静，敏感肌适用 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 116,
        name: "理肤泉B5修复霜",
        price: 119,
        category: "cosmetics",
        image: "https://picsum.photos/seed/116/400/300",
        rating: 4.7,
        description: "【产品特色】 理肤泉B5修复霜，修护肌肤，舒缓敏感 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 117,
        name: "香奈儿口红",
        price: 380,
        category: "cosmetics",
        image: "https://picsum.photos/seed/117/400/300",
        rating: 4.7,
        description: "【产品特色】 香奈儿经典口红，丝绒质地，显色持久 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 118,
        name: "YSL口红",
        price: 350,
        category: "cosmetics",
        image: "https://picsum.photos/seed/118/400/300",
        rating: 4.6,
        description: "【产品特色】 YSL经典口红，显色度高，滋润不拔干 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 119,
        name: "MAC口红",
        price: 190,
        category: "cosmetics",
        image: "https://picsum.photos/seed/119/400/300",
        rating: 4.5,
        description: "【产品特色】 MAC经典口红，色号丰富，性价比高 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 120,
        name: "娇兰复原蜜",
        price: 1120,
        category: "cosmetics",
        image: "https://picsum.photos/seed/120/400/300",
        rating: 4.7,
        description: "【产品特色】 娇兰经典复原蜜，修护肌肤，滋润保湿 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    // 扩展家居用品类
    {
        id: 121,
        name: "九阳破壁机",
        price: 599,
        category: "home",
        image: "https://picsum.photos/seed/121/400/300",
        rating: 4.5,
        description: "【产品特色】 九阳破壁机，多功能料理，一键操作 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 122,
        name: "苏泊尔电饭煲",
        price: 299,
        category: "home",
        image: "https://picsum.photos/seed/122/400/300",
        rating: 4.4,
        description: "【产品特色】 苏泊尔电饭煲，智能预约，多种功能 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 123,
        name: "美的微波炉",
        price: 399,
        category: "home",
        image: "https://picsum.photos/seed/123/400/300",
        rating: 4.3,
        description: "【产品特色】 美的微波炉，多功能加热，操作简便 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 124,
        name: "格力空调",
        price: 2999,
        category: "home",
        image: "https://picsum.photos/seed/124/400/300",
        rating: 4.6,
        description: "【产品特色】 格力空调，节能静音，智能控制 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 125,
        name: "海尔冰箱",
        price: 3999,
        category: "home",
        image: "https://picsum.photos/seed/125/400/300",
        rating: 4.5,
        description: "【产品特色】 海尔冰箱，大容量保鲜，节能环保 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 126,
        name: "TCL电视",
        price: 2599,
        category: "home",
        image: "https://picsum.photos/seed/126/400/300",
        rating: 4.4,
        description: "【产品特色】 TCL智能电视，4K分辨率，语音控制 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 127,
        name: "华为智能手表",
        price: 1299,
        category: "electronics",
        image: "https://picsum.photos/seed/127/400/300",
        rating: 4.5,
        description: "【产品特色】 华为智能手表，健康监测，运动功能 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 128,
        name: "小米手环",
        price: 199,
        category: "electronics",
        image: "https://picsum.photos/seed/128/400/300",
        rating: 4.3,
        description: "【产品特色】 小米手环，运动监测，睡眠分析 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 129,
        name: "佳能打印机",
        price: 899,
        category: "electronics",
        image: "https://picsum.photos/seed/129/400/300",
        rating: 4.4,
        description: "【产品特色】 佳能打印机，无线打印，多功能一体 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 130,
        name: "爱普生投影仪",
        price: 2999,
        category: "electronics",
        image: "https://picsum.photos/seed/130/400/300",
        rating: 4.5,
        description: "【产品特色】 爱普生投影仪，高清投影，家庭影院 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 131,
        name: "索尼游戏机",
        price: 3999,
        category: "electronics",
        image: "https://picsum.photos/seed/131/400/300",
        rating: 4.7,
        description: "【产品特色】 索尼游戏机，高性能游戏，丰富游戏库 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 132,
        name: "任天堂Switch",
        price: 2299,
        category: "electronics",
        image: "https://picsum.photos/seed/132/400/300",
        rating: 4.6,
        description: "【产品特色】 任天堂Switch，便携游戏，家庭娱乐 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 133,
        name: "微软Xbox",
        price: 2899,
        category: "electronics",
        image: "https://picsum.photos/seed/133/400/300",
        rating: 4.5,
        description: "【产品特色】 微软Xbox，高性能游戏，云游戏服务 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 134,
        name: "罗技键盘",
        price: 399,
        category: "electronics",
        image: "https://picsum.photos/seed/134/400/300",
        rating: 4.4,
        description: "【产品特色】 罗技机械键盘，游戏办公，手感舒适 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 135,
        name: "雷蛇鼠标",
        price: 299,
        category: "electronics",
        image: "https://picsum.photos/seed/135/400/300",
        rating: 4.5,
        description: "【产品特色】 雷蛇游戏鼠标，精准定位，RGB灯光 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 136,
        name: "苹果平板",
        price: 3299,
        category: "electronics",
        image: "https://picsum.photos/seed/136/400/300",
        rating: 4.6,
        description: "【产品特色】 苹果iPad，轻薄便携，性能强劲 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 137,
        name: "华为平板",
        price: 1999,
        category: "electronics",
        image: "https://picsum.photos/seed/137/400/300",
        rating: 4.4,
        description: "【产品特色】 华为平板，大屏显示，办公娱乐 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 138,
        name: "小米平板",
        price: 1499,
        category: "electronics",
        image: "https://picsum.photos/seed/138/400/300",
        rating: 4.3,
        description: "【产品特色】 小米平板，性价比高，功能全面 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 139,
        name: "联想平板",
        price: 1299,
        category: "electronics",
        image: "https://picsum.photos/seed/139/400/300",
        rating: 4.2,
        description: "【产品特色】 联想平板，商务办公，娱乐学习 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 140,
        name: "三星平板",
        price: 2199,
        category: "electronics",
        image: "https://picsum.photos/seed/140/400/300",
        rating: 4.5,
        description: "【产品特色】 三星平板，AMOLED屏幕，S Pen支持 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    // 继续扩展其他分类商品
    {
        id: 141,
        name: "耐克跑步鞋",
        price: 799,
        category: "sports",
        image: "https://picsum.photos/seed/141/400/300",
        rating: 4.6,
        description: "【产品特色】 耐克专业跑步鞋，缓震科技，透气舒适 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 142,
        name: "阿迪达斯篮球鞋",
        price: 899,
        category: "sports",
        image: "https://picsum.photos/seed/142/400/300",
        rating: 4.5,
        description: "【产品特色】 阿迪达斯专业篮球鞋，高帮设计，支撑性强 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 143,
        name: "李宁羽毛球鞋",
        price: 399,
        category: "sports",
        image: "https://picsum.photos/seed/143/400/300",
        rating: 4.4,
        description: "【产品特色】 李宁羽毛球鞋，防滑耐磨，灵活性强 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 144,
        name: "安踏足球鞋",
        price: 299,
        category: "sports",
        image: "https://picsum.photos/seed/144/400/300",
        rating: 4.3,
        description: "【产品特色】 安踏足球鞋，轻量化设计，抓地力强 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 145,
        name: "星巴克咖啡杯",
        price: 129,
        category: "food",
        image: "https://picsum.photos/seed/145/400/300",
        rating: 4.5,
        description: "【产品特色】 星巴克经典咖啡杯，保温效果好，设计精美 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 146,
        name: "雀巢咖啡机",
        price: 899,
        category: "food",
        image: "https://picsum.photos/seed/146/400/300",
        rating: 4.4,
        description: "【产品特色】 雀巢胶囊咖啡机，一键操作，方便快捷 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 147,
        name: "德芙巧克力礼盒",
        price: 199,
        category: "food",
        image: "https://picsum.photos/seed/147/400/300",
        rating: 4.6,
        description: "【产品特色】 德芙巧克力精美礼盒，适合送礼，口感丝滑 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 148,
        name: "费列罗巧克力",
        price: 159,
        category: "food",
        image: "https://picsum.photos/seed/148/400/300",
        rating: 4.7,
        description: "【产品特色】 费列罗金莎巧克力，意大利进口，口感丰富 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 149,
        name: "百草味坚果礼盒",
        price: 189,
        category: "food",
        image: "https://picsum.photos/seed/149/400/300",
        rating: 4.5,
        description: "【产品特色】 百草味坚果礼盒，多种坚果，营养丰富 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 150,
        name: "三只松鼠零食",
        price: 99,
        category: "food",
        image: "https://picsum.photos/seed/150/400/300",
        rating: 4.4,
        description: "【产品特色】 三只松鼠休闲零食，多种口味，美味可口 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 151,
        name: "华为墨水屏平板",
        price: 2999,
        category: "books",
        image: "https://picsum.photos/seed/151/400/300",
        rating: 4.6,
        description: "【产品特色】 华为墨水屏平板，护眼阅读，手写笔记 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 152,
        name: "文石电子书",
        price: 2199,
        category: "books",
        image: "https://picsum.photos/seed/152/400/300",
        rating: 4.5,
        description: "【产品特色】 文石电子书，大屏显示，支持手写 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 153,
        name: "派克钢笔",
        price: 599,
        category: "books",
        image: "https://picsum.photos/seed/153/400/300",
        rating: 4.7,
        description: "【产品特色】 派克经典钢笔，德国工艺，书写流畅 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 154,
        name: "万宝龙钢笔",
        price: 2999,
        category: "books",
        image: "https://picsum.photos/seed/154/400/300",
        rating: 4.8,
        description: "【产品特色】 万宝龙奢华钢笔，德国制造，经典设计 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 155,
        name: "国誉笔记本",
        price: 49,
        category: "books",
        image: "https://picsum.photos/seed/155/400/300",
        rating: 4.4,
        description: "【产品特色】 国誉活页笔记本，纸张顺滑，设计合理 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 156,
        name: "晨光文具套装",
        price: 39,
        category: "books",
        image: "https://picsum.photos/seed/156/400/300",
        rating: 4.3,
        description: "【产品特色】 晨光文具套装，多种文具，性价比高 品质优良，设计精美，实用耐用。适合追求品质的用户。",
        reviews: []
    },
    {
        id: 157,
        name: "花王纸尿裤",
        price: 189,
        category: "baby",
        image: "https://picsum.photos/seed/157/400/300",
        rating: 4.7,
        description: "【产品特色】 花王纸尿裤，日本进口，干爽舒适 安全材质，温和配方，呵护宝宝。适合关爱宝宝的家庭。",
        reviews: []
    },
    {
        id: 158,
        name: "大王纸尿裤",
        price: 169,
        category: "baby",
        image: "https://picsum.photos/seed/158/400/300",
        rating: 4.6,
        description: "【产品特色】 大王纸尿裤，日本制造，柔软透气 安全材质，温和配方，呵护宝宝。适合关爱宝宝的家庭。",
        reviews: []
    },
    {
        id: 159,
        name: "布朗博士奶瓶",
        price: 129,
        category: "baby",
        image: "https://picsum.photos/seed/159/400/300",
        rating: 4.5,
        description: "【产品特色】 布朗博士防胀气奶瓶，专利设计，安全可靠 安全材质，温和配方，呵护宝宝。适合关爱宝宝的家庭。",
        reviews: []
    },
    {
        id: 160,
        name: "可么多么奶瓶",
        price: 99,
        category: "baby",
        image: "https://picsum.photos/seed/160/400/300",
        rating: 4.4,
        description: "【产品特色】 可么多么奶瓶，硅胶材质，柔软安全 安全材质，温和配方，呵护宝宝。适合关爱宝宝的家庭。",
        reviews: []
    },
    {
        id: 161,
        name: "美孚机油",
        price: 399,
        category: "car",
        image: "https://picsum.photos/seed/161/400/300",
        rating: 4.6,
        description: "【产品特色】 美孚全合成机油，润滑保护，延长发动机寿命 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 162,
        name: "壳牌机油",
        price: 369,
        category: "car",
        image: "https://picsum.photos/seed/162/400/300",
        rating: 4.5,
        description: "【产品特色】 壳牌全合成机油，清洁保护，提升动力 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 163,
        name: "博世雨刮器",
        price: 199,
        category: "car",
        image: "https://picsum.photos/seed/163/400/300",
        rating: 4.4,
        description: "【产品特色】 博世雨刮器，德国品质，刮水干净 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 164,
        name: "瓦尔塔电瓶",
        price: 599,
        category: "car",
        image: "https://picsum.photos/seed/164/400/300",
        rating: 4.5,
        description: "【产品特色】 瓦尔塔汽车电瓶，德国技术，启动强劲 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 165,
        name: "固特异轮胎",
        price: 699,
        category: "car",
        image: "https://picsum.photos/seed/165/400/300",
        rating: 4.6,
        description: "【产品特色】 固特异轮胎，静音舒适，安全可靠 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 166,
        name: "普利司通轮胎",
        price: 799,
        category: "car",
        image: "https://picsum.photos/seed/166/400/300",
        rating: 4.5,
        description: "【产品特色】 普利司通轮胎，耐磨耐用，性能稳定 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 167,
        name: "曼牌滤清器",
        price: 129,
        category: "car",
        image: "https://picsum.photos/seed/167/400/300",
        rating: 4.4,
        description: "【产品特色】 曼牌空气滤清器，德国制造，过滤效果好 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 168,
        name: "马勒滤清器",
        price: 99,
        category: "car",
        image: "https://picsum.photos/seed/168/400/300",
        rating: 4.3,
        description: "【产品特色】 马勒机油滤清器，德国技术，过滤效果好 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 169,
        name: "博世火花塞",
        price: 159,
        category: "car",
        image: "https://picsum.photos/seed/169/400/300",
        rating: 4.5,
        description: "【产品特色】 博世火花塞，德国品质，点火稳定 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    {
        id: 170,
        name: "NGK火花塞",
        price: 139,
        category: "car",
        image: "https://picsum.photos/seed/170/400/300",
        rating: 4.4,
        description: "【产品特色】 NGK火花塞，日本技术，性能稳定 品质可靠，性能出色，安全耐用。适合爱车人士。",
        reviews: []
    },
    // 继续扩展更多商品 - 电子产品类
    {
        id: 171,
        name: "佳能单反相机",
        price: 5899,
        category: "electronics",
        image: "https://picsum.photos/seed/171/400/300",
        rating: 4.6,
        description: "【产品特色】 佳能专业单反相机，高画质，适合摄影爱好者 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 172,
        name: "尼康微单相机",
        price: 6999,
        category: "electronics",
        image: "https://picsum.photos/seed/172/400/300",
        rating: 4.7,
        description: "【产品特色】 尼康全画幅微单相机，轻便高性能 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 173,
        name: "大疆无人机",
        price: 8999,
        category: "electronics",
        image: "https://picsum.photos/seed/173/400/300",
        rating: 4.8,
        description: "【产品特色】 大疆专业无人机，高清航拍，智能飞行 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 174,
        name: "GoPro运动相机",
        price: 2999,
        category: "electronics",
        image: "https://picsum.photos/seed/174/400/300",
        rating: 4.5,
        description: "【产品特色】 GoPro运动相机，防水防抖，适合运动拍摄 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 175,
        name: "JBL蓝牙音箱",
        price: 599,
        category: "electronics",
        image: "https://picsum.photos/seed/175/400/300",
        rating: 4.4,
        description: "【产品特色】 JBL便携蓝牙音箱，音质出色，防水设计 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    {
        id: 176,
        name: "Bose音响系统",
        price: 3999,
        category: "electronics",
        image: "https://picsum.photos/seed/176/400/300",
        rating: 4.7,
        description: "【产品特色】 Bose家庭音响系统，环绕立体声，震撼音效 采用先进技术，性能卓越，品质保证。适合追求高品质生活的用户。",
        reviews: []
    },
    // 继续扩展服装类
    {
        id: 177,
        name: "优衣库羽绒服",
        price: 699,
        category: "clothing",
        image: "https://picsum.photos/seed/177/400/300",
        rating: 4.5,
        description: "【产品特色】 优衣库轻量羽绒服，保暖舒适，简约设计 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 178,
        name: "波司登羽绒服",
        price: 1299,
        category: "clothing",
        image: "https://picsum.photos/seed/178/400/300",
        rating: 4.6,
        description: "【产品特色】 波司登专业羽绒服，极寒保暖，品质保证 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 179,
        name: "太平鸟女装",
        price: 399,
        category: "clothing",
        image: "https://picsum.photos/seed/179/400/300",
        rating: 4.4,
        description: "【产品特色】 太平鸟时尚女装，设计新颖，适合年轻女性 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 180,
        name: "森马休闲装",
        price: 199,
        category: "clothing",
        image: "https://picsum.photos/seed/180/400/300",
        rating: 4.3,
        description: "【产品特色】 森马休闲服装，舒适耐穿，性价比高 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 181,
        name: "七匹狼男装",
        price: 499,
        category: "clothing",
        image: "https://picsum.photos/seed/181/400/300",
        rating: 4.4,
        description: "【产品特色】 七匹狼商务男装，品质优良，适合职场 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    {
        id: 182,
        name: "海澜之家",
        price: 299,
        category: "clothing",
        image: "https://picsum.photos/seed/182/400/300",
        rating: 4.3,
        description: "【产品特色】 海澜之家男装，款式多样，性价比高 精选优质材质，时尚设计，舒适百搭。适合日常穿着和时尚搭配。",
        reviews: []
    },
    // 继续扩展美妆护肤类
    {
        id: 183,
        name: "雪花秀护肤套装",
        price: 1280,
        category: "cosmetics",
        image: "https://picsum.photos/seed/183/400/300",
        rating: 4.7,
        description: "【产品特色】 雪花秀韩方护肤套装，滋养修护，改善肤质 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 184,
        name: "后天气丹套装",
        price: 1580,
        category: "cosmetics",
        image: "https://picsum.photos/seed/184/400/300",
        rating: 4.8,
        description: "【产品特色】 后天气丹护肤套装，宫廷秘方，奢华护肤 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 185,
        name: "芙丽芳丝洁面乳",
        price: 99,
        category: "cosmetics",
        image: "https://picsum.photos/seed/185/400/300",
        rating: 4.6,
        description: "【产品特色】 芙丽芳丝氨基酸洁面乳，温和清洁，敏感肌适用 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 186,
        name: "丝塔芙洗面奶",
        price: 89,
        category: "cosmetics",
        image: "https://picsum.photos/seed/186/400/300",
        rating: 4.5,
        description: "【产品特色】 丝塔芙温和洗面奶，无刺激配方，适合敏感肌 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 187,
        name: "欧舒丹身体乳",
        price: 285,
        category: "cosmetics",
        image: "https://picsum.photos/seed/187/400/300",
        rating: 4.6,
        description: "【产品特色】 欧舒丹身体乳，滋润保湿，多种香型选择 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    {
        id: 188,
        name: "多芬沐浴露",
        price: 39,
        category: "cosmetics",
        image: "https://picsum.photos/seed/188/400/300",
        rating: 4.4,
        description: "【产品特色】 多芬沐浴露，滋润保湿，性价比高 精选有效成分，温和配方，呵护肌肤。适合追求美丽健康的用户。",
        reviews: []
    },
    // 继续扩展家居用品类
    {
        id: 189,
        name: "九阳豆浆机",
        price: 399,
        category: "home",
        image: "https://picsum.photos/seed/189/400/300",
        rating: 4.5,
        description: "【产品特色】 九阳全自动豆浆机，一键制作，方便快捷 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 190,
        name: "苏泊尔压力锅",
        price: 299,
        category: "home",
        image: "https://picsum.photos/seed/190/400/300",
        rating: 4.4,
        description: "【产品特色】 苏泊尔电压力锅，多功能烹饪，安全可靠 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 191,
        name: "美的电风扇",
        price: 199,
        category: "home",
        image: "https://picsum.photos/seed/191/400/300",
        rating: 4.3,
        description: "【产品特色】 美的静音电风扇，多档调节，节能省电 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 192,
        name: "格力电暖器",
        price: 399,
        category: "home",
        image: "https://picsum.photos/seed/192/400/300",
        rating: 4.4,
        description: "【产品特色】 格力电暖器，快速升温，安全防护 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 193,
        name: "海尔洗衣机",
        price: 2599,
        category: "home",
        image: "https://picsum.photos/seed/193/400/300",
        rating: 4.6,
        description: "【产品特色】 海尔滚筒洗衣机，智能控制，节能静音 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    {
        id: 194,
        name: "小天鹅洗衣机",
        price: 1999,
        category: "home",
        image: "https://picsum.photos/seed/194/400/300",
        rating: 4.5,
        description: "【产品特色】 小天鹅波轮洗衣机，大容量，性价比高 设计人性化，功能实用，提升生活品质。适合追求舒适家居的用户。",
        reviews: []
    },
    // 继续扩展运动户外类
    {
        id: 195,
        name: "哥伦比亚冲锋衣",
        price: 899,
        category: "sports",
        image: "https://picsum.photos/seed/195/400/300",
        rating: 4.6,
        description: "【产品特色】 哥伦比亚专业冲锋衣，防水透气，户外必备 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 196,
        name: "北面羽绒服",
        price: 1299,
        category: "sports",
        image: "https://picsum.photos/seed/196/400/300",
        rating: 4.7,
        description: "【产品特色】 北面专业羽绒服，极寒保暖，登山徒步 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 197,
        name: "探路者帐篷",
        price: 599,
        category: "sports",
        image: "https://picsum.photos/seed/197/400/300",
        rating: 4.5,
        description: "【产品特色】 探路者户外帐篷，防风防水，适合露营 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 198,
        name: "骆驼登山鞋",
        price: 499,
        category: "sports",
        image: "https://picsum.photos/seed/198/400/300",
        rating: 4.4,
        description: "【产品特色】 骆驼专业登山鞋，防滑耐磨，支撑性强 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 199,
        name: "迪卡侬自行车",
        price: 1299,
        category: "sports",
        image: "https://picsum.photos/seed/199/400/300",
        rating: 4.5,
        description: "【产品特色】 迪卡侬山地自行车，21速变速，适合骑行 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    {
        id: 200,
        name: "永久自行车",
        price: 699,
        category: "sports",
        image: "https://picsum.photos/seed/200/400/300",
        rating: 4.3,
        description: "【产品特色】 永久经典自行车，坚固耐用，性价比高 专业设计，性能出色，助力运动表现。适合热爱运动的用户。",
        reviews: []
    },
    // 继续扩展食品类
    {
        id: 201,
        name: "蒙牛纯牛奶",
        price: 59,
        category: "food",
        image: "https://picsum.photos/seed/201/400/300",
        rating: 4.4,
        description: "【产品特色】 蒙牛纯牛奶，营养丰富，新鲜健康 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 202,
        name: "伊利酸奶",
        price: 39,
        category: "food",
        image: "https://picsum.photos/seed/202/400/300",
        rating: 4.3,
        description: "【产品特色】 伊利酸奶，口感醇厚，有益肠道健康 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 203,
        name: "康师傅方便面",
        price: 15,
        category: "food",
        image: "https://picsum.photos/seed/203/400/300",
        rating: 4.2,
        description: "【产品特色】 康师傅方便面，多种口味，方便快捷 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 204,
        name: "统一方便面",
        price: 12,
        category: "food",
        image: "https://picsum.photos/seed/204/400/300",
        rating: 4.1,
        description: "【产品特色】 统一方便面，经典口味，价格实惠 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 205,
        name: "金龙鱼食用油",
        price: 89,
        category: "food",
        image: "https://picsum.photos/seed/205/400/300",
        rating: 4.4,
        description: "【产品特色】 金龙鱼食用油，健康营养，适合烹饪 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    },
    {
        id: 206,
        name: "福临门大米",
        price: 69,
        category: "food",
        image: "https://picsum.photos/seed/206/400/300",
        rating: 4.3,
        description: "【产品特色】 福临门优质大米，口感香糯，营养丰富 精选原料，新鲜美味，营养健康。适合追求品质生活的用户。",
        reviews: []
    }
];

// 平替方案数据 - 大幅扩展
const alternatives = [
    {
        id: 1,
        original: { id: 1, name: "iPhone 15 Pro", price: 8999, image: "https://picsum.photos/seed/1/400/300" },
        replacement: { id: 2, name: "小米14 Pro", price: 4999, image: "https://picsum.photos/seed/2/400/300" },
        savings: 4000,
        reason: "小米14 Pro采用骁龙8 Gen3处理器，性能接近iPhone 15 Pro，但价格便宜4000元。徕卡影像系统拍照效果出色，MIUI系统功能丰富。"
    },
    {
        id: 2,
        original: { id: 3, name: "AirPods Pro 2", price: 1899, image: "https://picsum.photos/seed/3/400/300" },
        replacement: { id: 4, name: "华为FreeBuds Pro 3", price: 999, image: "https://picsum.photos/seed/4/400/300" },
        savings: 900,
        reason: "华为FreeBuds Pro 3降噪效果优秀，音质清晰，续航时间长。虽然缺少空间音频，但日常使用体验接近AirPods Pro 2，价格便宜近一半。"
    },
    {
        id: 3,
        original: { id: 5, name: "Nike Air Max 270", price: 1299, image: "https://picsum.photos/seed/5/400/300" },
        replacement: { id: 6, name: "安踏运动鞋", price: 399, image: "https://picsum.photos/seed/6/400/300" },
        savings: 900,
        reason: "安踏运动鞋采用自主研发的缓震科技，舒适度和支撑性都不错。虽然品牌知名度不如Nike，但性价比极高，适合日常运动和通勤。"
    },
    {
        id: 4,
        original: { id: 7, name: "SK-II 神仙水", price: 1590, image: "https://picsum.photos/seed/7/400/300" },
        replacement: { id: 8, name: "自然堂雪域精华", price: 299, image: "https://picsum.photos/seed/8/400/300" },
        savings: 1291,
        reason: "自然堂雪域精华采用雪域植物提取物，补水保湿效果明显。虽然成分不如SK-II的Pitera独特，但作为日常护肤使用，性价比很高。"
    },
    {
        id: 5,
        original: { id: 9, name: "Dyson V15 吸尘器", price: 4990, image: "https://picsum.photos/seed/9/400/300" },
        replacement: { id: 10, name: "小米无线吸尘器", price: 999, image: "https://picsum.photos/seed/10/400/300" },
        savings: 3991,
        reason: "小米无线吸尘器吸力强劲，配备多种刷头，满足日常清洁需求。虽然缺少Dyson的激光探测功能，但基础清洁效果接近，价格仅为Dyson的五分之一。"
    },
    {
        id: 6,
        original: { id: 13, name: "MacBook Pro 16寸", price: 19999, image: "https://picsum.photos/seed/13/400/300" },
        replacement: { id: 14, name: "联想ThinkPad X1 Carbon", price: 8999, image: "https://picsum.photos/seed/14/400/300" },
        savings: 11000,
        reason: "ThinkPad X1 Carbon是商务笔记本的经典选择，轻薄便携，性能强劲。虽然不如MacBook Pro的屏幕和系统，但对于Windows用户来说，性价比更高。"
    },
    {
        id: 7,
        original: { id: 15, name: "iPad Pro 12.9寸", price: 6799, image: "https://picsum.photos/seed/15/400/300" },
        replacement: { id: 16, name: "华为MatePad Pro", price: 3299, image: "https://picsum.photos/seed/16/400/300" },
        savings: 3500,
        reason: "华为MatePad Pro采用麒麟9000S芯片，11寸OLED屏幕显示效果出色。虽然生态不如iPad，但对于日常办公和娱乐，性价比更高。"
    },
    {
        id: 8,
        original: { id: 17, name: "Apple Watch Series 9", price: 2999, image: "https://picsum.photos/seed/17/400/300" },
        replacement: { id: 18, name: "华为Watch GT 4", price: 1288, image: "https://picsum.photos/seed/18/400/300" },
        savings: 1711,
        reason: "华为Watch GT 4续航时间长达两周，健康监测功能全面。虽然应用生态不如Apple Watch，但对于Android用户来说，性价比更高。"
    },
    {
        id: 9,
        original: { id: 19, name: "Sony A7M4 相机", price: 16999, image: "https://picsum.photos/seed/19/400/300" },
        replacement: { id: 21, name: "富士X-T5", price: 11990, image: "https://picsum.photos/seed/21/400/300" },
        savings: 5009,
        reason: "富士X-T5采用4020万像素APS-C传感器，画质出色，复古外观设计独特。虽然传感器尺寸小于A7M4，但对于摄影爱好者来说，性价比更高。"
    },
    {
        id: 10,
        original: { id: 29, name: "Coach手提包", price: 2999, image: "https://picsum.photos/seed/29/400/300" },
        replacement: { id: 30, name: "小CK手提包", price: 399, image: "https://picsum.photos/seed/30/400/300" },
        savings: 2600,
        reason: "小CK（Charles & Keith）手提包设计简约时尚，材质和做工都不错。虽然品牌知名度不如Coach，但性价比极高，适合日常使用。"
    },
    {
        id: 11,
        original: { id: 33, name: "Ray-Ban太阳镜", price: 1299, image: "https://picsum.photos/seed/33/400/300" },
        replacement: { id: 34, name: "暴龙太阳镜", price: 399, image: "https://picsum.photos/seed/34/400/300" },
        savings: 900,
        reason: "暴龙太阳镜同样提供UV400防护，设计时尚。虽然品牌不如Ray-Ban知名，但性价比高，日常使用完全足够。"
    },
    {
        id: 12,
        original: { id: 35, name: "兰蔻小黑瓶", price: 1080, image: "https://picsum.photos/seed/35/400/300" },
        replacement: { id: 36, name: "欧莱雅小黑瓶", price: 299, image: "https://picsum.photos/seed/36/400/300" },
        savings: 781,
        reason: "欧莱雅小黑瓶与兰蔻同属欧莱雅集团，核心成分相似，但价格便宜很多。虽然浓度可能略低，但性价比极高。"
    },
    {
        id: 13,
        original: { id: 37, name: "雅诗兰黛小棕瓶", price: 1150, image: "https://picsum.photos/seed/37/400/300" },
        replacement: { id: 38, name: "珀莱雅双抗精华", price: 269, image: "https://picsum.photos/seed/38/400/300" },
        savings: 881,
        reason: "珀莱雅双抗精华主打抗氧化和抗糖化，成分科学，效果明显。虽然品牌不如雅诗兰黛知名，但性价比很高。"
    },
    {
        id: 14,
        original: { id: 39, name: "Dior口红999", price: 350, image: "https://picsum.photos/seed/39/400/300" },
        replacement: { id: 40, name: "完美日记口红", price: 69, image: "https://picsum.photos/seed/40/400/300" },
        savings: 281,
        reason: "完美日记口红色号丰富，显色度和持久度都不错。虽然包装和品牌不如Dior，但性价比极高，适合日常使用。"
    },
    {
        id: 15,
        original: { id: 41, name: "La Mer面霜", price: 2800, image: "https://picsum.photos/seed/41/400/300" },
        replacement: { id: 42, name: "玉兰油大红瓶", price: 299, image: "https://picsum.photos/seed/42/400/300" },
        savings: 2501,
        reason: "玉兰油大红瓶主打抗衰老，含有烟酰胺等有效成分。虽然不如La Mer奢华，但作为日常抗老面霜，性价比很高。"
    },
    {
        id: 16,
        original: { id: 45, name: "Dyson吹风机", price: 2990, image: "https://picsum.photos/seed/45/400/300" },
        replacement: { id: 46, name: "飞科吹风机", price: 199, image: "https://picsum.photos/seed/46/400/300" },
        savings: 2791,
        reason: "飞科负离子吹风机同样能快速干发，负离子功能护发。虽然风速和科技不如Dyson，但日常使用完全足够，性价比极高。"
    },
    {
        id: 17,
        original: { id: 47, name: "西门子洗碗机", price: 5999, image: "https://picsum.photos/seed/47/400/300" },
        replacement: { id: 48, name: "美的洗碗机", price: 2999, image: "https://picsum.photos/seed/48/400/300" },
        savings: 3000,
        reason: "美的洗碗机同样13套容量，高温除菌功能齐全。虽然品牌和做工可能略逊于西门子，但性价比很高，功能基本一致。"
    },
    {
        id: 18,
        original: { id: 49, name: "飞利浦空气净化器", price: 3999, image: "https://picsum.photos/seed/49/400/300" },
        replacement: { id: 50, name: "小米空气净化器", price: 999, image: "https://picsum.photos/seed/50/400/300" },
        savings: 3000,
        reason: "小米空气净化器采用HEPA过滤，智能控制方便。虽然CADR值可能略低，但对于一般家庭使用，性价比很高。"
    },
    {
        id: 19,
        original: { id: 55, name: "Lululemon瑜伽裤", price: 899, image: "https://picsum.photos/seed/55/400/300" },
        replacement: { id: 56, name: "Keep瑜伽裤", price: 199, image: "https://picsum.photos/seed/56/400/300" },
        savings: 700,
        reason: "Keep瑜伽裤同样高弹力，舒适透气。虽然材质和细节可能不如Lululemon，但性价比极高，适合日常瑜伽练习。"
    },
    {
        id: 20,
        original: { id: 61, name: "Peloton动感单车", price: 12999, image: "https://picsum.photos/seed/61/400/300" },
        replacement: { id: 62, name: "野小兽动感单车", price: 1999, image: "https://picsum.photos/seed/62/400/300" },
        savings: 11000,
        reason: "野小兽智能动感单车同样提供在线课程，功能齐全。虽然品牌和课程质量可能不如Peloton，但性价比极高。"
    },
    {
        id: 21,
        original: { id: 63, name: "三顿半咖啡", price: 89, image: "https://picsum.photos/seed/63/400/300" },
        replacement: { id: 64, name: "雀巢咖啡", price: 39, image: "https://picsum.photos/seed/64/400/300" },
        savings: 50,
        reason: "雀巢速溶咖啡经典口味，方便快捷。虽然品质不如三顿半精品咖啡，但性价比高，适合日常饮用。"
    },
    {
        id: 22,
        original: { id: 65, name: "Godiva巧克力", price: 299, image: "https://picsum.photos/seed/65/400/300" },
        replacement: { id: 66, name: "德芙巧克力", price: 49, image: "https://picsum.photos/seed/66/400/300" },
        savings: 250,
        reason: "德芙巧克力丝滑口感，价格实惠。虽然不如Godiva精致，但日常食用性价比很高。"
    },
    {
        id: 23,
        original: { id: 67, name: "依云矿泉水", price: 15, image: "https://picsum.photos/seed/67/400/300" },
        replacement: { id: 68, name: "农夫山泉", price: 2, image: "https://picsum.photos/seed/68/400/300" },
        savings: 13,
        reason: "农夫山泉天然水，有点甜，性价比极高。虽然品牌不如依云，但日常饮用完全足够。"
    },
    {
        id: 24,
        original: { id: 71, name: "Kindle Paperwhite", price: 998, image: "https://picsum.photos/seed/71/400/300" },
        replacement: { id: 72, name: "掌阅iReader", price: 599, image: "https://picsum.photos/seed/72/400/300" },
        savings: 399,
        reason: "掌阅iReader电子书阅读器，6寸屏幕护眼阅读。虽然生态不如Kindle，但对于中文阅读，性价比更高。"
    },
    {
        id: 25,
        original: { id: 73, name: "Lamy钢笔", price: 299, image: "https://picsum.photos/seed/73/400/300" },
        replacement: { id: 74, name: "英雄钢笔", price: 39, image: "https://picsum.photos/seed/74/400/300" },
        savings: 260,
        reason: "英雄经典钢笔，国货精品，书写流畅。虽然品牌不如Lamy知名，但性价比极高，适合日常使用。"
    },
    {
        id: 26,
        original: { id: 75, name: "Moleskine笔记本", price: 199, image: "https://picsum.photos/seed/75/400/300" },
        replacement: { id: 76, name: "得力笔记本", price: 19, image: "https://picsum.photos/seed/76/400/300" },
        savings: 180,
        reason: "得力笔记本实用耐用，性价比极高。虽然设计和品牌不如Moleskine，但日常记录完全足够。"
    },
    {
        id: 27,
        original: { id: 77, name: "Pampers纸尿裤", price: 199, image: "https://picsum.photos/seed/77/400/300" },
        replacement: { id: 78, name: "好奇纸尿裤", price: 129, image: "https://picsum.photos/seed/78/400/300" },
        savings: 70,
        reason: "好奇纸尿裤干爽舒适，性价比高。虽然品牌不如帮宝适，但质量可靠，适合日常使用。"
    },
    {
        id: 28,
        original: { id: 79, name: "Avent奶瓶", price: 199, image: "https://picsum.photos/seed/79/400/300" },
        replacement: { id: 80, name: "贝亲奶瓶", price: 69, image: "https://picsum.photos/seed/80/400/300" },
        savings: 130,
        reason: "贝亲奶瓶安全材质，性价比高。虽然设计可能不如Avent，但质量可靠，适合日常使用。"
    },
    {
        id: 29,
        original: { id: 81, name: "3M汽车贴膜", price: 2999, image: "https://picsum.photos/seed/81/400/300" },
        replacement: { id: 82, name: "龙膜汽车贴膜", price: 1299, image: "https://picsum.photos/seed/82/400/300" },
        savings: 1700,
        reason: "龙膜汽车贴膜同样提供隔热防爆功能，性价比高。虽然品牌不如3M，但质量可靠，适合日常使用。"
    },
    {
        id: 30,
        original: { id: 83, name: "米其林轮胎", price: 899, image: "https://picsum.photos/seed/83/400/300" },
        replacement: { id: 84, name: "朝阳轮胎", price: 399, image: "https://picsum.photos/seed/84/400/300" },
        savings: 500,
        reason: "朝阳轮胎性价比高，耐用可靠。虽然静音和舒适度可能略逊于米其林，但日常使用完全足够。"
    }
];

// 用户数据（简化版，实际应该存储在服务器）
let currentUser = null;
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
