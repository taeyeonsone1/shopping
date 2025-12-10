// Coze AI 聊天机器人 - 备用加载方案
// 如果标准SDK无法加载，尝试使用iframe方式

const COZE_CONFIG = {
    bot_id: '7576404245365784629',
    token: 'pat_ip0XOXwnlOQMrTmfx8wAOa0d8p3QB5egAJq8FuyVm2wz2Ithhs1VNmTS4puJVELR',
    title: 'AI购物助手'
};

// 使用iframe方式加载Coze聊天（备用方案）
function loadCozeViaIframe() {
    console.log('尝试使用iframe方式加载Coze聊天...');
    
    // 创建iframe容器
    const container = document.createElement('div');
    container.id = 'coze-chat-iframe-container';
    container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 400px;
        height: 600px;
        z-index: 10000;
        display: none;
    `;
    
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.coze.com/open/webchat?bot_id=${COZE_CONFIG.bot_id}&token=${COZE_CONFIG.token}`;
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    
    // 创建打开/关闭按钮
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '💬 AI助手';
    toggleBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10001;
        transition: transform 0.2s;
    `;
    
    toggleBtn.onmouseover = function() {
        this.style.transform = 'scale(1.1)';
    };
    toggleBtn.onmouseout = function() {
        this.style.transform = 'scale(1)';
    };
    
    let isOpen = false;
    toggleBtn.onclick = function() {
        isOpen = !isOpen;
        container.style.display = isOpen ? 'block' : 'none';
        toggleBtn.innerHTML = isOpen ? '✕' : '💬';
    };
    
    container.appendChild(iframe);
    document.body.appendChild(container);
    document.body.appendChild(toggleBtn);
    
    console.log('iframe方式加载完成');
}

// 如果标准SDK加载失败，使用备用方案
if (typeof CozeWebSDK === 'undefined') {
    // 等待一段时间后，如果SDK仍未加载，使用备用方案
    setTimeout(function() {
        if (typeof CozeWebSDK === 'undefined') {
            console.log('标准SDK未加载，使用iframe备用方案');
            loadCozeViaIframe();
        }
    }, 15000); // 15秒后检查
}

