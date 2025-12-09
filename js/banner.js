// 滑动横幅功能

let currentBannerIndex = 0;
const bannerSlides = document.querySelectorAll('.banner-slide');
const bannerDots = document.querySelectorAll('.dot');
const totalSlides = bannerSlides.length;

// 显示指定幻灯片
function showSlide(index) {
    // 重置所有幻灯片
    bannerSlides.forEach(slide => slide.classList.remove('active'));
    bannerDots.forEach(dot => dot.classList.remove('active'));
    
    // 显示当前幻灯片
    if (bannerSlides[index]) {
        bannerSlides[index].classList.add('active');
    }
    if (bannerDots[index]) {
        bannerDots[index].classList.add('active');
    }
}

// 切换到指定幻灯片
function currentSlide(index) {
    currentBannerIndex = index - 1;
    showSlide(currentBannerIndex);
}

// 切换幻灯片（向前或向后）
function changeSlide(direction) {
    currentBannerIndex += direction;
    
    if (currentBannerIndex >= totalSlides) {
        currentBannerIndex = 0;
    } else if (currentBannerIndex < 0) {
        currentBannerIndex = totalSlides - 1;
    }
    
    showSlide(currentBannerIndex);
}

// 自动播放
function autoPlay() {
    setInterval(() => {
        changeSlide(1);
    }, 5000); // 每5秒切换一次
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    if (bannerSlides.length > 0) {
        showSlide(0);
        autoPlay();
    }
});





