
function check(obj){
    var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/g;//邮箱验证
    if(reg.test($(obj).val())){
        $(obj).css("border-color","green");

        return true;
    }else{
        $(obj).css("border-color","red");
        layer.msg('邮箱格式错误', {icon: 2});
        return false;
    }
}




       


     
