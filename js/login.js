// 登录功能

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('请输入用户名和密码');
        return;
    }
    
    try {
        const data = await loginUser(username, password);
        
        currentUser = {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        alert('登录成功！');
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message || '登录失败，请检查用户名和密码');
    }
}

