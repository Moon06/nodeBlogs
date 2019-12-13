
const { 
        getList,
        getDetail,
        newBlog,
        updateBlog,
        deleteBlog
    } = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req, res) =>{
    const method = req.method
    const id = req.query.id
    const path = req.path

    // 获取博客列表
    if(method === 'GET' && path ==='/api/blog/list'){ 

        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword)
        return result.then(listData => {
            console.log(listData)
            return new SuccessModel(listData)
        })

    }
    // 获取博客详情
    if(method === 'GET' && path ==='/api/blog/detail'){
        const data = getDetail(id)
        if(data){
            return data.then(detailData=>{
                return new SuccessModel(detailData)
            })
        }

        // const data = getDetail(id)
        // return new SuccessModel(data)
    }
    // 新建一篇博客
    if(method === 'POST' && path ==='/api/blog/new'){

        // const blogData = req.body
        // const data = newBlog(blogData)
        // return new SuccessModel(data)
        req.body.author= 'zhangsan'  //假数据，待开发登录时再改成真实数据
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if(method === 'POST' && path ==='/api/blog/update'){
        
        const result = updateBlog(id, req.body)
       return result.then(val => {  //val 是 true/false
            console.log(val)
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('更新博客失败')
            }
        })

    }
    // 删除一篇博客
    if(method === 'POST' && path ==='/api/blog/del'){

        const author= 'zhangsan'  //假数据，待开发登录时再改成真实数据
        const result = deleteBlog(id,author)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports  = handleBlogRouter