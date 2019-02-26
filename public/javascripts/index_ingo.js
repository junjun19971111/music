$(document).ready(function(){

    var test = window.location.href;
    var x = test.split("=");
    var num = x[1];

    displayAll();
    $('#res_result').hide();
    $('#like').hide();
    $('#name').append(`<a>${num}</a>`);
    $(".mod_section .section_content .section_main .section_hot .hot_cover").bind('mouseover',function(){
        $(this).children('.play_btn').css("color","white");
    });
    $(".mod_section .section_content .section_main .section_hot .hot_cover").bind('mouseout',function(){
        $(this).children('.play_btn').css("color","#24242463");
    });

    $.get('/music_list',(data)=>{
        getIndex(data);
        getMusic(0,data);
        listenChangeType(data);
        $('#search').bind('click',function(){
              var key = $(this).parent().children("input").val();
              console.log(key);
              searchMusic(key,data);
        });
    });


    $('.mod_section .section_content .section_main .section_hot .hot_cover .play_btn').bind('click', function(){
        var name = $(this).parent().parent().children('.play_name').children('.name').children('a').text();
        console.log(name);
        window.location.href=`/users/:${num}/musics/:${name}`;
    })
    $('.play_nav .play_list .start').bind('click', function(){
        var name = $(this).parent().children(".click_music").text();
        console.log(name);
        window.location.href=`/users/:${num}/musics/:${name}`;
    })
    /*搜索*/



});

function getMusic(x,data) {
      var music_list=data;
      for(var i=x;i<x+5;i++){
        var path = music_list[i].img;
        var name = music_list[i].name;
        var hot = music_list[i].hot;
        $(`#list_${i}`).children(".hot_cover").children("img").attr('src',path);
        $(`#list_${i}`).children(".play_name").children(".name").append(`<a href="javascript:void(0)">${name}</a>`);
        $(`#list_${i}`).children(".play_name").children(".descri").append(`<span>播放量:${hot}万</sapn>`);
      }

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
        $(`#list_${i-a}`).children(".play_name").children(".name").append(`<a href="javascript:void(0)">${name}</a>`);
        $(`#list_${i-a}`).children(".play_name").children(".descri").append(`<span>播放量:${hot}万</sapn>`);
      }
  });
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
    $.get(`/play_list/${palce}`,(data)=>{
        var list=data;
        for(var i=0;i<list.length;i++){
          if(list[i]){
              $(`#introd_list_${j} .list_dis_${i}`).append(`<a class="click_music" href="javascript:void(0)">${list[i].name}</a>`);
          }
        }
    });
}

function searchMusic(key,data){

      var test = window.location.href;
      var x = test.split("=");
      var num = x[1];
        var tag=0;
        $('.search_res .search_res_music').empty();
        for(var i=0;i<data.length;i++){
          if(key==data[i].name||key == data[i].author||key == data[i].z_name){
            $('.mod_index').hide();
            $('.none').hide();
            $('#res_result').show();
            $('.search_res .search_res_music').append('<hr class="style-one"></hr>');
            $('.search_res .search_res_music').append(`<div class="dis_list"><a class="name">${data[i].name}</a><a >${data[i].z_name}</a><a>${data[i].author}</a><a class="dis_list_btn"><i class="fa fa-play-circle fa-lg" aria-hidden="true"></i></a></div>`)
            $('.search_res .search_res_music').append('<hr class="style-one"></hr>');
            $('.search_res .search_res_music .dis_list .dis_list_btn').bind('click',function(){
              var name = $(this).parent().children(".name").text();
              console.log(name);
              window.location.href=`/users/:${num}/musics/:${name}`;
            });
            tag=1;
          }

        }

        if (tag==0) {
            layer.msg('无法搜索到', {icon: 5});

        }

}

function showMyLike(){
    $('.mod_index').hide();
    $('.none').hide();
    $('#res_result').hide();
    $('#like').show();
    var account = $('#name').children("a").text();
    console.log(account);
    $.get('/login',(data)=>{
        var like_music;
        for(var i=0;i<data.length;i++){
          if(account == data[i].account){
              var user=data[i];
              like_music=data[i].like;
          }
        }
        for (var i = 0; i < like_music.length; i++) {
          var li=$('<li></li>');
          var play=$('<div class="play_love"><i class="fa fa-play-circle " aria-hidden="true"></i></div>')
          var name=$(`<div class="name_love">${like_music[i].name}</div>`);
          var author=$(`<div>${like_music[i].author}</div>`);
          var palce=$(`<div>${like_music[i].palce}</div>`);
          var z_name=$(`<div>${like_music[i].z_name}</div>`);

          li.append(play);
          li.append(name);
          li.append(author);
          li.append(palce);
          li.append(z_name);

          $('#love_list').append(li);

        }
        listenLike();

    });

}

function listenLike(){
    var test = window.location.href;
    var x = test.split("=");
    var num = x[1];
    $('#love_list .play_love').bind('click', function(){
        var name=$(this).parent().children('.name_love').text();
        window.location.href=`/users/:${num}/musics/:${name}`;
    });
}



function getIndex(data){
  var music_list=data;
  var count =0;
  for(var i=0;i<music_list.length;i++){
    var palce = music_list[i].palce;
    if(palce == "韩国" && count<5){

      var path = music_list[i].img;
      var name = music_list[i].name;
      var hot = music_list[i].hot;
      $(`#place_list_${count}`).children(".hot_cover").children("img").attr('src',path);
      $(`#place_list_${count}`).children(".play_name").children(".name").append(`<a href="#">${name}</a>`);
      $(`#place_list_${count}`).children(".play_name").children(".descri").append(`<span>播放量:${hot}万</sapn>`);
      count++;
    }



  }
}

function listenChangeType(data){
  $("#palce li div").bind('click', function(){
    for(var i=0;i<5;i++){
      $(`#place_list_${i}`).children(".hot_cover").children("img").attr('src',"");
      $(`#place_list_${i}`).children(".play_name").children(".name").empty();
      $(`#place_list_${i}`).children(".play_name").children(".descri").empty();
    }
      $('#palce li div').removeClass("active");
      $(this).addClass("active");
      var music_place = $(this).text();
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

}

function displayAll() {
  getMusicList('韩国');
  getMusicList('大陆');
  getMusicList('日本');
  getMusicList('欧美');
  getMusicList('港台');
}

function getSingerIndex() {
  var test = window.location.href;
  var x = test.split("=");
  var num = x[1];
  window.location.href=`/singer/:${num}`;
}

function back(){
  var test = window.location.href;
  var x = test.split("=");
  var num = x[1];
  window.location.href=`/account?=${num}`;
}

function bace_first(){
    window.location.href=`/`;
}
