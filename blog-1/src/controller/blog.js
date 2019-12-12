// 引入查询数据库 函数
const{exec} = require('../db/mysql')

// 博客列表 查询取数据
const getList = (author, keyword) => {
    // 拼接sql语句 查询数据库里想要获取的数据（格式要正确）
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql+= `and author='${author}' `
    }
    if(keyword) {
        sql+= `and title like '%${keyword}%' `
    }
    sql+= `order by createtime desc`

    console.log('sql:'+sql)
    // 返回promise
    return exec(sql)

}

// 博客详情 查询取数据
const getDetail = (id) =>{
   let sql = `select * from blogs where id='${id}'`

   return exec(sql).then(rows => {
       return rows[0]
   })
}

// 新建博客 插入数据
const newBlog = (blogData ={})=>{
    // blogData是一个博客对象， 包含title content 属性
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()
    console.log(title)
    const sql = `insert into blogs (title, content, createtime, author) values ('${title}','${content}',${createtime},'${author}');`
    return exec(sql).then(insertData => {
        // console.log('insertData:',insertData)
        return{
            id: insertData.insertId
        }
    })

    // console.log('newBlog blogData...:', blogData)
    // return {
    //     id: 3   //表示新建博客， 插入数据表里面的 id
    // }
}

// 更新博客
const updateBlog = (id, blogData={}) =>{
    // id是要更新博客的 id
    // blogData是一个博客对象， 包含title content 属性
    console.log('update blogData...:',id,blogData)
    return false
}

// 删除博客
const deleteBlog = (id) => {
    // id是要删除博客的 id
    console.log('delete blogData...:',id)

    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}