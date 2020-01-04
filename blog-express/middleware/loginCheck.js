//登录中间件... 验证是否登录
const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
    if(req.session.username){
        
            next()
            return
        
    }
    res.json(
        new ErrorModel('未登录')
    )
}