//login && register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require("passport");
const User = require("../../models/User");

//$route GET aoi/users/test
//@desc 返回的请求的json数据
//@access public
router.get("/test",(req,res) => {
    res.json({msg:"login works"})
});

//$route GET aoi/users/register(注册)
//@desc 返回的请求的json数据
//console.log(req.body);

router.post("/register",(req,res) => {
    //console.log(req.body);

    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
        .then( user =>{
            if(user){
                return res.status(400).json("邮箱以被注册！")
            }else {
                //头像gravatar
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                     avatar,
                    password:req.body.password,
                    identity:req.body.identity
                })

                //密码加密
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }

        });

});
//$route GET aoi/users/login(登录)
//@desc 返回token jwt passport
//@access public
router.post("/login",(req,res) => {
    //console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({email:email})
        .then(user => {
            if (!user){
                return res.status(404).json("用户不存在！");
            }

            //密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const rule = {
                            id:user.id,
                            name:user.name,
                            avatar:user.avatar,
                            identity:user.identity
                        };
                        //jwt.sign("规则","加密的名字","过期时间","箭头函数")
                        //获得token 可以请求数据
                        jwt.sign(rule,keys.secretOrkey,{expiresIn: 3600 },(err,token) => {
                            if(err) throw err;
                            res.json({
                                success:true,
                                //token名一定要是bearer和空格
                                token:"Bearer "+token
                            });
                        });
                        //res.json({msg:"success"});
                    }else{
                        return res.status(400).json("密码错误！");
                    }
                })

        })

});

//$route GET aoi/users/current（当前用户请求）
//@desc 返回return current user
//@access private
//验证token
router.get("/current",
    passport.authenticate("jwt",{ session:false }),
    (req,res) => {
    //res.json((req.user));//返回用户信息
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    })
});

module.exports = router;
