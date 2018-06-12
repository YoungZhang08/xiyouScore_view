/**
 * Created by lenovo on 2017/7/26.
 */

(function() {
    var login = {
        init: function() {
            login.verCode();
            login.verHandle();
            login.subHandle();
        },
        //获取验证码
        verCode: function() {
            Ajax({
                url: 'http://127.0.0.1:8000/users/verCode',
                method: 'GET',
                dataType: 'jsonp',
                // error: function(err) {
                //     alert(err);
                // },
                success: function(data) {
                    document.querySelector('.verBtn').querySelector('img').setAttribute('src', data.result.verCode);
                    window.localStorage.session = data.result.session;
                }
            });
        },

        //验证码更换事件
        verHandle: function() {
            var verBtn = document.querySelector('.verBtn');
            verBtn.addEventListener("click", function() {
                login.verCode();
            }, false);
        },

        //登录
        submit: function() {
            var getParams = {
                username: document.querySelector('.username').value,
                password: document.querySelector('.password').value,
                verCode: document.querySelector('.verCode').value
            };

            if (getParams.username == '' || getParams.password == '') {
                alert("用户信息不能为空!");
            } else if (getParams.verCode == '') {
                alert("请填写验证码!");
            }

            Ajax({
                url: 'http://127.0.0.1:8000/users/login',
                method: 'POST',
                dataType: 'jsonp',
                data: {
                    username: getParams.username,
                    password: getParams.password,
                    verCode: getParams.verCode,
                    session: window.localStorage.session
                },
                success: function(data) {
                    console.log(data);
                    if (data.error == false) {
                        alert("登录成功!");
                        window.localStorage.name = data.result;
                        window.localStorage.username = getParams.username;
                        window.localStorage.password = getParams.password;
                        window.location.href = "../html/main.html";
                        getParams.verCode = '';
                    } else {
                        alert("登录失败!");
                    }
                }
            });
        },

        //登录事件
        subHandle: function() {
            var login_btn = document.querySelector('.login_btn').querySelector('img');
            login_btn.addEventListener("click", function() {
                login.submit();
            });
        }
    };
    login.init();
})();