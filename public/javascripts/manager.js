function check() {
  var manager_id =$('#manager_id').val();
  var manager_pass=$('#manager_pass').val();
  $.get('/manager',(data)=>{
      var tag=0;
      for(var i=0;i<data.length;i++){
        if(manager_id==data[i].id&&manager_pass==data[i].password){
          window.location.href=`http://localhost:8081/add`;
          tag=1;
        }
      }
      if(tag == 0){
            layer.msg('用户不存在或密码错误', {icon: 5});
      }
  });

}
