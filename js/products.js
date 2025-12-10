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
    const isMobile = window.innerWidth < 768;
    
    let paginationHTML = '<div class="pagination-controls">';
    
    // 上一页按钮
    if (currentPage > 1) {
        paginationHTML += `<button class="page-btn" onclick="goToPage(${currentPage - 1})" ${isMobile ? 'title="上一页"' : ''}>${isMobile ? '‹' : '上一页'}</button>`;
    } else {
        paginationHTML += `<button class="page-btn disabled" disabled ${isMobile ? 'title="上一页"' : ''}>${isMobile ? '‹' : '上一页'}</button>`;
    }
    
    // 页码按钮 - 移动端显示更少
    const maxVisiblePages = isMobile ? 3 : 5;
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
        paginationHTML += `<button class="page-btn" onclick="goToPage(${currentPage + 1})" ${isMobile ? 'title="下一页"' : ''}>${isMobile ? '›' : '下一页'}</button>`;
    } else {
        paginationHTML += `<button class="page-btn disabled" disabled ${isMobile ? 'title="下一页"' : ''}>${isMobile ? '›' : '下一页'}</button>`;
    }
    
    paginationHTML += `</div>`;
    
    // 移动端简化页面信息显示
    const pageInfo = isMobile 
        ? `第 ${currentPage}/${totalPages} 页`
        : `第 ${currentPage} 页，共 ${totalPages} 页（共 ${totalCount} 个商品）`;
    
    paginationHTML += `<div class="page-info">${pageInfo}</div>`;
    
    paginationContainer.innerHTML = paginationHTML;
}

// 跳转到指定页面
function goToPage(page) {
    currentPage = page;
    setUrlParameter('page', page);
    loadProducts();
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 异步加载商品数据（优化性能）
let isLoading = false;
async function loadProductsWithLoading() {
    if (isLoading) return;
    
    isLoading = true;
    const container = document.getElementById('productsList');
    
    // 显示加载动画
    if (container) {
        container.innerHTML = '<div class="loading-container"><div class="loading-spinner"></div><p>正在加载商品...</p></div>';
    }
    
    try {
        await loadProducts();
    } catch (error) {
        console.error('加载商品失败:', error);
        if (container) {
            container.innerHTML = '<div class="error-container"><p>加载失败，请重试</p><button onclick="loadProducts()" class="retry-btn">重新加载</button></div>';
        }
    } finally {
        isLoading = false;
    }
}

// 无限滚动加载
let infiniteScrollEnabled = false;
let scrollThrottleTimeout;

function enableInfiniteScroll() {
    if (infiniteScrollEnabled) return;
    
    window.addEventListener('scroll', handleInfiniteScrollThrottled);
    infiniteScrollEnabled = true;
}

function disableInfiniteScroll() {
    window.removeEventListener('scroll', handleInfiniteScrollThrottled);
    infiniteScrollEnabled = false;
    if (scrollThrottleTimeout) {
        clearTimeout(scrollThrottleTimeout);
    }
}

function handleInfiniteScrollThrottled() {
    if (scrollThrottleTimeout) return;
    
    scrollThrottleTimeout = setTimeout(() => {
        handleInfiniteScroll();
        scrollThrottleTimeout = null;
    }, 100); // 100ms 节流
}

function handleInfiniteScroll() {
    const scrollThreshold = window.innerWidth < 768 ? 300 : 500; // 移动端减少阈值
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - scrollThreshold && !isLoading) {
        loadMoreProducts();
    }
}

