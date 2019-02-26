$(document).ready(function(){
		$("#test").hide();
		$("#addMusic").hide();
    $("#addAuthor").hide();

    $("#addSome").click(function(){
        $("#dis_fun").hide();
				$("#singe_test").hide();
        $("#dis_music").hide();
        $("#addAuthor").hide();
				$("#test").hide();
        $("#addMusic").show();
        $(".display_main").addClass("add_mod");
    });
    $("#addMan").click(function(){
	        $("#dis_fun").hide();
	        $("#dis_music").hide();
	        $("#addMusic").hide();
					$("#singe_test").hide();
					$("#test").hide();
	        $("#addAuthor").show();
	        $(".display_main").addClass("add_mod");
    });
		$("#manage_music").click(function(){
	        $("#dis_fun").hide();
	        $("#dis_music").hide();
	        $("#addMusic").hide();
					$("#singe_test").hide();
					$("#addAuthor").hide();
	        $("#test").show();
	        $(".display_main").addClass("add_mod");

    });
		$("#manage_singer").click(function(){
					$("#dis_fun").hide();
					$("#dis_music").hide();
					$("#addMusic").hide();
					$("#test").hide();
					$("#addAuthor").hide();
					$("#singe_test").show();
					$(".display_main").addClass("add_mod");

		});


		getNumber();
		getSingerNumber();

});

function addMusic(){
	layer.confirm('您确定保存的信息无误么？', {
			btn: ['确定'] //按钮
			}, function(){
				var name = $('#sumbit_name').val();
				var author = $('#sumbit_author').val();

				var z_name = $('#sumbit_z_name').val();
				var url = $('#sumbit_url').val();
				var palce = $('input[name="palce"]:checked').val();
				var introduce = $('#sumbit_introduce').val();

				$.post('/add_music',{
					name:`${name}`,
					author:`${author}`,
					z_name:`${z_name}`,
					url:`${url}`,
					palce:`${palce}`,
					introduce:`${introduce}`},
				)
			layer.msg('成功添加歌曲', {icon: 1});
			});



}




function getNumber() {
		$.get('/music_list',(data)=>{
				getPage(data);
				displaynews(1,data);
				var number = data.length;
				$('#music_number').html(`${number}`);
		});
}

function getSingerNumber() {
		$.get('singer_list',(data)=>{
				var number = data.length;
				$('#singer_number').html(`${number}`);
		});
}

function manage_music() {
		$("#dis_fun").hide();
		$("#dis_music").hide();
		$("#addMusic").hide();
		$("#addAuthor").hide();
		$("#manage_music").show();
		$(".display_main").addClass("add_mod");

}

/*得到总页数*/
function getPage(data) {
				var num=data.length;
				num=num/8;
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

/*监听按钮*/
function listenBtn(num,data) {
		$('#pre').bind('click',function(){
			var now_page= $('.display_con .display_main .what .select_btn .active').text();
			now_page=parseInt(now_page);
			console.log(now_page);
			if (now_page == 1) {
					layer.msg('已经是第一页');
			} else {
					$('.display_con .display_main .what .select_btn ul li a').removeClass('active');
					$(`#page_${now_page-2}`).addClass('active');
					displaynews(now_page-1,data);

			}
		});
		$('#next').bind('click',function(){
			var now_page= $('.display_con .display_main .what .select_btn .active').text();
			now_page=parseInt(now_page);
			if (now_page > num) {
					layer.msg('已经是最后一页');
			} else {
					$('.display_con .display_main .what .select_btn ul li a').removeClass('active');

					console.log(now_page+1);
					$(`#page_${now_page}`).addClass('active');
					displaynews(now_page+1,data);

			}
		});
}

function displaynews(index,data) {
		var j=(index-1)*8;
		console.log(j);
	  $('#simplecontent').html('');

		$('#simplecontent').append(`<li><div>歌名</div><div>歌手</div><div>地区</div><div>专辑</div><div>热度</div><div></div></li><hr class="style-one"></hr>`);

				var num=data.length;
        for(i=j;i<j+8;i++){
					if(i<data.length){
						console.log(data[i]);
						var li=$('<li></li>');
						var name =$(`<div class="music_name">${data[i].name}</div>`);
						var z_name =$(`<div>${data[i].z_name}</div>`);
						var author =$(`<div>${data[i].author}</div>`);
						var palce =$(`<div>${data[i].palce}</div>`);
						var hot = $(`<div>${data[i].hot}</div>`);
						var edit = $('<div class="edit"></div>');
						var add =$('<a class="add">编辑</a>');
						var remove =$('<a class="remove">删除</a>');
						var hr=$('<hr class="style-one"></hr>');
						edit.append(add);
						edit.append(remove);

						li.append(name);
						li.append(author);
						li.append(palce);
						li.append(z_name);


						li.append(hot);
						li.append(edit);
						$('#simplecontent').append(li);
						$('#simplecontent').append(hr);

					}


        }
				deleteMusic();
				 listenEdit();
}

function deleteMusic(){

		$('.display_con .display_main .what .show_list .remove').bind('click', function(){
					var delete_name = $(this).parent().parent().children('.music_name').text();
					console.log(delete_name);
					layer.confirm('您确定要删除该歌曲么？', {
					  btn: ['确定','取消'] //按钮
					}, function(){
						$.post('/delete',{name:delete_name}, function(res){
							if(res){
								console.log("删除成功");
							}
							else {

							}
						})
					  layer.msg('成功删除', {icon: 1});
					}, function(){
					  layer.close();

					});


		});
}

function listenEdit() {
			$('.display_con .display_main .what .show_list .add').bind('click',function(){
				$("#dis_fun").hide();
				$("#dis_music").hide();
				$("#addAuthor").hide();
				$("#test").hide();
				$("#addMusic").show();
				$(".display_main").addClass("add_mod");
			});
}

function logout(){
		window.location.href="http://localhost:8081";
}
