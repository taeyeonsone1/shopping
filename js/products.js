// 商品列表页功能 - 带分页

const PRODUCTS_PER_PAGE = 12; // 每页显示12个商品
let currentPage = 1;
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', function() {
    // 检查URL参数
    const search = getUrlParameter('search');
    const category = getUrlParameter('category');
    const page = parseInt(getUrlParameter('page')) || 1;
    currentPage = page;
    
    if (search) {
        document.getElementById('searchInput')?.setAttribute('value', search);
    }
    if (category) {
        document.getElementById('categoryFilter').value = category;
    }
    
    applyFilters();
    updateStats();
});

// 加载商品列表（带分页）
async function loadProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;
    
    // 应用筛选
    const category = document.getElementById('categoryFilter')?.value;
    const price = document.getElementById('priceFilter')?.value;
    const rating = document.getElementById('ratingFilter')?.value;
    const search = getUrlParameter('search');
    const sort = document.getElementById('sortFilter')?.value;
    
    try {
        // 构建API请求参数
        const params = {
            page: currentPage,
            limit: PRODUCTS_PER_PAGE
        };
        
        if (category) params.category = category;
        if (price) params.price = price;
        if (rating) params.rating = rating;
        if (search) params.search = search;
        if (sort) params.sort = sort;
        
        // 从API获取商品
        const data = await getProducts(params);
        filteredProducts = data.products;
        const totalPages = data.totalPages;
        const total = data.total;
        
        if (filteredProducts.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding:40px;">没有找到相关商品</p>';
            document.getElementById('pagination').innerHTML = '';
            updateStats();
            return;
        }
        
        // 显示当前页商品
        container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        
        // 添加点击事件
        container.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                const productId = this.dataset.id;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
        
        // 显示分页控件
        renderPagination(totalPages, total);
        updateStats();
    } catch (error) {
        console.error('加载商品失败:', error);
        // 如果API失败，使用本地数据作为后备
        if (typeof products !== 'undefined') {
            filteredProducts = [...products];
            
            if (category) {
                filteredProducts = filteredProducts.filter(p => p.category === category);
            }
            if (price) {
                const [min, max] = price === '1000+' ? [1000, Infinity] : price.split('-').map(Number);
                filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
            }
            if (rating) {
                const minRating = parseFloat(rating);
                filteredProducts = filteredProducts.filter(p => p.rating >= minRating);
            }
            if (search) {
                filteredProducts = filteredProducts.filter(p => 
                    p.name.toLowerCase().includes(search.toLowerCase())
                );
            }
            
            if (sort === 'price-asc') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sort === 'price-desc') {
                filteredProducts.sort((a, b) => b.price - a.price);
            } else if (sort === 'rating') {
                filteredProducts.sort((a, b) => b.rating - a.rating);
            } else if (sort === 'name') {
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
            }
            
            const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
            const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
            const endIndex = startIndex + PRODUCTS_PER_PAGE;
            const currentProducts = filteredProducts.slice(startIndex, endIndex);
            
            container.innerHTML = currentProducts.map(product => createProductCard(product)).join('');
            renderPagination(totalPages, filteredProducts.length);
            updateStats();
        }
    }
}

// 渲染分页控件
function renderPagination(totalPages, total = null) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer || totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    const totalCount = total !== null ? total : filteredProducts.length;
    
    let paginationHTML = '<div class="pagination-controls">';
    
    // 上一页按钮
    if (currentPage > 1) {
        paginationHTML += `<button class="page-btn" onclick="goToPage(${currentPage - 1})">上一页</button>`;
    } else {
        paginationHTML += `<button class="page-btn disabled" disabled>上一页</button>`;
    }
    
    // 页码按钮
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        paginationHTML += `<button class="page-btn" onclick="goToPage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="page-ellipsis">...</span>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="page-btn active">${i}</button>`;
        } else {
            paginationHTML += `<button class="page-btn" onclick="goToPage(${i})">${i}</button>`;
        }
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="page-ellipsis">...</span>`;
        }
        paginationHTML += `<button class="page-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }
    
    // 下一页按钮
    if (currentPage < totalPages) {
        paginationHTML += `<button class="page-btn" onclick="goToPage(${currentPage + 1})">下一页</button>`;
    } else {
        paginationHTML += `<button class="page-btn disabled" disabled>下一页</button>`;
    }
    
    paginationHTML += `</div>`;
    paginationHTML += `<div class="page-info">第 ${currentPage} 页，共 ${totalPages} 页（共 ${totalCount} 个商品）</div>`;
    
    paginationContainer.innerHTML = paginationHTML;
}

// 跳转到指定页面
function goToPage(page) {
    currentPage = page;
    loadProducts();
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 应用筛选
function applyFilters() {
    currentPage = 1; // 重置到第一页
    loadProducts();
    updateStats();
}

// 更新统计信息
async function updateStats() {
    const totalProductsEl = document.getElementById('totalProducts');
    const filteredCountEl = document.getElementById('filteredCount');
    
    try {
        // 获取总商品数
        const allData = await getProducts({ limit: 1 });
        if (totalProductsEl) {
            totalProductsEl.textContent = allData.total || 0;
        }
    } catch (error) {
        // 如果API失败，使用本地数据
        if (typeof products !== 'undefined' && totalProductsEl) {
            totalProductsEl.textContent = products.length;
        }
    }
    
    if (filteredCountEl) {
        filteredCountEl.textContent = filteredProducts.length || 0;
    }
}

// 切换视图
function switchView(viewType) {
    const container = document.getElementById('productsList');
    if (!container) return;
    
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');
    
    if (viewType === 'grid') {
        container.className = 'product-grid';
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        container.className = 'product-list';
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    }
}

// 快速筛选
function quickFilter(filterType) {
    if (filterType === 'price-asc') {
        document.getElementById('sortFilter').value = 'price-asc';
    } else if (filterType === 'rating') {
        document.getElementById('sortFilter').value = 'rating';
    } else {
        document.getElementById('categoryFilter').value = filterType;
    }
    applyFilters();
}

// 重置筛选
function resetFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('ratingFilter').value = '';
    document.getElementById('sortFilter').value = 'default';
    applyFilters();
}

