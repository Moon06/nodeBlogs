
// 链接数据库的环境...
// //////////
const env = process.env.NODE_ENV //环境参数
// 配置
let MYSQL_CONF
let REDIS_CONF
let LOG_CONF

// 本地环境
if(env ==='dev'){
    //  mysql
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'20120623',
        port:'3306',
        database:'myblog'
    }

    // redis
    REDIS_CONF ={
        port:6379,
        host:'127.0.0.1'
    }

    // 日志是否写入
    LOG_CONF ={
        online: false
     }

}

// 线上环境,如发布线上则配置线上环境
if(env === 'production'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'20120623',
        port:'3306',
        database:'myblog'
    }

     // redis
     REDIS_CONF ={
        port:6379,
        host:'127.0.0.1'
    }

    // 日志是否写入
    LOG_CONF ={
        online: true
     }
}

module.exports={
    MYSQL_CONF,
    REDIS_CONF,
    LOG_CONF
}