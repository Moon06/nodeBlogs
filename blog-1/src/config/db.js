
// 链接数据库的环境...
// //////////
const env = process.env.NODE_ENV //环境参数
// 配置
let MYSQL_CONF

// 本地环境
if(env ==='dev'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'20120623',
        port:'3306',
        database:'myblog'
    }
}

// 线上环境
if(env === 'production'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'20120623',
        port:'3306',
        database:'myblog'
    }
}

module.exports={
    MYSQL_CONF
}