// 加载更多商品
async function loadMoreProducts() {
    if (isLoading) return;
    
    const totalPagesEl = document.querySelector('.page-info');
    if (!totalPagesEl) return;
    
    const totalPages = parseInt(totalPagesEl.textContent.match(/共 (\d+) 页/)?.[1]) || 1;
    if (currentPage >= totalPages) {
        disableInfiniteScroll();
        return;
    }
    
    isLoading = true;
    
    // 显示加载更多指示器
    const container = document.getElementById('productsList');
    const loadMoreIndicator = document.createElement('div');
    loadMoreIndicator.className = 'load-more-indicator';
    loadMoreIndicator.innerHTML = '<div class="loading-spinner small"></div><p>正在加载更多商品...</p>';
    container.appendChild(loadMoreIndicator);
    
    try {
        currentPage++;
        setUrlParameter('page', currentPage);
        
        const category = document.getElementById('categoryFilter')?.value;
        const price = document.getElementById('priceFilter')?.value;
        const rating = document.getElementById('ratingFilter')?.value;
        const search = getUrlParameter('search');
        const sort = document.getElementById('sortFilter')?.value;
        
        const params = {
            page: currentPage,
            limit: PRODUCTS_PER_PAGE
        };
        
        if (category) params.category = category;
        if (price) params.price = price;
        if (rating) params.rating = rating;
        if (search) params.search = search;
        if (sort) params.sort = sort;
        
        const data = await getProducts(params);
        const newProducts = data.products;
        
        // 移除加载指示器
        container.removeChild(loadMoreIndicator);
        
        // 添加新商品
        newProducts.forEach(product => {
            const productCard = createProductCard(product);
            container.insertAdjacentHTML('beforeend', productCard);
        });
        
        // 更新分页信息
        renderPagination(data.totalPages, data.total);
        updateStats();
        
        // 添加点击事件
        container.querySelectorAll('.product-card').forEach(card => {
            if (!card.hasAttribute('data-event-bound')) {
                card.setAttribute('data-event-bound', 'true');
                card.addEventListener('click', function() {
                    const productId = this.dataset.id;
                    window.location.href = `product-detail.html?id=${productId}`;
                });
            }
        });
        
    } catch (error) {
        console.error('加载更多商品失败:', error);
        container.removeChild(loadMoreIndicator);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'load-more-error';
        errorDiv.innerHTML = '<p>加载失败</p><button onclick="loadMoreProducts()" class="retry-btn">重试</button>';
        container.appendChild(errorDiv);
    } finally {
        isLoading = false;
    }
}

// 切换分页模式
function togglePaginationMode() {
    const mode = localStorage.getItem('paginationMode') || 'classic';
    
    if (mode === 'classic') {
        enableInfiniteScroll();
        localStorage.setItem('paginationMode', 'infinite');
        document.getElementById('pagination').style.display = 'none';
    } else {
        disableInfiniteScroll();
        localStorage.setItem('paginationMode', 'classic');
        document.getElementById('pagination').style.display = 'block';
    }
}

// 初始化分页模式
document.addEventListener('DOMContentLoaded', function() {
    const mode = localStorage.getItem('paginationMode') || 'classic';
    if (mode === 'infinite') {
        enableInfiniteScroll();
        const pagination = document.getElementById('pagination');
        if (pagination) pagination.style.display = 'none';
    }
});

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

// ========== 增强的筛选和搜索功能 ==========

// 设置URL参数
function setUrlParameter(name, value) {
    const urlParams = new URLSearchParams(window.location.search);
    if (value) {
        urlParams.set(name, value);
    } else {
        urlParams.delete(name);
    }
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    window.history.replaceState({}, '', newUrl);
}

// 实时搜索功能
let searchTimeout;
function handleSearchInput(event) {
    const searchValue = event.target.value.trim();
    
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (searchValue) {
            setUrlParameter('search', searchValue);
        } else {
            setUrlParameter('search', null);
        }
        currentPage = 1;
        loadProducts();
    }, 500);
}

// 高级筛选功能
function showAdvancedFilters() {
    const advancedFilters = document.getElementById('advancedFilters');
    if (advancedFilters) {
        advancedFilters.style.display = advancedFilters.style.display === 'none' ? 'block' : 'none';
    }
}

// 价格范围滑块
function initPriceRange() {
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        
        priceRange.addEventListener('input', function() {
            const [min, max] = this.value.split(',').map(Number);
            priceMin.textContent = min;
            priceMax.textContent = max;
            
            // 实时应用价格筛选
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                document.getElementById('priceFilter').value = `${min}-${max}`;
                applyFilters();
            }, 300);
        });
    }
}

// 多选分类筛选
function toggleCategory(category) {
    const currentCategories = getSelectedCategories();
    const index = currentCategories.indexOf(category);
    
    if (index > -1) {
        currentCategories.splice(index, 1);
    } else {
        currentCategories.push(category);
    }
    
    setUrlParameter('categories', currentCategories.join(','));
    currentPage = 1;
    loadProducts();
}

// 获取已选分类
function getSelectedCategories() {
    const categoriesParam = getUrlParameter('categories');
    return categoriesParam ? categoriesParam.split(',') : [];
}

