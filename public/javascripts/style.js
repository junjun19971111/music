
$(document).ready(function(){
    getMusic(0);
    $.get('/music_list',(data)=>{
        var music_list=data;
        var count =0;
        for(var i=0;i<music_list.length;i++){
          var palce = music_list[i].palce;
          if(palce == "韩国" && count<5){
            console.log(1);
            var path = music_list[i].img;
            var name = music_list[i].name;
            var hot = music_list[i].hot;
            $(`#place_list_${count}`).children(".hot_cover").children("img").attr('src',path);
            $(`#place_list_${count}`).children(".play_name").children(".name").append(`<a href="#">${name}</a>`);
            $(`#place_list_${count}`).children(".play_name").children(".descri").append(`<span>播放量:${hot}万</sapn>`);
            count++;
          }



        }
    });


    displayAll();
    $(".mod_section .section_content .section_main .section_hot .hot_cover").bind('mouseover',function(){
        $(this).children('.play_btn').css("color","white");
    });
    $(".mod_section .section_content .section_main .section_hot .hot_cover").bind('mouseout',function(){
        $(this).children('.play_btn').css("color","#24242463");
    });
    $('.mod_section .section_content .section_main .section_hot .hot_cover .play_btn ').click(function(){
      layer.alert('未登录，请现在去登录', {
          skin: 'layui-layer-molv' //样式类名
          ,closeBtn: 0
          });
    });


    $("#palce li div").bind('click', function(){
      for(var i=0;i<5;i++){
        $(`#place_list_${i}`).children(".hot_cover").children("img").attr('src',"");
        $(`#place_list_${i}`).children(".play_name").children(".name").empty();
        $(`#place_list_${i}`).children(".play_name").children(".descri").empty();
      }
        $('#palce li div').removeClass("active");
        $(this).addClass("active");
        var music_place = $(this).text();
        $.get('/music_list',(data)=>{
            var music_list=data;
            var count =0;
            for(var i=0;i<music_list.length;i++){

              var palce = music_list[i].palce;

              if(palce == music_place && count<5){
                var path = music_list[i].img;
                var name = music_list[i].name;
                var hot = music_list[i].hot;
                $(`#place_list_${count}`).children(".hot_cover").children("img").attr('src',path);
                $(`#place_list_${count}`).children(".play_name").children(".name").append(`<a href="#">${name}</a>`);
                $(`#place_list_${count}`).children(".play_name").children(".descri").append(`<span>播放量:${hot}万</sapn>`);
                count++;
              }



            }
        });
    });



});
function login(){
    layer.open({
      title:"登录",
      type: 1,
      anim: 1,
      skin: 'layui-layer-rim', //加上边框
      area: ['420px', '280px'], //宽高
      content:`<div class = "input_music" '>
              <div class = "input_nav">账号</div>
              <input  type="text" name="account" required lay-verify="required" placeholder="请输入你的账号" autocomplete="off" class="layui-input">
              <div class = "input_nav">密码</div>
              <input  id="accout_pass" type="password" name="pass" required lay-verify="required" placeholder="请输入你的密码" autocomplete="off" class="layui-input">
              <div class = "forget"><a herf = "#">忘记密码/</a><a href="javascript:void(0)" onclick="sign_in()">注册</a></div>
              <div class = "manaage"><a href="http://localhost:8081/mannage">管理员入口</a></div>
              <div class = "login"> <button onclick="login_mus()" id="login_mus" class="layui-btn">登录</button></div>
              </div> `
    });
}
function sign_in() {
  layer.open({
    title:"注册",
    type: 1,
    anim: 1,
    skin: 'layui-layer-rim', //加上边框
    area: ['420px', '280px'], //宽高
    content:`<div>
                <div class ="mod_input "><span>邮箱</span><input  id="email" type="text" name="account" required lay-verify="required" placeholder="请输入你的账号" autocomplete="off" class="layui-input" onblur="check(this)"></div>
                <div class ="mod_input "><span>密码</span><input  id="pwd" type="password" name="account" required lay-verify="required" placeholder="请输入你的密码" autocomplete="off" class="layui-input"></div>
                <div class ="mod_input "><span>确认密码</span><input id="pwd1" type="text" name="account" required lay-verify="required" placeholder="请确认你的密码" autocomplete="off" class="layui-input" onkeyup="validate()"><div id ="tishi" class="veritfy"></div></div>
             </div>`,
    btn: ['注册']
    ,yes: function(index, layero){
      var pass1 = $("#pwd").val();
      var pass2 = $('#pwd1').val();
      var account =$("#email").val();
      layer.close(index);

      console.log(account);
      if(pass1==pass2){
          $.post('/sign_in',{user_email: account, user_password: pass1},
          function(res){
            if(res){
                layer.alert(`<i class="layui-icon layui-icon-face-smile" style="font-size: 30px; color: #1E9FFF;"></i>  注册成功`, {
                skin: 'layui-layer-lan'
                ,closeBtn: 0
                ,anim: 4 //动画类型
              });

            }
            else {
                layer.msg('注册失败', {icon: 5});
            }
        })
      }
      else {
          layer.msg('两次密码不一致', {icon: 5});
      }



    }


  });
}

