


// function $(s){
//     return document.querySelectorAll(s);
// }   //获取整个网页的demo
//
// var size = 32;
// var lis  = $("#list li");
// var types = $("#type li");
// var Dots = [];
// var line;
// var box = $("#box")[0];
// var height, width;
// var canvas = document.createElement("canvas");
// var ctx = canvas.getContext("2d");
//
// var mv = new MusicVisualizer({
//     size: size,
//     visualizer: draw
// })
//
// for (var i = 0; i < types.length; i++) {
//       types[i].onclick = function(){
//         for (var j= 0; j < types.length; j++) {
//               types[j].className = "";
//         }
//         this.className = "selected";
//         draw.type= this.getAttribute("data-type");
//     }
// }
//
// box.appendChild(canvas);
//
//
// function random(m, n) {
//     return Math.round(Math.random()*(n- m) + m );
// }
// function getDots(){
//     Dots = [];
//     for(var i=0; i< size; i++){
//         var x= random(0, width);
//         var y= random(0, height);
//         var color= "rgb("+random(0,255)+", "+random(0,255)+", "+random(0,255)+", 0)";
//         Dots.push({
//           x: x,
//           dx: random(1, 4),
//           y: y,
//           color: color,
//           cap: 0
//         })
//     }
// }
//
// function resize() {
//     height = box.clientHeight;
//     width = box.clientWidth;
//     canvas.height = height;
//     canvas.width = width;
//     line = ctx.createLinearGradient(0, 0, 0, height); //矩形的线性渐变
//     line.addColorStop(0, "red");
//     line.addColorStop(0.5, "yellow");
//     line.addColorStop(1, "green");
//     getDots();
// }
// resize();
//
// window.onresize = resize;
// draw.type= "column";
//
// function draw(arr) {
//     ctx.clearRect(0, 0, width, height);
//     var w = width/ size;
//     ctx.fillStyle = line;
//     for(var i=0 ; i< size; i++){
//         var o = Dots[i];
//         if(draw.type == "column"){
//             var h = arr[i]/ 256* height; //计算矩形高度
//
//             var cw = w * 0.6;
//             var capH = cw > 10 ?10:cw;
//             ctx.fillRect(w* i, height- h, cw, h); //绘制矩形
//             ctx.fillRect(w* i, height - (o.cap+capH) , cw, capH);//绘制小帽\
//             o.cap--;
//             if (o.cap < 0) {
//                 o.cap = 0;
//             }
//             if (h > 0 && o.cap < h + 40) {
//                 o.cap = h + 40 > height - capH ? height -capH : h + 40;
//             }
//           }else if (draw.type == "dot") {
//                   console.log(1);
//                   ctx.beginPath();
//                   console.log(Dots[i]);
//
//                   var r = 10 + arr[i]/256* (height > width ? width : height)/10;
//                   ctx.arc(o.x, o.y, r, 0, Math.PI*2, true);
//                   var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
//                   g.addColorStop(0, "#fff");
//                   g.addColorStop(1, o.color);
//                   ctx.fillStyle = g;
//                   ctx.fill();
//                   o.x += o.dx;
//                   o.x = o.x > width ? 0 : o.x;
//           //ctx.strokeStyle = "#fff";
//           //ctx.stroke();
//
//       }
//     }
// }
//
//
// for(var i=0; i<lis.length; i++){
//         lis[i].onclick = function(){
//         for(var j=0; j<lis.length; j++){
//             lis[j].className = "" ;
//
//         }
//         this.className = "selected";
//         //load("/media/"+this.title);
//         mv.play("/media/"+this.title);
//     }
//
// }           //点击请求数据
//
// $("#volume")[0].onchange = function () {
//       mv.changeVolume(this.value/this.max);
// }           //控制音量
// $("#volume")[0].onchange();