// 清除所有筛选
function clearAllFilters() {
    // 重置URL参数
    window.history.replaceState({}, '', window.location.pathname);
    
    // 重置表单元素
    document.getElementById('categoryFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('ratingFilter').value = '';
    document.getElementById('sortFilter').value = 'default';
    
    // 重置高级筛选
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    // 重新加载商品
    currentPage = 1;
    loadProducts();
}

// 保存筛选偏好
function saveFilterPreferences() {
    const preferences = {
        category: document.getElementById('categoryFilter').value,
        price: document.getElementById('priceFilter').value,
        rating: document.getElementById('ratingFilter').value,
        sort: document.getElementById('sortFilter').value
    };
    localStorage.setItem('productFilterPreferences', JSON.stringify(preferences));
}

// 加载筛选偏好
function loadFilterPreferences() {
    const preferences = localStorage.getItem('productFilterPreferences');
    if (preferences) {
        const { category, price, rating, sort } = JSON.parse(preferences);
        if (category) document.getElementById('categoryFilter').value = category;
        if (price) document.getElementById('priceFilter').value = price;
        if (rating) document.getElementById('ratingFilter').value = rating;
        if (sort) document.getElementById('sortFilter').value = sort;
    }
}

// 初始化筛选功能
document.addEventListener('DOMContentLoaded', function() {
    // 加载筛选偏好
    loadFilterPreferences();
    
    // 初始化实时搜索
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
    
    // 初始化价格范围滑块
    initPriceRange();
    
    // 保存筛选偏好
    const filterElements = ['categoryFilter', 'priceFilter', 'ratingFilter', 'sortFilter'];
    filterElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', saveFilterPreferences);
        }
    });
});

// ========== 增强的筛选和搜索功能 ==========

// 设置URL参数
function setUrlParameter(name, value) {
    const urlParams = new URLSearchParams(window.location.search);
    if (value) {
        urlParams.set(name, value);
    } else {
        urlParams.delete(name);
    }
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    window.history.replaceState({}, '', newUrl);
}

// 实时搜索功能
let searchTimeout;
function handleSearchInput(event) {
    const searchValue = event.target.value.trim();
    
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (searchValue) {
            setUrlParameter('search', searchValue);
        } else {
            setUrlParameter('search', null);
        }
        currentPage = 1;
        loadProducts();
    }, 500);
}

// 高级筛选功能
function showAdvancedFilters() {
    const advancedFilters = document.getElementById('advancedFilters');
    if (advancedFilters) {
        advancedFilters.style.display = advancedFilters.style.display === 'none' ? 'block' : 'none';
    }
}

// 价格范围滑块
function initPriceRange() {
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        
        priceRange.addEventListener('input', function() {
            const [min, max] = this.value.split(',').map(Number);
            priceMin.textContent = min;
            priceMax.textContent = max;
            
            // 实时应用价格筛选
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                document.getElementById('priceFilter').value = `${min}-${max}`;
                applyFilters();
            }, 300);
        });
    }
}

// 多选分类筛选
function toggleCategory(category) {
    const currentCategories = getSelectedCategories();
    const index = currentCategories.indexOf(category);
    
    if (index > -1) {
        currentCategories.splice(index, 1);
    } else {
        currentCategories.push(category);
    }
    
    setUrlParameter('categories', currentCategories.join(','));
    currentPage = 1;
    loadProducts();
}

// 获取已选分类
function getSelectedCategories() {
    const categoriesParam = getUrlParameter('categories');
    return categoriesParam ? categoriesParam.split(',') : [];
}

// 清除所有筛选
function clearAllFilters() {
    // 重置URL参数
    window.history.replaceState({}, '', window.location.pathname);
    
    // 重置表单元素
    document.getElementById('categoryFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('ratingFilter').value = '';
    document.getElementById('sortFilter').value = 'default';
    
    // 重置高级筛选
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    // 重新加载商品
    currentPage = 1;
    loadProducts();
}

// 保存筛选偏好
function saveFilterPreferences() {
    const preferences = {
        category: document.getElementById('categoryFilter').value,
        price: document.getElementById('priceFilter').value,
        rating: document.getElementById('ratingFilter').value,
        sort: document.getElementById('sortFilter').value
    };
    localStorage.setItem('productFilterPreferences', JSON.stringify(preferences));
}

// 加载筛选偏好
function loadFilterPreferences() {
    const preferences = localStorage.getItem('productFilterPreferences');
    if (preferences) {
        const { category, price, rating, sort } = JSON.parse(preferences);
        if (category) document.getElementById('categoryFilter').value = category;
        if (price) document.getElementById('priceFilter').value = price;
        if (rating) document.getElementById('ratingFilter').value = rating;
        if (sort) document.getElementById('sortFilter').value = sort;
    }
}

// 初始化筛选功能
document.addEventListener('DOMContentLoaded', function() {
    // 加载筛选偏好
    loadFilterPreferences();
    
    // 初始化实时搜索
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
    
    // 初始化价格范围滑块
    initPriceRange();
    
    // 保存筛选偏好
    const filterElements = ['categoryFilter', 'priceFilter', 'ratingFilter', 'sortFilter'];
    filterElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', saveFilterPreferences);
        }
    });
});

