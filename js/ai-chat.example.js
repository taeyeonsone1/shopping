// Coze AI 聊天机器人配置示例
// 请复制此文件为 ai-chat.js 并配置您的实际 token

const COZE_CONFIG = {
    bot_id: '7579085748818116623',
    // 请将下面的 'pat_********' 替换为您的实际 token
    token: 'pat_********',
    title: 'Coze'
};

// 初始化 Coze AI 聊天机器人
function initCozeChat() {
    // 检查 CozeWebSDK 是否已加载
    if (typeof CozeWebSDK === 'undefined') {
        console.error('Coze WebSDK 未加载，请检查网络连接');
        return;
    }

    try {
        new CozeWebSDK.WebChatClient({
            config: {
                bot_id: COZE_CONFIG.bot_id,
            },
            componentProps: {
                title: COZE_CONFIG.title,
            },
            auth: {
                type: 'token',
                token: COZE_CONFIG.token,
                onRefreshToken: function () {
                    // Token刷新回调函数
                    // 如果需要动态刷新token，可以在这里实现
                    return COZE_CONFIG.token;
                }
            }
        });
        console.log('Coze AI 聊天机器人已初始化');
    } catch (error) {
        console.error('初始化 Coze AI 聊天机器人失败:', error);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，确保SDK已加载
    setTimeout(initCozeChat, 1000);
});

