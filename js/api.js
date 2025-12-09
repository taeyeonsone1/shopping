// API客户端 - 统一管理所有API调用

const API_BASE_URL = 'http://localhost:3000/api';

// 获取JWT token
function getToken() {
    return localStorage.getItem('token');
}

// 设置JWT token
function setToken(token) {
    localStorage.setItem('token', token);
}

// 移除JWT token
function removeToken() {
    localStorage.removeItem('token');
}

// 通用API请求函数
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getToken();
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        ...options
    };

    if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || '请求失败');
        }

        return data;
    } catch (error) {
        console.error('API请求错误:', error);
        throw error;
    }
}

// ========== 用户相关API ==========

// 用户注册
async function registerUser(userData) {
    return await apiRequest('/register', {
        method: 'POST',
        body: userData
    });
}

// 用户登录
async function loginUser(username, password) {
    const data = await apiRequest('/login', {
        method: 'POST',
        body: { username, password }
    });
    
    if (data.token) {
        setToken(data.token);
    }
    
    return data;
}

// 获取当前用户信息
async function getCurrentUser() {
    return await apiRequest('/user', {
        method: 'GET'
    });
}

// 退出登录
function logout() {
    removeToken();
    localStorage.removeItem('currentUser');
}

// ========== 商品相关API ==========

// 获取商品列表
async function getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/products?${queryString}`);
}

// 获取单个商品详情
async function getProduct(id) {
    return await apiRequest(`/products/${id}`);
}

// ========== 平替方案相关API ==========

// 获取平替方案列表
async function getAlternatives(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/alternatives?${queryString}`);
}

// ========== 收藏相关API ==========

// 获取用户收藏
async function getFavorites() {
    return await apiRequest('/favorites');
}

// 添加收藏
async function addFavorite(productId) {
    return await apiRequest('/favorites', {
        method: 'POST',
        body: { productId }
    });
}

// 取消收藏
async function removeFavorite(productId) {
    return await apiRequest(`/favorites/${productId}`, {
        method: 'DELETE'
    });
}

// 检查是否已收藏
async function checkFavorite(productId) {
    const data = await apiRequest(`/favorites/check/${productId}`);
    return data.isFavorite;
}

// ========== 评价相关API ==========

// 添加商品评价
async function addReview(productId, rating, comment) {
    return await apiRequest(`/products/${productId}/reviews`, {
        method: 'POST',
        body: { rating, comment }
    });
}


