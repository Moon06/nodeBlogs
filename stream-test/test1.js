const fs = require('fs')
const path = require('path')


const fileName1 = path.resolve(__dirname,'data.txt')
const fileName2 = path.resolve(__dirname,'data-bak.txt')

// const readStream = fs.createReadStream(fileName1)
// const writeStream = fs.createWriteStream(fileName2)

// // 复制文件
// readStream.pipe(writeStream)
// let num=0
// readStream.on('data', chunk =>{
//     console.log(chunk.toString())
//     console.log('num',num++)
// })
// readStream.on('end', ()=>{
//     console.log('copy done')
// })

const http = require('http')
const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        const readStream = fs.createReadStream(fileName1)
        readStream.pipe(res)
    }
})

server.listen(9000)