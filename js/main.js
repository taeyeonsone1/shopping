// 通用功能函数

// 检查登录状态
async function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');
    
    if (user && token) {
        try {
            // 验证token是否有效
            const userData = await getCurrentUser();
            currentUser = {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } catch (error) {
            // Token无效，清除登录状态
            logout();
            return;
        }
    } else if (user) {
        currentUser = JSON.parse(user);
    }
    
    if (currentUser) {
        const loginLink = document.getElementById('loginLink');
        const favoritesLink = document.getElementById('favoritesLink');
        const userInfoTop = document.getElementById('userInfoTop');
        const usernameDisplay = document.getElementById('usernameDisplay');
        
        if (loginLink) loginLink.style.display = 'none';
        if (favoritesLink) favoritesLink.style.display = 'block';
        if (userInfoTop) userInfoTop.style.display = 'flex';
        if (usernameDisplay) usernameDisplay.textContent = currentUser.username;
    } else {
        const userInfoTop = document.getElementById('userInfoTop');
        if (userInfoTop) userInfoTop.style.display = 'none';
    }
}

// 退出登录
function logout() {
    if (confirm('确定要退出登录吗？')) {
        removeToken();
        localStorage.removeItem('currentUser');
        currentUser = null;
        alert('已退出登录');
        window.location.href = 'index.html';
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', async function() {
    await checkLoginStatus();
    
    // 如果是首页，加载所有内容
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProducts();
        loadAlternativesPreview();
        loadSpecialOffers();
        showCategoryProducts('electronics'); // 默认显示电子产品
    }
});

// 加载热门商品
async function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    try {
        // 从API获取商品
        const data = await getProducts({ limit: 6 });
        const featured = data.products;
        
        // 确保图片已更新
        if (typeof updateProductImages === 'function') {
            updateProductImages();
        }
        
        container.innerHTML = featured.map(product => createProductCard(product)).join('');
        
        // 添加点击事件
        container.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                const productId = this.dataset.id;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
    } catch (error) {
        console.error('加载商品失败:', error);
        // 如果API失败，使用本地数据作为后备
        if (typeof products !== 'undefined') {
            const featured = products.slice(0, 6);
            container.innerHTML = featured.map(product => createProductCard(product)).join('');
        }
    }
}

