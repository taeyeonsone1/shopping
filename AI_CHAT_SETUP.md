# AI 聊天机器人配置说明

## 概述

网站已集成 Coze AI 聊天机器人，用户可以在浏览商品时随时与 AI 助手对话，获取购物建议和商品推荐。

## 配置步骤

### 1. 创建配置文件

如果 `js/ai-chat.js` 文件不存在，请从示例文件复制：

```bash
cp js/ai-chat.example.js js/ai-chat.js
```

或者在 Windows 上：
```cmd
copy js\ai-chat.example.js js\ai-chat.js
```

### 2. 获取 Coze Token

1. 登录 [Coze 平台](https://www.coze.com/)
2. 进入您的 Bot 管理页面
3. 获取您的 Bot ID 和 Personal Access Token (PAT)

### 3. 配置 Token

打开 `js/ai-chat.js` 文件，找到以下配置：

```javascript
const COZE_CONFIG = {
    bot_id: '7576404245365784629',
    // 请将下面的 'pat_********' 替换为您的实际 token
    token: 'pat_********',
    title: 'AI购物助手'
};
```

将 `token: 'pat_********'` 中的 `pat_********` 替换为您的实际 token。

例如：
```javascript
token: 'pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
```

### 3. 自定义 Bot ID（可选）

如果您想使用自己的 Bot，可以修改 `bot_id`：

```javascript
bot_id: '您的Bot_ID',
```

### 4. 自定义标题（可选）

您可以修改聊天窗口的标题：

```javascript
title: 'AI购物助手',  // 修改为您想要的标题
```

## 功能说明

- **自动加载**：AI 聊天机器人会在页面加载后自动初始化
- **全局可用**：在所有主要页面（首页、商品列表、平替推荐、商品详情）都可以使用
- **智能对话**：AI 助手可以帮助用户：
  - 推荐商品
  - 解答购物疑问
  - 提供平替方案建议
  - 比较商品差异

## 已集成的页面

- ✅ index.html（首页）
- ✅ products.html（商品列表）
- ✅ alternatives.html（平替推荐）
- ✅ product-detail.html（商品详情）

## 故障排除

### 聊天窗口未显示

1. 检查浏览器控制台是否有错误信息
2. 确认 Coze SDK 是否成功加载（检查网络连接）
3. 验证 token 是否正确配置
4. 确认 Bot ID 是否正确

### Token 过期

如果 token 过期，需要：
1. 在 Coze 平台重新生成 token
2. 更新 `js/ai-chat.js` 中的 token 配置
3. 刷新页面

## 注意事项

⚠️ **安全提示**：
- 不要将包含真实 token 的代码提交到公共代码仓库
- 建议将 `js/ai-chat.js` 添加到 `.gitignore` 中，或使用环境变量管理 token
- 生产环境建议使用后端代理来管理 token，避免在前端暴露

## 技术支持

如有问题，请参考：
- [Coze 官方文档](https://www.coze.com/docs)
- [Coze WebSDK 文档](https://www.coze.com/docs/web-sdk)

