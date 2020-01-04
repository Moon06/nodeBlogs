const express = require('express')

// 本次 http 请求的实例
const app = express()

app.use((req, res, next) => {
    console.log('请求开始....')
})