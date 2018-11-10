const express = require("express");
//引入mongoose
const mongoose = require("mongoose");
//引入bodyParser
const bodyParser = require("body-parser");
const app = express();
//引入users.js'
const users = require("./routes/api/users");
//引入profile.js'
const profiles = require("./routes/api/profiles");
//DB config
const  db = require("./config/keys").mongoURI;
//引入passport（验证token）
const passport = require("passport");
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//connect to mongadb 链接数据库
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() =>console.log("Mongoose Connect"))
    .catch(err => console.log(err));

//passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

//使用routes
app.use("/api/users",users);
//使用profiles
app.use("/api/profiles",profiles);
//端口号
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})

//路由
// app.get("/",(req,res)=>{
//     res.send("hello");
// })