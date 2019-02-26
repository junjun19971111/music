var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index');
});

router.get('/singer/:id',function(req, res, next){
    res.render('singer');
});
/*登录API*/
router.get('/singer_list', function(req, res, next){

    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("music");
    dbo.collection("singer"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        res.send(result);
        db.close();
    });

    });
});
router.get('/login',function(req, res, next){

    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("music");
    dbo.collection("user"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        res.send(result);
        db.close();
    });

    });
})

/*获取歌曲API*/
router.get('/music_list',function(req, res, next){

  MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("music");
  dbo.collection("list"). find({}).toArray(function(err, result) { // 返回集合中所有数据
      if (err) throw err;
      res.send(result);
      db.close();
  });

  });
})




router.get('/music_list/:id',function(req, res, next){
  var name = req.params.id;

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("music");
  var whereStr = {"name":name};  // 查询条件
  dbo.collection("list").find(whereStr).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);

      db.close();
  });
});
})




router.get('/search_list/:id',function(req, res, next){
  var name = req.params.id;
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("music");
  var whereStr = {"name":name};  // 查询条件
  dbo.collection("list").find({"name": {$regex: 'name', $options:'i'}}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);

      db.close();
  });
});
})


router.get('/play_list/:palce',function(req, res, next){
   var palce = req.params.palce;
   MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("music");
     var whereStr = {"palce":palce};  // 查询条件
     dbo.collection("list").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
      });
    });
})

router.get('/account?:id', function(req, res, next){
    var id = req.params.id;
    res.render('index_ingo');

});

router.get('/users/:userId/musics/:musicId', function(req, res, next){

    res.render('play');
});



router.post("/sign_in", function (req, res) {


      var   txt_email= req.body.user_email;
      var   txt_password= req.body.user_password;

    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db("music");
        var myobj = { account:`${txt_email}` , password: `${txt_password}`,like:[] };
        dbo.collection("user").insertOne(myobj, function(err, result) {
            if (err) throw err;
            res.send(result);
            console.log("文档插入成功");
            db.close();
        });
    });
});
/*添加歌曲*/
router.post('/add_music',function(req, res){
      var name= req.body.name;
      var author= req.body.author;
      var palce= req.body.palce;
      var z_name= req.body.z_name;
      var url= req.body.url;
      var introduce= req.body.introduce;
      var myobj={
        name:`${name}`,
        author:`${author}`,
        palce:`${palce}`,
        hot:"",
        comment:'',

        url:`${url}`,
        z_name:`${z_name}`,

        introduce:`${introduce}`,

        img:'',
      }
      addOneMusic(myobj);

});

router.post('/add_like',function(req, res){
    var add_like = req.body.music;
    var id = req.body.id;
    console.log(id);
    var like = JSON.parse(add_like);

    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("music");
      console.log(like);
    var whereStr = {"account":`${id}`};  // 查询条件
    var updateStr = {$addToSet: { "like" :like }};
    dbo.collection("user").updateOne(whereStr, updateStr, function(err, res) {
          if (err) throw err;
          console.log("文档更新成功");
          db.close();
          });
        });


});

router.post('/remove_like',function(req, res){
    var add_like = req.body.music;
    var id = req.body.id;
    console.log(id);
    var like = JSON.parse(add_like);

    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("music");
      console.log(like);
    var whereStr = {"account":`${id}`};  // 查询条件
    var updateStr = {$pull: { "like" :like }};
    dbo.collection("user").updateOne(whereStr, updateStr, function(err, res) {
          if (err) throw err;
          console.log("文档更新成功");
          db.close();
          });
        });


});


router.post('/delete',function(req, res){
    var delete_name = req.body.name;
    console.log(delete_name);
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("music");
    var whereStr = {"name":delete_name};  // 查询条件
    dbo.collection("list").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });
});
});


router.get('/manager',function(req, res, next){
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
      if (err) throw err;
      var dbo = db.db("music");// 查询条件
      dbo.collection("manager").find({}).toArray(function(err, result) {
         if (err) throw err;
         res.send(result);
         db.close();
       });
     });
});
function addOneMusic(obj){
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
      if (err) throw err;
      var dbo = db.db("music");// 查询条件
      dbo.collection("list").insertOne(obj,function(err, result) {
         if (err) throw err;
         console.log("插入成功");
         db.close();
       });
     });
}
module.exports = router;
