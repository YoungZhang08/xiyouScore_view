/**
 * Created by lenovo on 2017/7/27.
 */

(function() {
    var scoreShow = {
        selectOpt: {
            year: '',
            semester: ''
        },

        init: function() {
            scoreShow.setSemster();
            scoreShow.notThrough();
            scoreShow.makeup();
        },

        //设置学期的select选项以及绑定选择学期的事件
        //已通过界面成绩展示
        setSemster: function() {
            var select = document.querySelector('.content_sel');
            var start = window.localStorage.level; //入学年份
            var end = new Date().getFullYear(); //当前年份
            var num = (end - start) * 2; //学期总数=创建select的option选项个数
            for (var i = 1; i <= num; i++) {
                var option = document.createElement('option');
                option.style.width = 10 + 'px';
                select.appendChild(option);
                if (i % 2 == 1) {
                    option.innerHTML = start + '-' + (Number(start) + Number(1)) + '学年第' + 1 + '学期';
                } else if (i % 2 == 0) {
                    option.innerHTML = start + '-' + (Number(start) + Number(1)) + '学年第' + 2 + '学期';
                    start++;
                }
            }

            var options = select.getElementsByTagName('option');
            select.addEventListener("change", function() {
                var year = options[select.selectedIndex].innerHTML.substr(0, 9);
                var semester = options[select.selectedIndex].innerHTML.substr(12, 1);
                scoreShow.selectOpt.year = year;
                scoreShow.selectOpt.semester = semester;
                scoreShow.passed();
            }, false);
        },

        // 已通过界面成绩展示
        passed: function() {
            var passed_show = document.querySelector('.passed_show');
            Ajax({
                url: 'http://127.0.0.1:8000/score/semester',
                method: 'POST',
                dataType: 'jsonp',
                data: {
                    username: window.localStorage.username,
                    session: window.localStorage.session,
                    name: window.localStorage.name,
                    year: scoreShow.selectOpt.year,
                    semester: scoreShow.selectOpt.semester
                },

                success: function(data) {
                    //填充已通过成绩查询的函数
                    passed_show.innerHTML = '';
                    scoreShow.fixSemester(data.result.length, data.result);
                }
            });
        },

        //未通过成绩展示
        notThrough: function() {
            var notThr_show = document.querySelector('.notThr_show');
            Ajax({
                url: 'http://127.0.0.1:8000/score/notThrough',
                method: 'GET',
                dataType: 'jsonp',
                data: {
                    username: window.localStorage.username,
                    session: window.localStorage.session,
                    name: window.localStorage.name
                },
                success: function(data) {
                    console.log(data);
                    //填充未通过成绩的函数
                    notThr_show.innerHTML = '';
                    scoreShow.fixNotThrough(data.result.length, data.result);
                }
            });
        },

        //补考查询展示
        makeup: function() {
            var makeup_show = document.querySelector('.makeup_show');
            Ajax({
                url: 'http://127.0.0.1:8000/makeUp/makeUp',
                method: 'GET',
                dataType: 'jsonp',
                data: {
                    username: window.localStorage.username,
                    session: window.localStorage.session,
                    name: window.localStorage.name
                },
                success: function(data) {
                    // console.log(data.result);
                    //填充补考查询的函数
                    makeup_show.innerHTML = '';
                    scoreShow.fixMakeup(data.result.length, data.result);
                }
            });
        },

        //已通过界面的数据填充
        fixSemester: function(length, res) {
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < length; i++) {
                var div = document.createElement('div');
                div.className = 'score_item';
                div.innerHTML = '<div class="item_1"><div class="class_name">' + res[i].courseTitle + '</div><div class="class_nature"><img src=""></div></div><div class="item_2"><div class="final_score">成绩</div><div class="score_point">绩点</div><div class="credit">学分</div></div><div class="item_2"><div class="score">' + res[i].achievement + '</div><div class="point">' + res[i].gradePoint + '</div><div class="cre">' + res[i].credit + '</div></div>';

                var naure_img = div.querySelector('.class_nature').querySelector('img');
                if (res[i].courseType == '必修课') {
                    naure_img.setAttribute('src', "../image/icon/scr_icon_must.png");
                } else if (res[i].courseType == '选修课' || res[i].courseType == '选修课(尔雅)') {
                    naure_img.setAttribute('src', "../image/icon/src_icon_slt.png");
                }
                fragment.appendChild(div);
            }
            var passed_show = document.querySelector('.passed_show');
            passed_show.appendChild(fragment);
        },

        //未通过界面的数据填充
        fixNotThrough: function(length, res) {
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < length; i++) {
                var div = document.createElement('div');
                div.className = 'score_item';
                div.innerHTML = '<div class="item_1"><div class="class_name">' + res[i].className + '</div><div class="class_nature"><img src=""></div></div><div class="item_2"><div class="credit">学分</div><div class="cre">' + res[i].credit + '</div><div class="heighest">最高成绩</div><div class="cre">' + res[i].highest + '</div></div></div>';

                var naure_img = div.querySelector('.class_nature').querySelector('img');
                if (res[i].nature == '必修课') {
                    naure_img.setAttribute('src', "../image/icon/scr_icon_must.png");
                } else if (res[i].nature == '选修课') {
                    naure_img.setAttribute('src', "../image/icon/src_icon_slt.png");
                }
                fragment.appendChild(div);
            }
            var notThr_show = document.querySelector('.notThr_show');
            notThr_show.appendChild(fragment);
        },

        //补考查询界面的数据填充
        fixMakeup: function(length, res) {
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < length; i++) {
                var div = document.createElement('div');
                div.className = 'score_item';
                div.innerHTML = '<div class="item_1"><div class="class_name">' + res[i].className + '</div><div class="class_room">考场&nbsp;&nbsp;<span color="black">' + res[i].seat + '</span></div></div><div class="item_2"><div class="class_time">时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span color="black">' + res[i].room + '</span></div></div>';
                fragment.appendChild(div);
            }
            var makeup_show = document.querySelector('.makeup_show');
            makeup_show.appendChild(fragment);
        }
    };
    scoreShow.init();
})();