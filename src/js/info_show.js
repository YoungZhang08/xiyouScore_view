/**
 * Created by lenovo on 2017/7/27.
 */

(function() {
    var infoShow = {
        init: function() {
            infoShow.userPortrait();
            infoShow.infoDetail();
            infoShow.exitLogin();
        },

        //获取用户头像
        userPortrait: function() {
            var url = 'http://scoreapi.xiyoumobile.com/users/img?username=' + window.localStorage.username + '&session=' + window.localStorage.session + '&name=' + window.localStorage.name;
            document.querySelector('.img_header').querySelector('img').src = url;
            document.querySelector('.portrait').querySelector('img').src = url;
        },

        //用户信息展示
        infoDetail: function() {

            var name = document.querySelector('.per_name').querySelector('span');
            name.innerHTML = window.localStorage.name;
            Ajax({
                url: 'http://localhost:8000/users/info',
                method: 'GET',
                dataType: 'jsonp',
                data: {
                    username: window.localStorage.username,
                    session: window.localStorage.session,
                    name: window.localStorage.name
                },
                success: function(data) {
                    var fragment = document.createDocumentFragment();
                    var div = document.createElement('div');
                    div.className = "info_det";
                    div.innerHTML = '<div class="user_id">' + data.result.username + '</div><div class="user_birth">' + data.result.birthday.substr(0, 4) + '年' + data.result.birthday.substr(4, 2) + '月' + data.result.birthday.substr(6, 2) + '日' + '</div><div class="user_academy">' + data.result.academy + '</div><div class="user_class">' + data.result.class + '</div><div class="user_level">' + data.result.level + '级' + '</div><div class="user_sex">' + data.result.sex;
                    window.localStorage.level = data.result.level; //后边处理选择学期时候要用

                    fragment.appendChild(div);
                    var info_main = document.querySelector('.info_main');
                    info_main.appendChild(fragment);
                }
            });
        },

        //退出登录
        exitLogin: function() {
            document.querySelector('.login_out').addEventListener("click", function() {
                window.localStorage.name = '';
                window.localStorage.username = '';
                window.localStorage.password = '';
                window.localStorage.session = '';
                window.location.href = "../index.html";
            }, false);
        }
    };
    infoShow.init();
})();