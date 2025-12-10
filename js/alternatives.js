// 平替推荐页功能

let filteredAlternatives = [];

document.addEventListener('DOMContentLoaded', function() {
    // 确保图片已更新
    if (typeof updateProductImages === 'function') {
        updateProductImages();
    }
    loadAllAlternatives();
});

// 加载所有平替方案
async function loadAllAlternatives() {
    const container = document.getElementById('alternativesList');
    if (!container) return;
    
    // 应用筛选
    const category = document.getElementById('categoryFilter')?.value;
    const savings = document.getElementById('savingsFilter')?.value;
    const sort = document.getElementById('sortFilter')?.value;
    
    try {
        // 构建API请求参数
        const params = {};
        if (category) params.category = category;
        if (savings) params.savings = savings;
        if (sort) params.sort = sort;
        
        // 从API获取平替方案
        filteredAlternatives = await getAlternatives(params);
        
        // 确保图片已更新
        if (typeof updateProductImages === 'function') {
            updateProductImages();
        }
        
        if (filteredAlternatives.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding:40px; color:#666;">没有找到符合条件的平替方案</p>';
            return;
        }
        
        container.innerHTML = filteredAlternatives.map(alt => {
            const originalImage = alt.original.image;
            const replacementImage = alt.replacement.image;
            const savingsPercent = Math.round(alt.savings/alt.original.price*100);
            
            return `
            <div class="alternative-item">
                <div class="alternative-header">
                    <h3>${alt.original.name} → ${alt.replacement.name}</h3>
                    <div class="savings-highlight">
                        <span class="savings-amount">节省 ¥${alt.savings}</span>
                        <span class="savings-percent">省${savingsPercent}%</span>
                    </div>
                </div>
                <div class="alternative-products">
                    <div class="original-product">
                        <div class="product-label">原商品</div>
                        <img src="${originalImage}" alt="${alt.original.name}" class="alt-product-image">
                        <div class="alt-product-name">${alt.original.name}</div>
                        <div class="alt-product-price">¥${alt.original.price}</div>
                    </div>
                    <div class="arrow-icon">→</div>
                    <div class="replacement-product">
                        <div class="product-label replacement-label">平替商品</div>
                        <img src="${replacementImage}" alt="${alt.replacement.name}" class="alt-product-image">
                        <div class="alt-product-name">${alt.replacement.name}</div>
                        <div class="alt-product-price">¥${alt.replacement.price}</div>
                    </div>
                </div>
                <div class="alternative-reason">
                    <div class="reason-icon">💡</div>
                    <p>${alt.reason}</p>
                </div>
                <div class="alternative-actions">
                    <button class="btn btn-primary" onclick="window.location.href='product-detail.html?id=${alt.replacement.id}'">查看平替商品</button>
                    <button class="btn btn-secondary" onclick="window.location.href='product-detail.html?id=${alt.original.id}'">查看原商品</button>
                </div>
            </div>
            `;
        }).join('');
    } catch (error) {
        console.error('加载平替方案失败:', error);
        // 如果API失败，使用本地数据作为后备
        if (typeof alternatives !== 'undefined') {
            filteredAlternatives = [...alternatives];
            
            // 应用筛选
            if (category) {
                filteredAlternatives = filteredAlternatives.filter(alt => {
                    const originalProduct = products.find(p => p.id === alt.original.id);
                    return originalProduct && originalProduct.category === category;
                });
            }
            
            if (savings) {
                if (savings === '5000+') {
                    filteredAlternatives = filteredAlternatives.filter(alt => alt.savings >= 5000);
                } else if (savings === '2000-5000') {
                    filteredAlternatives = filteredAlternatives.filter(alt => alt.savings >= 2000 && alt.savings < 5000);
                } else if (savings === '1000-2000') {
                    filteredAlternatives = filteredAlternatives.filter(alt => alt.savings >= 1000 && alt.savings < 2000);
                } else if (savings === '0-1000') {
                    filteredAlternatives = filteredAlternatives.filter(alt => alt.savings < 1000);
                }
            }
            
            if (sort === 'savings-desc') {
                filteredAlternatives.sort((a, b) => b.savings - a.savings);
            } else if (sort === 'savings-asc') {
                filteredAlternatives.sort((a, b) => a.savings - b.savings);
            } else if (sort === 'percentage-desc') {
                filteredAlternatives.sort((a, b) => {
                    const aPercent = a.savings / a.original.price;
                    const bPercent = b.savings / b.original.price;
                    return bPercent - aPercent;
                });
            }
            
            container.innerHTML = filteredAlternatives.map(alt => {
                const originalProduct = products.find(p => p.id === alt.original.id);
                const replacementProduct = products.find(p => p.id === alt.replacement.id);
                
                const originalImage = originalProduct ? originalProduct.image : alt.original.image;
                const replacementImage = replacementProduct ? replacementProduct.image : alt.replacement.image;
                const savingsPercent = Math.round(alt.savings/alt.original.price*100);
                
                return `
                <div class="alternative-item">
                    <div class="alternative-header">
                        <h3>${alt.original.name} → ${alt.replacement.name}</h3>
                        <div class="savings-highlight">
                            <span class="savings-amount">节省 ¥${alt.savings}</span>
                            <span class="savings-percent">省${savingsPercent}%</span>
                        </div>
                    </div>
                    <div class="alternative-products">
                        <div class="original-product">
                            <div class="product-label">原商品</div>
                            <img src="${originalImage}" alt="${alt.original.name}" class="alt-product-image">
                            <div class="alt-product-name">${alt.original.name}</div>
                            <div class="alt-product-price">¥${alt.original.price}</div>
                        </div>
                        <div class="arrow-icon">→</div>
                        <div class="replacement-product">
                            <div class="product-label replacement-label">平替商品</div>
                            <img src="${replacementImage}" alt="${alt.replacement.name}" class="alt-product-image">
                            <div class="alt-product-name">${alt.replacement.name}</div>
                            <div class="alt-product-price">¥${alt.replacement.price}</div>
                        </div>
                    </div>
                    <div class="alternative-reason">
                        <div class="reason-icon">💡</div>
                        <p>${alt.reason}</p>
                    </div>
                    <div class="alternative-actions">
                        <button class="btn btn-primary" onclick="window.location.href='product-detail.html?id=${alt.replacement.id}'">查看平替商品</button>
                        <button class="btn btn-secondary" onclick="window.location.href='product-detail.html?id=${alt.original.id}'">查看原商品</button>
                    </div>
                </div>
                `;
            }).join('');
        }
    }
}

// 筛选平替方案
function filterAlternatives() {
    loadAllAlternatives();
}

// 快速筛选
function quickAltFilter(filterType) {
    if (filterType === 'savings-desc') {
        document.getElementById('sortFilter').value = 'savings-desc';
    } else {
        document.getElementById('categoryFilter').value = filterType;
    }
    filterAlternatives();
}

// 重置筛选
function resetAltFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('savingsFilter').value = '';
    document.getElementById('sortFilter').value = 'default';
    filterAlternatives();
}

