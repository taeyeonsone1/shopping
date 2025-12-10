// 测试新增商品功能
const fetch = require('node-fetch');

async function testCreateProduct() {
    try {
        console.log('正在测试新增商品功能...');
        
        // 首先尝试登录
        const loginResponse = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'password123'
            })
        });
        
        if (!loginResponse.ok) {
            console.log('需要先注册用户，正在注册...');
            
            // 注册用户
            const registerResponse = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'testuser',
                    email: 'test@example.com',
                    phone: '13800138000',
                    password: 'password123'
                })
            });
            
            if (!registerResponse.ok) {
                const error = await registerResponse.json();
                console.log('注册失败:', error.error);
                
                // 尝试使用现有用户登录
                const retryLogin = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: 'testuser',
                        password: 'password123'
                    })
                });
                
                if (!retryLogin.ok) {
                    console.log('登录失败，请先手动创建用户');
                    return;
                }
                
                const loginData = await retryLogin.json();
                console.log('登录成功');
                
                // 测试创建商品
                await testCreateProductWithToken(loginData.token);
            } else {
                const registerData = await registerResponse.json();
                console.log('注册成功');
                
                // 测试创建商品
                await testCreateProductWithToken(registerData.token);
            }
        } else {
            const loginData = await loginResponse.json();
            console.log('登录成功');
            
            // 测试创建商品
                await testCreateProductWithToken(loginData.token);
        }
        
    } catch (error) {
        console.error('测试失败:', error.message);
    }
}

async function testCreateProductWithToken(token) {
    try {
        console.log('\n正在创建测试商品...');
        
        const productData = {
            name: '测试商品 - ' + new Date().toLocaleString(),
            price: 199.99,
            category: 'electronics',
            image: 'https://picsum.photos/seed/test/400/300',
            description: '这是一个测试商品，用于验证新增商品功能'
        };
        
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ 商品创建成功！');
            console.log('商品信息:', {
                id: result.product.id,
                name: result.product.name,
                price: result.product.price,
                category: result.product.category
            });
            
            // 验证商品是否出现在商品列表中
            console.log('\n正在验证商品是否能显示在列表中...');
            
            const listResponse = await fetch('http://localhost:3000/api/products');
            if (listResponse.ok) {
                const listData = await listResponse.json();
                console.log(`✅ 商品列表中有 ${listData.total} 个商品`);
                
                // 检查新创建的商品是否在列表中
                const newProduct = listData.products.find(p => p.id === result.product.id);
                if (newProduct) {
                    console.log('✅ 新创建的商品已成功显示在商品列表中！');
                    console.log('商品详情:', {
                        id: newProduct.id,
                        name: newProduct.name,
                        price: newProduct.price,
                        category: newProduct.category
                    });
                } else {
                    console.log('⚠️ 新创建的商品未出现在第一页，请检查分页');
                }
            }
            
        } else {
            const error = await response.json();
            console.log('❌ 商品创建失败:', error.error);
        }
        
    } catch (error) {
        console.error('创建商品测试失败:', error.message);
    }
}

// 运行测试
testCreateProduct();