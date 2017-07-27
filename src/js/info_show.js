/**
 * Created by lenovo on 2017/7/27.
 */

(function () {
    var infoShow = {
        init : function () {
            infoShow.userPortrait();
            infoShow.infoDetail();
            infoShow.exitLogin();
        },

        //获取用户头像
        userPortrait : function () {
            var url = 'http://scoreapi.xiyoumobile.com/users/img?username=' + window.localStorage.username + '&session=' + window.localStorage.session + '&name=' + window.localStorage.name;
            document.querySelector('.img_header').querySelector('img').src = url;
            document.querySelector('.portrait').querySelector('img').src = url;
        },

        //用户信息展示
        infoDetail : function () {
            var options = {
                userName : document.querySelector('.user_id'),
                userBirth : document.querySelector('.user_birth'),
                userAcademy : document.querySelector('.user_academy'),
                userClass : document.querySelector('.user_class'),
                userLevel : document.querySelector('.user_level'),
                userSex : document.querySelector('.user_sex'),
                userAge : document.querySelector('.user_age'),
                name : document.querySelector('.per_name').querySelector('span')
            };

            Ajax({
                url : 'http://localhost:8000/users/info',
                method : 'GET',
                dataType : 'jsonp',
                data : {
                    username : window.localStorage.username,
                    session : window.localStorage.session,
                    name : window.localStorage.name
                },
                success : function (data) {
                    console.log(data.result);
                    options.name.innerHTML = data.result.name;
                    options.userName.innerHTML = data.result.username;
                    options.userBirth.innerHTML = data.result.birthday.substr(0,4) + '年' + data.result.birthday.substr(4,2) + '月' + data.result.birthday.substr(6,2) + '日';
                    options.userAcademy.innerHTML = data.result.academy;
                    options.userClass.innerHTML = data.result.class;
                    options.userLevel.innerHTML = data.result.level + '级';
                    options.userSex.innerHTML = data.result.sex;
                }
            });
        },

        //退出登录
        exitLogin : function () {
            document.querySelector('.login_out').addEventListener("click",function () {
                window.localStorage.name = '';
                window.localStorage.username = '';
                window.localStorage.password = '';
                window.localStorage.session = '';
                window.location.href = "../index.html";
            },false);
        }
    };
    infoShow.init();
})();