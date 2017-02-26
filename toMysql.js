var mysql = require('mysql');

//数据库配置-本地mysql数据库
// var config={
//   host     : 'localhost',
//   user     : 'root',
//   password : 'zhuanyon',
//   database : 'myapp',
  
// };
//阿里云mysql数据库
var config={
  host     : 'rm-bp1w9638q3b1a15n7o.mysql.rds.aliyuncs.com',
  user     : 'root',
  password : 'RRKVsykVzHXcW8auRYkHGDAt',
  database : 'myapp',
  
};

// 连接mysql数据库
function connectMysqlStart( config ){
	var connection = mysql.createConnection( config );

	return connection;


};
// 断开数据库连接
function connectMysqlEnd( connection ){
	connection.end();
};

// 数据库查询
function MysqlQuery( query , callback ){
	var connection = mysql.createConnection( config );
	var aReslut;
	
	connection.query( query , function( err , results , fields ){ 
		if( err ) throw err ; 

		aReslut =  results;
		callback( aReslut );

	 } );

	connection.end();

}

function InsertMysqlWeibo (  weibos ){
	var connection = mysql.createConnection( config );

	var sql = "insert into db_weibocontent(c_content,c_time,c_nickname,c_positive,c_negative,c_contentid ,c_userid , c_sourceurl) VALUES ";
	var values = '';
	weibos.forEach( function( aItem ){ 
		values+=",('"+aItem.c_content+"','"+aItem.c_time+"','"+aItem.c_nickname+"','"+aItem.c_positive+"','"+aItem.c_negative+"','"+aItem.c_contentid+"','"+aItem.c_userid+"','"+aItem.c_sourceurl+"')";
	} );
	values = values.replace( ',' , '' );
	sql = sql + values ;
	connection.query( sql , function (error, results, fields) {
	  if (error) throw error;

	});
	connection.end();
    return true;

}

// 方法暴露
module.exports.connectMysqlStart=connectMysqlStart;
module.exports.MysqlQuery=MysqlQuery;
module.exports.InsertMysqlWeibo=InsertMysqlWeibo;

