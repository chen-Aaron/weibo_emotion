var request = require( 'request'  );
var https = require ( 'https' );
var emotion_url = 'https://api.prprpr.me/emotion/wenzhi?password=DIYgod&text=';
function get_emotion( text ){
	var url = emotion_url+text,result='';
	var another = 'https://cn.bing.com/AS/Suggestions?pt=page.serp&bq=node+http&mkt=zh-cn&qry='+text;
	var option = {
		url:url,
		method:'get',
		header:{ 'User-Agent':'request',
				'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'upgrade-insecure-requests':1},
	};
	request( option , function( error , response , body ){ 
		console.log( body );
		if( !error && response.statusCode==200 ){
			body = JSON.parse( body );
			
			console.log( body );
		}
	} );

	// https.get(url, (res) => {
	//   // console.log('statusCode:', res.statusCode);
	//   // console.log('headers:', res.headers);

	//   res.on('data', (d) => {
	//   	result+=d;
	//   	console.log( result );
	//   });

	// }).on('error', (e) => {
	//   console.error(e);
	// });
	// request.get({url:'https://api.prprpr.me/emotion/wenzhi', form: {password:'DIYgod',text:text}}, function( error , response , body ){ 
	// 	if( !error && response.statusCode==200 ){
	// 		body = JSON.parse( body );
	// 		console.log( body );
	// 	}
	//  })

}
// ['再送个福顺顺利利平平安安','xxx'].forEach( function( aItem ){
// 	console.log( aItem );
// 	get_emotion( aItem );

// } );
get_emotion( encodeURI('再送个福顺顺利利平平安安') );
