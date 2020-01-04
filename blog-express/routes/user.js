const express = require('express')
const router = express.Router()

const {login} = require("../controller/user")
const {SuccessModel,ErrorModel} = require('../model/resModel')

router.post('/login',function(req, res, next) {

    const {username, password} = req.body

    const result = login(username, password)
    return result.then(data => {
        console.log('req.data',data)
        if(data.username){

            // 操作cookie
            // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

            // 设置session
            req.session.username = data.username
            req.session.realname = data.realname

            //将session中内容 同步到redis中  框架express.session会自动同步到redis中
            // set(req.sessionId, req.session)

            console.log('req.session: ', req.session)

            res.json(
                new SuccessModel('登陆成功')
            )
            return
        }
        res.json(
            new ErrorModel('登陆失败')
        ) 
    })


})

// router.get('/session-test', (req,res,next)=> {
//     const session = req.session
//     if(session.viewNum == null){
//         session.viewNum=0
//     }
//     session.viewNum++
//     res.json({
//         viewNum: session.viewNum
//     })
// })

module.exports = router;