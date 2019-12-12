const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'20120623',
    port:'3306',
    database:'myblog'
})

// 开始链接
con.connect()

// 执行 sql 语句
const sql = `INSERT INTO blogs (title,content,creattime,author) VALUES ('标题D','内容D','1575877151571','a先生')`
con.query(sql,(err,result)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(result)
})
 

// 关闭链接
con.end()
