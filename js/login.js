mui.plusReady(function() {
	var login = document.getElementById("login");
	var register = document.getElementById("register");
	var password = document.getElementById("password");
	var account = document.getElementById("account");
	var redirect = document.getElementById("redirect")
	var prefix = "latiflan";
	login.addEventListener('click', function() {
		var hash_password = $.md5(prefix + password.value);
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