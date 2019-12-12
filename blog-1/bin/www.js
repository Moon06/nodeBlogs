const http = require('http')

const PORT = 8000
const serverHandle = require('../app')
const server = http.createServer(serverHandle)
server.listen(PORT,function(){
    console.log('开启')
})