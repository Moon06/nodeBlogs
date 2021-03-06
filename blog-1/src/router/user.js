
const {login} = require("../controller/user")
const {SuccessModel,ErrorModel} = require('../model/resModel')
const { set } = require('../db/redis')


const handleUserRouter = (req, res) => {
    const method = req.method //GET  POST

    //登录
    if(method === 'POST' && req.path=== '/api/user/login'){
        console.log(req.query)
        // const {username, password} = req.query
        const {username, password} = req.body

        const result = login(username, password)
        return result.then(data => {
            if(data.username){

                // 操作cookie
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

                // 设置session
                req.session.username = data.username
                req.session.realname = data.realname

                //将session中内容 同步到redis中
                set(req.sessionId, req.session)
                
                console.log('req.session: ', req.session)

                return new SuccessModel()
            }
            return new ErrorModel('登陆失败')
        })
    }

    // 登录验证的测试
    // if(method === 'GET' && req.path=== '/api/user/login-test'){
    //     if(req.session.username){
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session: req.session
    //             })
    //         )
    //     }
    //     return Promise.resolve(
    //         new ErrorModel('尚未登录')
    //     )
    // }

}

module.exports = handleUserRouter 