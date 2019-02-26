var express = require('express');
var router = express.Router();
var nodemailer=require("nodemailer");

var code="";
        while(code.length<5){
            code+=Math.floor(Math.random()*10);
        }

var transporter=nodemailer.createTransport({//邮件传输
    host:"smtp.qq.com", //qq smtp服务器地址
    secureConnection:false, //是否使用安全连接，对https协议的
    port:465, //qq邮件服务所占用的端口
    auth:{
        user:"1121968314@qq.com",//开启SMTP的邮箱，有用发送邮件
    pass:"heydqxjawmdhhjjf"//授权码
}
});
router.post("/",function(req,res){ //调用指定的邮箱给用户发送邮件
          var mailOption={
              from:"1121968314@qq.com",
              to:req.body.eml,//收件人
              subject:"XX注册校验码",//纯文本
              html:"<h1>欢迎注册XX系统，您本次的注册验证码为："+code+"</h1>"
          };

          transporter.sendMail(mailOption,function(error,info){
                if(error){
                    res.send("1");
                    return console.info(error);
                }else{
                    req.session.yanzhengma=code;
                    res.send("2");
                    console.info("Message send"+code);
                }
          })

})

module.exports = router;

        


        
