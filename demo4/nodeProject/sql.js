var mysql = require("mysql");
//console.log(mysql);
var pool = mysql.createPool({
	host:"localhost",
	user:'root',
	password:'root',
	database:'softtwo'
})
exports.query = function(sql,arr,callback){
	pool.getConnection(function(err,connection){
		if(err){
			throw err;
			return;
		}
		connection.query(sql,arr,function(error,results){
//		释放连接,功其他文件重复使用
			connection.release();
			if(error){
				throw error;
			}
			//执行回掉函数，将数据返回
			callback && callback(results)
		})
	})
}

