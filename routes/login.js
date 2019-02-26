var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post("/login", function (req, res) {

    //获取登录输入框的值
    const manageLoginInfo = {
        txt_accout: req.body.user_account,
        txt_password: req.body.user_password
    };


});


module.exports = router;
