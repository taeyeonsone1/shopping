// 商品详情页功能

document.addEventListener('DOMContentLoaded', function() {
    const productId = parseInt(getUrlParameter('id'));
    if (productId) {
        loadProductDetail(productId);
        loadAlternatives(productId);
        loadReviews(productId);
    }
});

// 加载商品详情
async function loadProductDetail(productId) {
    try {
        const product = await getProduct(productId);
        
        const container = document.getElementById('productDetail');
        container.innerHTML = `
            <div class="detail-header">
                <img src="${product.image}" alt="${product.name}" class="detail-image">
                <div class="detail-info">
                    <h1>${product.name}</h1>
                    <div class="detail-price">¥${product.price}</div>
                    <div class="detail-rating">${'★'.repeat(Math.floor(product.rating))} ${product.rating}</div>
                    <div class="detail-description">${product.description}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">加入购物车</button>
                        <button class="btn btn-secondary" onclick="toggleFavorite(${product.id})">收藏</button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('加载商品详情失败:', error);
        // 如果API失败，使用本地数据作为后备
        if (typeof products !== 'undefined') {
            const product = products.find(p => p.id === productId);
            if (!product) {
                document.getElementById('productDetail').innerHTML = '<p>商品不存在</p>';
                return;
            }
            
            const container = document.getElementById('productDetail');
            container.innerHTML = `
                <div class="detail-header">
                    <img src="${product.image}" alt="${product.name}" class="detail-image">
                    <div class="detail-info">
                        <h1>${product.name}</h1>
                        <div class="detail-price">¥${product.price}</div>
                        <div class="detail-rating">${'★'.repeat(Math.floor(product.rating))} ${product.rating}</div>
                        <div class="detail-description">${product.description}</div>
                        <div class="product-actions">
                            <button class="btn btn-primary" onclick="addToCart(${product.id})">加入购物车</button>
                            <button class="btn btn-secondary" onclick="toggleFavorite(${product.id})">收藏</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// 加载平替方案
async function loadAlternatives(productId) {
    const container = document.getElementById('alternativesList');
    if (!container) return;
    
    try {
        const allAlternatives = await getAlternatives();
        const productAlternatives = allAlternatives.filter(alt => 
            alt.original.id === productId || alt.replacement.id === productId
        );
        
        if (productAlternatives.length === 0) {
            container.innerHTML = '<p>暂无平替方案</p>';
            return;
        }
        
        container.innerHTML = productAlternatives.map(alt => {
            const isOriginal = alt.original.id === productId;
            const otherProduct = isOriginal ? alt.replacement : alt.original;
            
            return `
                <div class="alternative-item">
                    <h3>${isOriginal ? '平替推荐' : '原商品对比'}</h3>
                    <div class="replacement-product">
                        <strong>${otherProduct.name}</strong><br>
                        <span class="product-price">¥${otherProduct.price}</span>
                        <div class="product-comparison" style="margin-top: 10px;">
                            <span>节省：<span class="price-difference">¥${alt.savings}</span></span>
                            <span class="savings-badge">省${Math.round(alt.savings/alt.original.price*100)}%</span>
                        </div>
                    </div>
                    <p style="margin-top: 10px; color: #666;">${alt.reason}</p>
                    <button class="btn btn-primary" style="margin-top: 10px; width: 100%;" onclick="window.location.href='product-detail.html?id=${otherProduct.id}'">查看详情</button>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('加载平替方案失败:', error);
        // 如果API失败，使用本地数据作为后备
        if (typeof alternatives !== 'undefined') {
            const productAlternatives = alternatives.filter(alt => 
                alt.original.id === productId || alt.replacement.id === productId
            );
            
            if (productAlternatives.length === 0) {
                container.innerHTML = '<p>暂无平替方案</p>';
                return;
            }
            
            container.innerHTML = productAlternatives.map(alt => {
                const isOriginal = alt.original.id === productId;
                const otherProduct = isOriginal ? alt.replacement : alt.original;
                
                return `
                    <div class="alternative-item">
                        <h3>${isOriginal ? '平替推荐' : '原商品对比'}</h3>
                        <div class="replacement-product">
                            <strong>${otherProduct.name}</strong><br>
                            <span class="product-price">¥${otherProduct.price}</span>
                            <div class="product-comparison" style="margin-top: 10px;">
                                <span>节省：<span class="price-difference">¥${alt.savings}</span></span>
                                <span class="savings-badge">省${Math.round(alt.savings/alt.original.price*100)}%</span>
                            </div>
                        </div>
                        <p style="margin-top: 10px; color: #666;">${alt.reason}</p>
                        <button class="btn btn-primary" style="margin-top: 10px; width: 100%;" onclick="window.location.href='product-detail.html?id=${otherProduct.id}'">查看详情</button>
                    </div>
                `;
            }).join('');
        }
    }
}

// 加载评价
async function loadReviews(productId) {
    const container = document.getElementById('reviewsList');
    if (!container) return;
    
    try {
        const product = await getProduct(productId);
        const reviews = product.reviews || [];
        
        if (reviews.length === 0) {
            container.innerHTML = '<p>暂无评价</p>';
            return;
        }
        
        container.innerHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">${review.author}</span>
                    <span class="review-rating">${'★'.repeat(review.rating)}</span>
                </div>
                <p>${review.comment}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('加载评价失败:', error);
        // 如果API失败，使用本地数据作为后备
        if (typeof products !== 'undefined') {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const reviews = product.reviews || [];
            if (reviews.length === 0) {
                container.innerHTML = '<p>暂无评价</p>';
                return;
            }
            
            container.innerHTML = reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">${review.author}</span>
                        <span class="review-rating">${'★'.repeat(review.rating)}</span>
                    </div>
                    <p>${review.comment}</p>
                </div>
            `).join('');
        }
    }
}

// 加入购物车（简化版）
function addToCart(productId) {
    alert('已加入购物车（演示功能）');
}




