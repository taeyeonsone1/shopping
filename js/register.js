// 注册功能

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', handleRegister);
        
        // 实时验证密码匹配
        const confirmPassword = document.getElementById('confirmPassword');
        const password = document.getElementById('password');
        
        confirmPassword.addEventListener('input', function() {
            if (this.value && this.value !== password.value) {
                this.setCustomValidity('密码不匹配');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});

async function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // 验证用户名
    if (username.length < 3 || username.length > 20) {
        alert('用户名长度必须在3-20个字符之间');
        return;
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('请输入有效的邮箱地址');
        return;
    }
    
    // 验证手机号
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('请输入有效的11位手机号码');
        return;
    }
    
    // 验证密码
    if (password.length < 6) {
        alert('密码长度至少6个字符');
        return;
    }
    
    // 验证密码匹配
    if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
    }
    
    // 验证同意条款
    if (!agreeTerms) {
        alert('请阅读并同意服务条款和隐私政策');
        return;
    }
    
    try {
        const data = await registerUser({ username, email, phone, password });
        
        // 自动登录
        currentUser = {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        alert('注册成功！已自动登录');
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message || '注册失败，请重试');
    }
}




