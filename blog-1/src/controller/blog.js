// 引入查询数据库 函数
const{exec, escape} = require('../db/mysql')
const xss = require('xss')

// 博客列表 查询取数据
const getList = (author, keyword) => {
    // 拼接sql语句 查询数据库里想要获取的数据（格式要正确）
    let sql = `select * from blogs where 1=1 `
    if(author) {
        author= escape(author)
        sql+= `and author=${author} `
    }
    if(keyword) {
        keyword = escape(keyword)
        sql+= `and title like %${keyword}% `
    }
    sql+= `order by createtime desc`

    console.log('sql:'+sql) 
    // 返回promise
    return exec(sql)

}

// 博客详情 查询取数据
const getDetail = (id) =>{
    id = escape(id)
   let sql = `select * from blogs where id=${id}`

   return exec(sql).then(rows => {
       return rows[0]
   })
}

// 新建博客 插入数据
const newBlog = (blogData ={})=>{
    // blogData是一个博客对象， 包含title content 属性
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createtime = Date.now()
    console.log(title)

    title = escape(title)
    content = escape(content)
    author = escape(author)
    const sql = `insert into blogs (title, content, createtime, author) values (${title},${content},${createtime},${author});`
    return exec(sql).then(insertData => {
        // console.log('insertData:',insertData)
        return{
            id: insertData.insertId
        }
    })

}

// 更新博客
const updateBlog = (id, blogData={}) =>{
    // id是要更新博客的 id
    // blogData是一个博客对象， 包含更新的内容：title 和 content 
    console.log('update blogData...:',id,blogData)
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    id= escape(id)
    title = escape(title)
    content = escape(content)
    
    const sql = `update blogs set title=${title},content=${content} where id=${id}`
    return exec(sql).then(updateData => {
        console.log('updateData',updateData)
        if(updateData.affectedRows >0) {
            return true
        }
        return false
    })
}

// 删除博客
const deleteBlog = (id, author) => {
    // id是要删除博客的 id
    // 软删除（实际是更新 状态）
    // 这里是直接删除 
    // id author 保证删除的是本作者对应id的数据
    id= escape(id)
    author = escape(author)

    const sql = `delete from blogs where id=${id} and author=${author}`

    return exec(sql).then(deleteData => {
        console.log('deleteData',deleteData)
        if(deleteData.affectedRows >0){
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}