// 创建商品卡片
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-badge">${getCategoryIcon(product.category)}</div>
                <div class="product-overlay">
                    <button class="quick-view-btn" onclick="event.stopPropagation(); quickView(${product.id})">
                        <span class="icon">👁️</span> 快速查看
                    </button>
                    <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavorite(${product.id})" data-product="${product.id}">
                        <span class="icon">❤️</span>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="price-amount">¥${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="price-original">¥${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars-container">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="rating-value">${product.rating}</span>
                    <span class="review-count">(${product.reviews ? product.reviews.length : 0}评价)</span>
                </div>
                <div class="product-category">
                    <span class="category-icon">${getCategoryIcon(product.category)}</span>
                    <span class="category-name">${getCategoryName(product.category)}</span>
                </div>
                <p class="product-description">${product.description ? product.description.substring(0, 80) + '...' : '暂无描述'}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${product.id}'">查看详情</button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); toggleFavorite(${product.id})">收藏</button>
                </div>
            </div>
        </div>
    `;
}

// 生成星级评分
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star full">⭐</span>';
    }
    
    if (hasHalfStar) {
        stars += '<span class="star half">⭐</span>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="star empty">⭐</span>';
    }
    
    return stars;
}

// 获取分类图标
function getCategoryIcon(category) {
    const icons = {
        'electronics': '📱',
        'clothing': '👔', 
        'cosmetics': '💄',
        'home': '🏠',
        'sports': '⚽',
        'food': '🍔',
        'books': '📚',
        'baby': '👶',
        'car': '🚗'
    };
    return icons[category] || '📦';
}

// 获取分类名称
function getCategoryName(category) {
    const names = {
        'electronics': '电子产品',
        'clothing': '服装配饰', 
        'cosmetics': '美妆护肤',
        'home': '家居用品',
        'sports': '运动健身',
        'food': '食品饮料',
        'books': '图书文具',
        'baby': '母婴用品',
        'car': '汽车用品'
    };
    return names[category] || '其他';
}

// 加载平替预览
async function loadAlternativesPreview() {
    const container = document.getElementById('alternativesPreview');
    if (!container) return;
    
    try {
        // 从API获取平替方案
        const preview = await getAlternatives();
        const displayPreview = preview.slice(0, 3);
        
        // 确保图片已更新
        if (typeof updateProductImages === 'function') {
            updateProductImages();
        }
        
        container.innerHTML = displayPreview.map(alt => createAlternativeCard(alt)).join('');
    } catch (error) {
        console.error('加载平替方案失败:', error);
        // 如果API失败，使用本地数据作为后备
        if (typeof alternatives !== 'undefined') {
            const preview = alternatives.slice(0, 3);
            container.innerHTML = preview.map(alt => createAlternativeCard(alt)).join('');
        }
    }
}

// 创建平替卡片
function createAlternativeCard(alternative) {
    // 确保图片已更新
    const originalProduct = products.find(p => p.id === alternative.original.id);
    const replacementProduct = products.find(p => p.id === alternative.replacement.id);
    
    const originalImage = originalProduct ? originalProduct.image : alternative.original.image;
    const replacementImage = replacementProduct ? replacementProduct.image : alternative.replacement.image;
    
    return `
        <div class="alternative-item">
            <h3>${alternative.original.name} → ${alternative.replacement.name}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                <div class="original-product">
                    <strong>原商品：</strong><br>
                    <img src="${originalImage}" alt="${alternative.original.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin: 10px 0;">
                    <div>${alternative.original.name}</div>
                    <span class="product-price">¥${alternative.original.price}</span>
                </div>
                <div class="replacement-product">
                    <strong>平替商品：</strong><br>
                    <img src="${replacementImage}" alt="${alternative.replacement.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin: 10px 0;">
                    <div>${alternative.replacement.name}</div>
                    <span class="product-price">¥${alternative.replacement.price}</span>
                </div>
            </div>
            <div class="product-comparison">
                <span>节省：<span class="price-difference">¥${alternative.savings}</span></span>
                <span class="savings-badge">省${Math.round(alternative.savings/alternative.original.price*100)}%</span>
            </div>
            <p style="margin-top: 10px; color: #666; font-size: 14px;">${alternative.reason}</p>
            <button class="btn btn-primary" style="margin-top: 10px; width: 100%;" onclick="window.location.href='product-detail.html?id=${alternative.replacement.id}'">查看平替商品</button>
        </div>
    `;
}

// 搜索商品
function searchProducts() {
    const keyword = document.getElementById('searchInput').value.trim();
    if (keyword) {
        window.location.href = `products.html?search=${encodeURIComponent(keyword)}`;
    }
}

// 按分类筛选
function filterByCategory(category) {
    window.location.href = `products.html?category=${category}`;
}

// 切换收藏
async function toggleFavorite(productId) {
    if (!currentUser) {
        alert('请先登录');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        // 检查是否已收藏
        const isFavorite = await checkFavorite(productId);
        
        if (isFavorite) {
            await removeFavorite(productId);
            alert('已取消收藏');
        } else {
            await addFavorite(productId);
            alert('已添加收藏');
        }
    } catch (error) {
        alert(error.message || '操作失败，请重试');
    }
}

// 获取URL参数
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 加载特价商品
async function loadSpecialOffers() {
    const container = document.getElementById('specialOffers');
    if (!container) return;
    
    try {
        // 从API获取价格最低的商品作为特价商品
        const data = await getProducts({ sort: 'price-asc', limit: 6 });
        const specialOffers = data.products;
        
        // 确保图片已更新
        if (typeof updateProductImages === 'function') {
            updateProductImages();
        }
        
        container.innerHTML = specialOffers.map(product => {
            const discount = Math.floor(Math.random() * 30) + 10; // 10-40%折扣
            return `
                <div class="product-card special-offer-card" data-id="${product.id}">
                    <div class="discount-badge">-${discount}%</div>
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-title">${product.name}</div>
                        <div class="price-container">
                            <span class="product-price">¥${product.price}</span>
                            <span class="original-price">¥${Math.round(product.price / (1 - discount/100))}</span>
                        </div>
                        <div class="product-rating">${'★'.repeat(Math.floor(product.rating))} ${product.rating}</div>
                        <div class="product-actions">
                            <button class="btn btn-primary" onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${product.id}'">查看详情</button>
                            <button class="btn btn-secondary" onclick="event.stopPropagation(); toggleFavorite(${product.id})">收藏</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // 添加点击事件
        container.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                const productId = this.dataset.id;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
    } catch (error) {
        console.error('加载特价商品失败:', error);
        // 如果API失败，使用本地数据作为后备
        if (typeof products !== 'undefined') {
            const specialOffers = [...products]
                .sort((a, b) => a.price - b.price)
                .slice(0, 6);
            
            container.innerHTML = specialOffers.map(product => {
                const discount = Math.floor(Math.random() * 30) + 10;
                return `
                    <div class="product-card special-offer-card" data-id="${product.id}">
                        <div class="discount-badge">-${discount}%</div>
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-info">
                            <div class="product-title">${product.name}</div>
                            <div class="price-container">
                                <span class="product-price">¥${product.price}</span>
                                <span class="original-price">¥${Math.round(product.price / (1 - discount/100))}</span>
                            </div>
                            <div class="product-rating">${'★'.repeat(Math.floor(product.rating))} ${product.rating}</div>
                            <div class="product-actions">
                                <button class="btn btn-primary" onclick="event.stopPropagation(); window.location.href='product-detail.html?id=${product.id}'">查看详情</button>
                                <button class="btn btn-secondary" onclick="event.stopPropagation(); toggleFavorite(${product.id})">收藏</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

// 显示分类商品
async function showCategoryProducts(category, clickedBtn) {
    const container = document.getElementById('categoryProducts');
    if (!container) return;
    
    // 更新标签按钮状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    } else {
        // 如果没有传入按钮，根据category找到对应的按钮
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach((btn, index) => {
            const categories = ['electronics', 'cosmetics', 'clothing', 'home'];
            if (categories[index] === category) {
                btn.classList.add('active');
            }
        });
    }
    
    try {
        // 从API获取该分类的商品
        const data = await getProducts({ category, limit: 8 });
        const categoryProducts = data.products;
        
        // 确保图片已更新
        if (typeof updateProductImages === 'function') {
            updateProductImages();
        }
        
        if (categoryProducts.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding:40px;">该分类暂无商品</p>';
            return;
        }
        
        container.innerHTML = categoryProducts.map(product => createProductCard(product)).join('');
        
        // 添加点击事件
        container.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                const productId = this.dataset.id;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
    } catch (error) {
        console.error('加载分类商品失败:', error);
        // 如果API失败，使用本地数据作为后备
        if (typeof products !== 'undefined') {
            const categoryProducts = products
                .filter(p => p.category === category)
                .slice(0, 8);
            
            container.innerHTML = categoryProducts.map(product => createProductCard(product)).join('');
        }
    }
}

