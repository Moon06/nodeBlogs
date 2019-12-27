
const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'WJiol_8776#'

// md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex') //hex 16进制格式
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

//  const result = genPassword('123456')
//  console.log(result)

module.exports = {
    genPassword
}


//加密的逻辑： KEY（开发自己指定）
//用户注册输入密码 + 开发指定 KEY ==》拼接后用 md5 加密  ==》 存入数据库 对应账号下.

//登录验证密码：
//用户输入密码  + 开发同一个指定 KEY ==》 拼接后用 MD5加密后  ==》 和用户输入用户名一起 去数据库查询