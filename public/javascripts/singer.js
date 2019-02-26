$(document).ready(function(){

    var test = window.location.href;
    var x = test.split(":");
    var num = x[3];
    $('#name').append(`<a>${num}</a>`);
    $('#singer_more').hide();
    $.get('/singer_list', (data)=>{
        getSingerPage(data);
        getSingerIndex(1,data);
        listen_palce(data);
        listen_sex(data);
        listen_type(data);
    });


});

function getSingerIndex(index,data) {
  $('#singer_list').html('');
    var j=(index-1)*10;
    for (var i = j; i <j+10; i++) {
      if(i<data.length){
        var name=$(`<span>${data[i].name}</span>`);
        var img=$(`<img src="${data[i].img}">`);
        var div=$('<div class="singer_info"></div>');
        var div1=$('<div class="singer_img"></div>');
        var div2=$('<div class="singer_name"></div>');
        div1.append(img);
        div2.append(name);
        div.append(div1);
        div.append(div2);
        $('#singer_list').append(div);

      }


    }
   listenSingerNews(data);

}

function getSingerPage(data) {
  	     $('#page').html('');
				var num=data.length;
				num=num/10;
				console.log(num);
				var pre_btn = $('<li><a id="pre">上一页</a></li>');
				var next_btn = $('<li><a id="next">下一页</a></li>');
				var set_page = $('<li><a id="page_0" class="active">1</a></li>');
				$('#page').append(pre_btn);
				$('#page').append(set_page);
				for (var i = 1; i < num; i++) {
					$('#page').append(`<li><a id="page_${i}">${i+1}</a></li>`);
				}
				$('#page').append(next_btn);
				listenBtn(num,data);
}

function listenBtn(num,data) {

		$('#pre').bind('click',function(){
			var now_page= $('.mod_singer .singer_list .page_btn .active').text();
			now_page=parseInt(now_page);
			console.log(now_page);
			if (now_page == 1) {
					layer.msg('已经是第一页',{icon:6});
			} else {
					$('.mod_singer .singer_list .page_btn ul li a').removeClass('active');
					$(`#page_${now_page-2}`).addClass('active');
					getSingerIndex(now_page-1,data);

			}
		});
		$('#next').bind('click',function(){
			var now_page= $('.mod_singer .singer_list .page_btn .active').text();
			now_page=parseInt(now_page);
			if (now_page > num) {
					layer.msg('已经是最后一页',{icon:6});
			} else {
					$('.mod_singer .singer_list .page_btn ul li a').removeClass('active');


					$(`#page_${now_page}`).addClass('active');
					getSingerIndex(now_page+1,data);

			}
		});
}


function listen_palce(data) {
    $('#palce li').bind('click',function(){
        var palce = $(this).children('a').text();
          $('#palce li').removeClass('active');
          $(this).addClass('active');
          getSinger(data);
    });

}

function listen_sex(data) {
    $('#sex li').bind('click',function(){
        var sex = $(this).children('a').text();
          $('#sex li').removeClass('active');
          $(this).addClass('active');
          getSinger(data);


    });

}

function listen_type(data) {
    $('#type li').bind('click',function(){
        var type = $(this).children('a').text();
          $('#type li').removeClass('active');
          $(this).addClass('active');
          getSinger(data);

    });

}
function getSinger(data){
    var list=getPalceSinger(data);
    console.log(list);
    list = getSexSinger(list);
    console.log(list);
    list = getTypeSinger(list);
    getSingerPage(list);
    getSingerIndex(1,list);
}

function getPalceSinger(data){

    var palce = $('#palce .active').children('a').text();
    if( palce == "全部"){
        return data;

    }
    else {
        var list=[];
        for (var i = 0; i <data.length; i++) {
            if (data[i].palce==palce) {
               list.push(data[i] );
            }
        }
        console.log(list);
        return list;

    }

}

function getSexSinger(data){
    var sex = $('#sex .active').children('a').text();
    if(sex == "全部"){
        return data;

    }
    else {
        var list=[];
        for (var i = 0; i <data.length; i++) {
            if (data[i].sex==sex) {
               list.push(data[i] );
            }
        }
        console.log(list);
        return list;

    }
}

function getTypeSinger(data) {
    var type = $('#type .active').children('a').text();
    if(type == "全部"){
        return data;

    }
    else {
        var list=[];
        for (var i = 0; i <data.length; i++) {
            if (data[i].type==type) {
               list.push(data[i] );
            }
        }
        console.log(list);
        return list;

    }
}


function returnIndex() {
  var test = window.location.href;
  var x = test.split(":");
  var num = x[3];
  window.location.href="/account?="+num;
}


function listenSingerNews(data) {
    $('.mod_singer .singer_list .singer .singer_info .singer_img img').bind('click', function(){
        var name = $(this).parent().parent().children('.singer_name').children('span').text();
        console.log(name);
        showNews(name ,data);
        show_music(name);
    });
    $('.mod_singer .singer_list .singer .singer_info .singer_name span').bind('click', function(){
        var name = $(this).parent().parent().children('.singer_name').children('span').text();
        console.log(name);
        showNews(name ,data);
        show_music(name);
    });
}


function showNews(name ,data) {

    $('#singer_most').hide();
    $('#singer_more').show();
    for (var i = 0; i <data.length; i++) {
      if (data[i].name == name) {
          var path = data[i].img;
          $('.mod_singer .singer_more .singer_main .this_img img').attr('src',path);
          $('.mod_singer .singer_more .singer_main .this_info .this_name').append(`姓名：${data[i].name}`);
          $('.mod_singer .singer_more .singer_main .this_info .this_sex').append(`性别：${data[i].sex}`);
          $('.mod_singer .singer_more .singer_main .this_info .this_type').append(`类型：${data[i].type}`);
          $('.mod_singer .singer_more .singer_main .this_info .this_introduce').append(`简介：${data[i].introduce}`);
          return;
      }
    }


}

function show_music(name) {

    $.get('/music_list',(data)=>{

        for (var i = 0; i < data.length; i++) {
            if(`${data[i].author}` == `${name}`){
            console.log(1);
            console.log(data[i]);
            what_bug(data[i]);

          }




        }

    });
}

function what_bug(music) {
    console.log(1);
    var ul=$('<ul class="hhh"><ul>');

    var name = $(`<li id="ready_name">1.  <span>${music.name}</span></li>`);
    var z_name = $(`<li>${music.z_name}</li>`);
    var hot = $(`<li>${music.hot}</li>`);
    var play = $(`<li class="play" ><i class="fa fa-play-circle " aria-hidden="true"></i></li>`);
    ul.append(name);
    ul.append(z_name);
    ul.append(hot);
    ul.append(play);
    $('.mod_singer .singer_more .singer_music').append(ul);
    lis_play_btn();
}

function lis_play_btn() {
  var test = window.location.href;
  var x = test.split(":");
  var num = x[3];
  $('.mod_singer .singer_more .singer_music .play').bind('click',function(){
        var name = $('#ready_name span').text();
        window.location.href=`/users/:${num}/musics/:${name}`;
  });

}
