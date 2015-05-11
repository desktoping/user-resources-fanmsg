var jade = require('jade');
var User = require('./models/user');
module.exports = function(router){
	router.get('/', function *(){
		var newUser= ['1'];
		var newPass= ['1'];
		var data = yield User.find({},function(err,obj){
			// splitting and assigning of string here
			// this is a bit long and i hope i can find a shorter work around for this
			// initializing variables for this splitting and assigning of strings
			var args= "";
			var partsOfStr = "";
			var passUser = "";
			var passPassword = "";
			var fields = Object.keys(obj);
			
			
			// args becomes the container of our string for splitting later.
			for(var i = 0; i < fields.length; i++) {
				if(i != 0){
					args = args +','+ obj[i];
				}else
					args = obj[i];
			}
			
			// splits the result by comma for better reading
			var partsOfStr = args.split(',');
			// counter for ""user"" and ""pass"" distinction
			var counter = 0;
			
			// index for ""user"" and ""pass"" array.
			var setterUser = 0;
			var setterPass = 0;
			
			// newString becomes the comtainer of our proccessed string that will be imported to the
			// ""user"" and ""pass"" array.
			var newString = "";
			
			// the magic begins here! :)
			
			for(var i = 1; i < partsOfStr.length; i++) {
				partsOfStr[i] = partsOfStr[i].replace(/\s+/, "");
				partsOfStr[i] = partsOfStr[i].replace(/[^a-zA-Z0-9 ]/g, "");
				// 0 == users ; 1 == password
				if(counter % 3 == 0){
					newString = "";
					newString = partsOfStr[i].substr(5,partsOfStr[i].length);
					newUser[setterUser] = newString;
					setterUser++;
					counter++;
				}else if(counter % 3 == 1){
					newString = "";
					newString = partsOfStr[i].substr(5, partsOfStr[i].length);
					newPass[setterPass] = newString;
					setterPass++;
					counter++;
				}else{
					counter++;
				}
				newString = "";
			}
			counter = 0;
			setterPass = 0;
			setter = 0;
			setterUser = 0;
		});
		console.log(newUser.length);
   		var html = jade.renderFile('main.jade',{user : newUser,pass : newPass, len : newUser.length});
		this.body = html;
		args = "";
	});
	router.get('/users/:user', function *(){
		var data = yield User.find();
   		var html = jade.renderFile('find.jade',this.request.params);
		this.body = html;
	});
	router.post('/users/', function *(){
		var user = new User(this.request.body);
		var data = yield user.save();
		var html = jade.renderFile('create.jade',this.request.body);
		this.body = html;
	});
	router.delete('/users/:user', function *(){
		console.log('here');
		var data = yield User.remove(this.params);
		var html = jade.renderFile('delete.jade',this.request.body);
		this.body = html;
	});
	router.patch('/users/:user', function *(){
		var data = yield User.update(this.params,{ pass: 'changed'});
		var html = jade.renderFile('update.jade',this.request.body);
		this.body = html;
	});
};