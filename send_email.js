var nodemailer = require('nodemailer');


// var mailOptions = {
//     from: '"Fred Foo " <1518712286@qq.com>', // sender address
//     to: '1782202600@qq.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plain text body
//     html: '<b>Hello world ?</b>' // html body
// };

var email = function( config ){
	this.title = config.title;
	this.toWhom = config.toWhom;
	this.text = config.text;
	this.html = config.html;
}
email.prototype.sendMail = function ( ){
	try{
		var transporter = nodemailer.createTransport( this.config );
		var mailOptions = {
		    from: '"'+this.title+'" <'+this.config.auth.user+'>',
		    to: this.toWhom, // 邮件接收者
		    subject: this.title, // 邮件概要
		    text: this.text, // 邮件内容
		    html: this.html // 邮件页面代码
		};
		transporter.sendMail(mailOptions, function(error, info){
		    if (error) {
		        return console.log(error);
		    }
		});
	}
	catch(e){
		console.log( e );
	}
}
email.prototype.config = {
	secure: true,
	host: 'smtp.qq.com',
	secureConnection: true,
	port: 465,
	auth: {
		user: '1518712286@qq.com',
		pass: 'uadyqyuydeybjffb',
	}
}
// var mailOptions = {
// 	title:'测试发送邮件',
// 	toWhom:'1782202600@qq.com',
// 	text:'这是测试内容',
// 	html:'<h3>测试内容首页</h3>',
// };
// 	var mail =new email( mailOptions );
// 	mail.sendMail(  );

module.exports.creatEmail = email;

// module.exports.sendEmail = sendMail;



