var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

//两个路由文件
// var indexRouter = require('./routes/index');  
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');



var app = express();

// view engine setup 前端模板引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
const ENV = process.env.NODE_ENV
if(ENV != 'production'){
  app.use(logger('dev',{
    stream: process.stdout
  }));  //开发 测试环境 记录日志--打印到控制台

}else{
  // 线上环境 记录日志github查看 express morgan
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined',{
    stream: writeStream
  }));  

}
app.use(express.json()); //处理POST 传入数据
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //解析cookie
// app.use(express.static(path.join(__dirname, 'public'))); //处理静态文件

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(session({
  secret: 'WJiol#2012_',
  cookie: {
    // path: '/', //默认配置 根目录下
    // httpOnly: true, //默认配置 设置true 前端js无法更改cookie
    maxAge: 24 * 60 *60 *1000 //过期时间 
  },
  store: sessionStore
}))

//注册路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);  //拆分路由...blog下的子路由逻辑 在blog.js里实现
app.use('/api/user', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};  //本地环境错误可暴露  线上环境 错误报空{}

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
