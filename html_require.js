var request = require( 'request' );

var cheerio = require( 'cheerio' );

var mysql = require( './toMysql.js' );

var Url= 'http://weibo.com/u/2089042141?is_hot=1'; 
var UrlGetEmotion = 'https://api.prprpr.me/emotion/wenzhi?password=DIYgod&text=';

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

var weibos=[];

//解析网页
function parseHtml( Html ){
	var $ = cheerio.load( Html );
	var ItemsWrap = $( '.WB_feed_detail' );

	var weibo , content , time , nickname , device ;
	ItemsWrap.map( function( i , el  ){

		content = $( el ).find( '.WB_text' );

		time = $($( el ).find( '.WB_from' ).find( 'a' )[0]).text();

		device = $($( el ).find( '.WB_from' ).find( 'a' )[1]).text();

		weibo = {
			nickname:$(content).attr( 'nick-name' ) ,
			content:$(content).text().replace( /\s/g , '' ) ,
			time:time ,
			device:device ,
		};
		weibos.push( weibo );
	} );

	getEmotion( weibos );
};

// 解析微博情绪
function getEmotion( weibos ){
	try{
		var Emotions = [] , Emotion , aUrl , option , aEmotion , counter=0 , limit = weibos.length ;
		weibos.forEach( function( aItem ){ 
			aUrl = 'https://api.prprpr.me/emotion/wenzhi?password=DIYgod&text="'+aItem.content+'"';
			option = { 
				method: 'get' ,
				url: aUrl ,
			 };

			let Item = aItem ;

			request( aUrl , function( error , Res , body ){ 
				
				counter++;
				
				if( !error && Res.statusCode==200 ){
					aEmotion = JSON.parse( body )  ;

					if( aEmotion.codeDesc=='Success' ){
						Item['emotion_nagtive'] = aEmotion.negative;
						Item['emotion_positive'] = aEmotion.positive;
						Emotions.push( Item );

					}
					else{
						console.log( 'message:'+aEmotion.message );
						console.log( 'code:'+aEmotion.code );
					}
					
				}
				if( counter == limit ){
					console.log( Emotions );
				}
			} );
		 } );
	}
	catch( e ){
		var me=e;
	}
}

// 获取微博时绕过新浪访客系统
var option={
	url:Url,
	headers:{ 'User-Agent':'spider'}
};


// 取得博主的页面
request( option , function( error , response , body ){ 
	if( !error && response.statusCode==200 ){
		parseHtml( body );
	}
} );
// aliyun  RRKVsykVzHXcW8auRYkHGDAt





// console.log( mysql );
// var connection = mysql.connectMysqlStart( config );
// var query =' select * from db_weibocontent ';
// var insertquery = ' INSERT INTO db_weibocontent SELECT * FROM db_weibocontent ';
// // var query = "show variables like '%char%'";
// mysql.MysqlQuery( connection , query );




