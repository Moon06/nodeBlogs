const{exec, escape} = require('../db/mysql') //转换sql注入
const{genPassword} = require('../utils/cryp') //转换xss

const login = (username, password)=>{
    // 生成加密密码 ，mysql中查找加密后的密码
    password = genPassword(password)

    //转换sql注入  需在生成加密密码后运行.. sql语句中的单引号才能去掉.不然报错 
    username = escape(username)
    password = escape(password) 

    // console.log('password',password)

    const sql = `
        select username, realname from users where username=${username} and password = ${password}
    `

    return exec(sql).then(rows => {
        return rows[0] || {}
    })

    // // 假数据
    // if(username==='zhangsan' && password==='123'){
    //     return true
    // }
    // return false
}

module.exports={
    login 
} 