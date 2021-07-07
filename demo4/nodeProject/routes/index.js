var express = require('express');
var router = express.Router();
var sql = require("../sql.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//1、注册
router.post("/register",function(req,res){
//	console.log(req.body);
	//前端发送的数据参数
	var username = req.body.username;
	var password = req.body.password;
	var age = req.body.age;
	var class_id = req.body.class_id;
	var email = req.body.email;
//	判断用户名和密码不为空
		if(username && password){
//			用户名不能重复
				var searchSql = "select * from student where username = ?";
				sql.query(searchSql,[username],function(result){
					console.log(result);
					if(result.length){
						res.send({
							msg:'用户已注册',
							code:2
						})
					}else{
						//	sql语句
						var addsql = "insert into student (username,password,age,class_id,email) values (?,?,?,?,?)";
						var sqlParams = [username,password,age,class_id,email];
					//	应用sql.js的方法
						sql.query(addsql,sqlParams,function(result){
							res.send({
								"msg":"注册成功~",
								"code":1
							})
						})
					}
				})
			
		}else{
			res.send({
				msg:'用户名或密码为空',
				code:-1
			})
		}	
})
//2、登录
router.post("/login",function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	if(username && password){
		sql.query("select * from student where username=?",[username],function(result){
//			console.log(result);
			if(result.length){
				if(password === result[0].password){
					res.send({
						msg:"登录成功~",
						code:0
					})
				}else{
					res.send({
						msg:"密码错误",
						code:2
					})
				}
			}else{
				res.send({
					msg:'该用户不存在，请注册',
					code:-1
				})
			}
		})
	}else{
		res.send({
			msg:'用户名或密码不能为空',
			code:1
		})
	}
})
//3、查询全部用户信息
router.get("/search_all",function(req,res,next){
	sql.query("select * from student",[],function(result){
		res.send(result);
	})
})
//4、删除
router.get("/delete",function(req,res,next){
//	console.log(req);
	var id = req.query.id;
	if(id){
		sql.query("delete from student where id = ?",[id],function(result){
			res.send({
				msg:"删除成功",
				code:0
			})
		})
	}else {
		res.send({
			msg:"删除失败",
			code:1
		})
	}
})
//5、根据id查询用户信息
router.get("/user_id",function(req,res,next){
	var id = req.query.id;
	if(id){
		sql.query("select * from student where id = ?",[id],function(result){
			res.send({
				msg:"查询成功~",
				code:0,
				data:result
			})
		})
	}else{
		res.send({
			msg:"查询失败",
			code:1
		})
	}
})

//6、更新
router.get("/user_update",function(req,res,next){
	console.log(req.query);
	var username = req.query.username;
	var password = req.query.password;
	var age = req.query.age;
	var class_id = req.query.class_id;
	var email = req.query.email;
	var id = req.query.id;
	if(id){
		var updateSql = "update student set username = ?,password=?,age=?,class_id=?,email=? where id=?";
		var sqlParams = [username,password,age,class_id,email,id];
		sql.query(updateSql,sqlParams,function(result){
			res.send({
				msg:"更新成功",
				code:0
			})
		})
	}else{
		res.send({
			msg:"修改失败",
			code:1
		})
	}
})

module.exports = router;
