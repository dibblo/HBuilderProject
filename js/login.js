mui.plusReady(function() {
	var login = document.getElementById("login");
	var register = document.getElementById("register");
	var password = document.getElementById("password");
	var account = document.getElementById("account");
	var redirect = document.getElementById("redirect")
	var model = "cf66d738cb94b4dd67917d907d44e9a316ec223de81d8429eac903818fc46540f555aa3029b3f2d1c7614073768f7daada79ad293d5e75c4d50f0b36fc300a8f7e24e2cae10612a60d9df2ab51b75f5579a39ce164ed7e0fb5125782c3188f14172836c664f1b1bc92bd32348a595788ac4eea121796680312f51ea057b76d0d";
	var exponent = "10001";
	
	var passname = $("#pwd").attr("name");
	passname = new Date().DateTimeFormat("yyyy-MM-dd hh:mm:ss");
	login.addEventListener('click', function() {
		var key = new RSAUtils.getKeyPair(exponent, "", model);
		var result = RSAUtils.encryptedString(key,password.value);
		console.log("password:"+password.value);
		console.log("result:"+result);
		console.log("publicKey:" + model);
		var hash_password = result;
		mui.ajax("http://192.168.0.51:8080/applogin", {
			data: {
				userName: account.value,
				password: hash_password
			},
			type: "post",
			timeout: 2000,
			success: function(data) {
				if (data.result == 1) {
					window.location.href = "view/main.html"
					UserInfo.username(account.value);
					UserInfo.password(hash_password);
					UserInfo.token(data.token);
				} else {
					alert(data.message);
				}
			},
			error: function(e, type, errorThrown) {
				console.log(e.readyState);
				console.log(type);
				console.log(errorThrown);
			}
		})
	});
	register.addEventListener("click", function() {
		mui.ajax("http://192.168.0.51:8080/register", {
			data: {
				userName: account.value,
				password: password.value
			},
			type: "post",
			timeout: 2000,
			success: function(data) {
				alert(data.message);
			},
			error: function(e, type, errorThrown) {
				console.log(e.readyState);
				console.log(type);
				console.log(errorThrown);
			}
		})
	});
	
	redirect.addEventListener("click", function() {
		var flag = UserInfo.has_login();
		if (flag) {
			window.location.href = "view/main.html";
		} else {
			alert("请先登录");
		}
	});
	function UserInfo(){};
	UserInfo.clear = function() {
			plus.storage.removeItem('username');
			plus.storage.removeItem('password');
			plus.storage.removeItem('token');
		}
		//检查是否包含自动登录的信息
	UserInfo.auto_login = function() {
			var username = UserInfo.username();
			var pwd = UserInfo.password();
			if (!username || !pwd) {
				return false;
			}
			return true;
		}
		//检查是否已登录
	UserInfo.has_login = function() {
		var username = UserInfo.username();
		var pwd = UserInfo.password();
		var token = UserInfo.token();
		if (!username || !pwd || !token) {
			return false;
		}
		return true;
	};
	//存储用户名
	UserInfo.username = function() {
		if (arguments.length == 0) {
			return plus.storage.getItem('username');
		}
		if (arguments[0] === '') {
			plus.storage.removeItem('username');
			return;
		}
		plus.storage.setItem('username', arguments[0]);
	};
	//存储密码
	UserInfo.password = function() {
		if (arguments.length == 0) {
			return plus.storage.getItem('password');
		}
		if (arguments[0] === '') {
			plus.storage.removeItem('password');
			return;
		}
		plus.storage.setItem('password', arguments[0]);
	};
	//存储token
	UserInfo.token = function() {
		if (arguments.length == 0) {
			return plus.storage.getItem('token');
		}
		if (arguments[0] === '') {
			plus.storage.removeItem('token');
			return;
		}
		plus.storage.setItem('token', arguments[0]);
	};
})