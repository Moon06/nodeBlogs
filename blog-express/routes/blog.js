const express = require('express')
const router = express.Router()

const { 
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')

const loginCheck = require('../middleware/loginCheck')

// 博客列表
router.get('/list', (req, res, next) => {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if(req.query.isadmin) {
   
        // 管理员界面
        if(req.session.username == null){
            // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        // 强制查询自己的博客
        author = req.session.username

    }

    const result = getList(author, keyword)
    return result.then(listData => {
        // console.log(listData)
        // 用express  直接用res 返回
        res.json(
            new SuccessModel(listData)
            )
    })
})

// 获取博客详情
router.get('/detail',(req, res, next) => {
    const id = req.query.id
    const data = getDetail(id)
        if(data){
            return data.then(detailData=>{
                res.json(
                    new SuccessModel(detailData)
                )
            })
        }
    
})

// 新建博客
router.post('/new', loginCheck, (req, res, next) =>{
    req.body.author = req.session.username

    const result = newBlog(req.body)
    return result.then(data =>{
        res.json(
            new SuccessModel(data)
        )
    })
})

// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {  //val 是 true/false
         if(val){
             res.json(
                new SuccessModel()
             )
         }else{
             res.json(
                new ErrorModel('更新博客失败')
             )
         }
     })
})

// 删除博客
router.post('/del', loginCheck, (req, res, next) => {
    // id是要删除博客的 id
    // 软删除（实际是更新 状态）
    // 这里是直接删除 
    // id author 保证删除的是本作者对应id的数据

    const author= req.session.username  
    const result = deleteBlog(req.query.id,author)
    return result.then(val => {
        if(val){
            res.json(
                new SuccessModel()
            )
        }else{
            res.json(
                new ErrorModel('删除博客失败')
            )

        }
    })
})



module.exports = router;