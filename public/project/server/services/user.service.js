//var model = require("../models/user.model.js")();

module.exports = function(app, model, passport, GoogleStrategy, googleCredentials, cookieParser, session) {
	app.post("/api/user", CreateUser);
	app.get("/api/user", FindAllUsers);
	app.get("/api/tempUser", FindTempUser);
	app.get("/api/user/:id", FindUserById);
	app.get("/api/user?username=username", findUserByUsername);
	app.get("/api/user?email=email", findUserByEmail);
	app.get("/api/user?username=username&password=password", findUserByCredentials);
	app.put("/api/user/:id", UpdateUser);
	app.delete("/api/user/:id", DeleteUser);
	
	
	passport.serializeUser(function (user, done){
		console.log("serializeUser");
		console.log(user);
		done(null, user);
	});
	
	passport.deserializeUser(function (obj, done){
		model 
			.FindUserById(obj._id)
			.then(function(user){
				done(null, user);
			});
	});
	
	passport.use(new GoogleStrategy({
		clientID: googleCredentials.clientId,
		clientSecret: googleCredentials.clientSecret,
		//callbackURL: "http://127.0.0.1:3000/auth/google/callback"
		callbackURL: "http://cs5610-oharakaleigh.rhcloud.com/auth/google/callback"
		},
		function(accessToken, refreshToken, profile, done){
			process.nextTick(function() {
				console.log(accessToken);
				console.log(refreshToken);
				console.log(profile);
				model 
					.CreateGoogleUser(profile, accessToken)
					.then(function(user){
						return done(null, user);
					});
			});
		}
	));
	
/*	app.get('/account', ensureAuthenticated, function(req, res){
		res.render('account', {user: req.user});
	});  */
	
	app.get('/profile', ensureAuthenticated, function(req, res){
		res.render('profile', {user: req.user});
	});
	
	app.get('/login', function(req, res){
		res.render('login', { user: req.user });
	});
	
	app.get('/home', function(req, res){
		res.render('home', { user: req.user });
	});
	
	app.get('/question', function(req, res){
		res.render('question', { user: req.user });
	});
	
	app.get('/header', function(req, res){
		res.render('header', { user: req.user });
	});
	
	app.get('/methodProCon', function(req, res){
		res.render('methodProCon', { user: req.user });
	});
	
	app.get('/methodIntuitionOptions', function(req, res){
		res.render('methodIntuitionOptions', { user: req.user });
	});
	
	app.get('/methodIntuitionEval', function(req, res){
		res.render('methodIntuitionEval', { user: req.user });
	});
	
	app.get('/advice', ensureAuthenticated, function(req, res){
		res.render('advice', { user: req.user });
	});
	
	app.get('/history', ensureAuthenticated, function(req, res){
		res.render('history', { user: req.user });
	});
	
	app.get('/decision', ensureAuthenticated, function(req, res){
		res.render('decision', { user: req.user });
	});
	
	app.get("/auth/google",
		passport.authenticate('google', {scope: ["https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/contacts.readonly"]}),
		function(req, res){	
	});
	
	app.get('/auth/google/callback', 
		passport.authenticate('google', { failureRedirect: '/#/login' }),
		function(req, res) {
			res.redirect('/project/client/index.html#/home');
	});
		
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/project/client/index.html#/home');
	});
		
	app.get('/loggedin', function(req, res){
		if (req.isAuthenticated()){
			model 
				.FindUserById(req.user._id)
				.then(function(user){
					res.json(user);
				});
		} else {
			res.send('0');
		}
	});

	
	
	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { return next(); }
		res.redirect('/login');
	}
	
	
	
	function CreateUser(req, res) {
		var user = req.body;
		model.CreateUser(user).then(function(user){
			res.json(user);
		})
		//res.json(model.CreateUser(user));
	}
	
	function FindAllUsers(req, res) {
		if(req.query.password != null) {
			findUserByCredentials(req, res);
		}
		else if(req.query.username != null) {
            findUserByUsername(req, res);
		}
		else if(req.query.email != null) {
            findUserByEmail(req, res);
		}
			else {
				model.FindAllUsers().then(function(users){
					res.json(users);
				})
				//res.json(model.FindAllUsers());
			}		
	}
	
	function FindTempUser(req, res) {
		model.FindTempUser().then(function(user){
			res.json(user);
		});
	}
	
	function FindUserById(req, res) {
		console.log("findUserById in server called");
		var id = req.params.id;
		console.log(id);
		model.FindUserById(id).then(function(user){
					res.json(user);
            });
		//res.json(model.FindUserById(id));
	}
	
	function findUserByUsername(req, res) {  
		var username = req.query.username;
		console.log(username);
		model.findUserByUsername(username).then(function(user){
					res.json(user);
            });
		//res.json(model.findUserByUsername(username));
	}
	
	function findUserByEmail(req, res) {
		var email = req.query.email;
		console.log(email);
		model.findUserByEmail(email).then(function(user){
					res.json(user);
            });
	}
	
	function findUserByCredentials(req, res) { 
		console.log("find user by credentials in user.service");
		var credentials = {"username" : req.query.username, "password": req.query.password};
		model.findUserByCredentials(credentials).then(function(user){
					res.json(user);
            });
		//res.json(model.findUserByCredentials(credentials));
	}
	
	function UpdateUser(req, res) {
		var id = req.params.id;
		var user = req.body;
		model.UpdateUser(id, user).then(function(status){
					res.json(status);
            });
		//res.json(model.UpdateUser(id, user));
	}
	
	function DeleteUser(req, res) {
		var id = req.params["id"];
		model.DeleteUser(id).then(function(status){
					res.json(status);
            });
		//res.json(model.DeleteUser(id));
	}
}