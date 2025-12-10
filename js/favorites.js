// 收藏页功能

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadFavorites();
});

// 加载收藏商品
async function loadFavorites() {
    if (!currentUser) {
        document.getElementById('favoritesList').innerHTML = '<p>请先登录</p>';
        return;
    }
    
    const container = document.getElementById('favoritesList');
    const emptyDiv = document.getElementById('emptyFavorites');
    
    try {
        const favoriteProducts = await getFavorites();
        
        if (favoriteProducts.length === 0) {
            container.style.display = 'none';
            emptyDiv.style.display = 'block';
            return;
        }
        
        container.style.display = 'grid';
        emptyDiv.style.display = 'none';
        
        container.innerHTML = favoriteProducts.map(product => createProductCard(product)).join('');
        
        // 添加点击事件
        container.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                const productId = this.dataset.id;
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
    } catch (error) {
        console.error('加载收藏失败:', error);
        alert('加载收藏失败，请重试');
        // 如果API失败，使用本地数据作为后备
        if (typeof favorites !== 'undefined' && favorites.length > 0) {
            const favoriteProducts = products.filter(p => favorites.includes(p.id));
            container.innerHTML = favoriteProducts.map(product => createProductCard(product)).join('');
        } else {
            container.style.display = 'none';
            emptyDiv.style.display = 'block';
        }
    }
}