function login_mus(){
    var account = $(" input[ name='account' ] ").val();
    var pass = $(" input[ name='pass'] ").val();
    $.get('/login', (data)=>{
        var obj=data;
        var count = 0;
        for(var i=0;i<obj.length; i++){
          if(obj[i].account==account&&obj[i].password==pass){
              var id = obj[i].account;
              window.location.href="/account?="+id;
              count = 1;

          }
        }
        if(count == 0)
        {
          layer.msg('账号不存在或密码错误', {icon: 5});
        }
      });
}
function validate() {

        var pwd = $("#pwd").val();
        var pwd1 = $("#pwd1").val();
        if(pwd == pwd1)
        {
            $("#tishi").html("密码相同");
            $("#tishi").css("color","green");

        }
        else {
            $("#tishi").html("密码不同");
            $("#tishi").css("color","red")

        }
}


function getMusicList(type){
  var j;
  switch(type)
  {
    case '韩国':j=0;break;
    case '大陆':j=1;break;
    case '日本':j=2;break;
    case '港台': j=4;break;
    default:j=3;
  }
    var palce = type;
    console.log(palce);
    $.get(`/play_list/${palce}`,(data)=>{
        var list=data;
        console.log(list);
        for(var i=0;i<5;i++){

          if(list[i]){
              $(`#introd_list_${j}`).append(`<tr><td><a href="javascript:void(0)" onclick="turnOut()">${i+1}.${list[i].name}</a><a href="javascript:void(0)" onclick="turnOut()">${list[i].author}</a><div onclick="turnOut()" class="start"><i class="fa fa-play-circle" aria-hidden="true"></div></td></tr>`);
          }
        }
    });
}



function displayAll() {
    getMusicList('韩国');
    getMusicList('大陆');
    getMusicList('日本');
    getMusicList('欧美');
    getMusicList('港台');
}

function getMusic(x) {
  $.get('/music_list',(data)=>{
      var music_list=data;
      for(var i=x;i<x+5;i++){
        var path = music_list[i].img;
        var name = music_list[i].name;
        var hot = music_list[i].hot;
        $(`#list_${i}`).children(".hot_cover").children("img").attr('src',path);
        $(`#list_${i}`).children(".play_name").children(".name").append(`<a href="#">${name}</a>`);
        $(`#list_${i}`).children(".play_name").children(".descri").append(`<span>播放量:${hot}万</sapn>`);
      }
  });
}

function change(x) {
  var j=x/5;
  for(var i=0;i<5;i++){
    $(`#change_${i}`).removeClass("active");
    $(`#list_${i}`).children(".hot_cover").children("img").attr('src',"");
    $(`#list_${i}`).children(".play_name").children(".name").empty();
    $(`#list_${i}`).children(".play_name").children(".descri").empty();
  }
  $(`#change_${j}`).addClass("active");
  $.get('/music_list',(data)=>{
      var music_list=data;
      for(var i=x;i<x+5;i++){
        var a=x;
        var path = music_list[i].img;
        var name = music_list[i].name;
        var hot = music_list[i].hot;
        $(`#list_${i-a}`).children(".hot_cover").children("img").attr('src',path);
        $(`#list_${i-a}`).children(".play_name").children(".name").append(`<a href="#">${name}</a>`);
        $(`#list_${i-a}`).children(".play_name").children(".descri").append(`<span>播放量:${hot}万</sapn>`);
      }
  });
}

function turnOut(){
  layer.alert('未登录，请现在去登录', {
      skin: 'layui-layer-molv' //样式类名
      ,closeBtn: 0
      });
}
