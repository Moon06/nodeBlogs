const fs = require('fs')
const path = require('path')
const { LOG_CONF } = require('../config/db')

// 写日志函数
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

//生成 write Stream
function createWriteStream(fileName){
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
     const writeStream = fs.createWriteStream(fullFileName,{
         flags: 'a'
     })
     return writeStream
}


// 写入访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    if(LOG_CONF.dev){
        writeLog(accessWriteStream, log)
    }
    console.log(log)
}

module.exports ={
    access
}