$(function(){
        var test = window.location.href;
        var x = test.split(":");
        var name= x[4];
        name=name.split('%20');
        name=name.join(' ');
        var id =x[3].split('/');
        id=id[0];
        playThisMusic(id, name);

        console.log(name);
        $('audio').bind('ended', function(){
              $('#play_image').removeClass("change");
        })
        $('audio').bind('pause', function(){
                $('#play_image').removeClass("change");
                $('#play_image').addClass("suspended");
        })
        $('audio').bind('play', function(){
            if($('#play_image').hasClass("change")){
              if(  $('#play_image').hasClass("suspended")){
                $('#play_image').removeClass("suspended");
              }
            }
            else {
                $('#play_image').addClass("change");
            }

        })
        var count = 0;
        $('.addLike').bind('click',function(){

            if (count == 1) {
                $(".addLike i").removeClass("fa fa-heart fa-lg");
                $(".addLike i").addClass("fa fa-heart-o fa-lg");
                $(".addLike i").css("color","#d4d4d4 ");
                  count = 0;
                  var like_name=$('#like_mus').text();
                  search_music_remove(id,like_name);

            } else {
              $(".addLike i").removeClass("fa fa-heart-o fa-lg");
              $(".addLike i").addClass("fa fa-heart fa-lg");
              $(".addLike i").css("color", "rgb(210, 101, 101, 1)");
              count = 1;
              var like_name=$('#like_mus').text();
              search_music_add(id,like_name);


            }
        })
  })


  function playThisMusic(id, name){
      var userId = id;
      var musicId = name;
      console.log(id);
      console.log(name);
      $.get(`/music_list/${musicId}`,(data)=>{
            var music = data[0];
            var path = data[0].img;
            var url =data[0].url;
            $('.mod_play .mod_list .left .name_list ').append(`<li><a id="like_mus">${music.name}</a><a>${music.z_name}</a><a>${music.author}</a></li><hr class="style-one"></hr>`);
            $('.mod_play .mod_list .right img').attr('src',path);
            $('#music_path').attr('src',url);
            $('#music_audio').load();
            if(data[0].lyric){
              for(var i=0;i<data[0].lyric.length;i++){
                $('#lyric').append(`<li>${data[0].lyric[i]}</li>`);
              }
            }
      });

  }



  function search_music_add(id,name) {
      $.get('/music_list',(data)=>{
        console.log(1);
        console.log(name);
          for(var i=0;i<data.length;i++){
            if(data[i].name == name){
              console.log(data[i]);
              insertLike(id,data[i]);
            }
          }
      });

  }
function search_music_remove(id,name) {
      $.get('/music_list',(data)=>{
        console.log(1);
        console.log(name);
          for(var i=0;i<data.length;i++){
            if(data[i].name == name){
              console.log(data[i]);
              removeLike(id,data[i]);
            }
          }
      });

  }
function removeLike(id, like){
  console.log(like);
  console.log(id);
  like = JSON.stringify(like);
  console.log(like);
  $.post('/remove_like',{music:like, id:id});
  layer.msg('踢出喜欢', {icon: 5});

}

function insertLike(id,like) {
      console.log(like);
      console.log(id);
      like = JSON.stringify(like);
      console.log(like);
      $.post('/add_like',{music:like, id:id});
      layer.msg('加入喜欢', {icon: 6});
  }
