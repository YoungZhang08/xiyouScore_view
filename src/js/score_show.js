/**
 * Created by lenovo on 2017/7/27.
 */

(function() {
    var scoreShow = {
        init: function() {
            // scoreShow.setSemster();
            scoreShow.notThrough();
            scoreShow.fixMakeup();
        },

        //设置学期的select选项
        // setSemster: function() {
        //     var select = document.querySelector('.content_sel');
        //     var start = window.localStorage.level; //入学年份
        //     var end = new Date().getFullYear(); //当前年份
        //     var num = (end - start) * 2; //学期总数
        //     // console.log(num);
        //     for (var i = 1; i <= num; i++) {
        //         select.appendChild(document.createElement('option'));
        //         for (var j = start, k = 1; j < end, k <= 2; j++, k++) {
        //             // select.getElementsByTagName('option')[i + 1].value = " start + '-' + Number(start + 1) + '学年' + '第' + k + '学期' ";
        //             // select.getElementsByTagName('option')[i + 1].color = "#000";
        //             // if (k == 3)
        //             //     break;
        //         }
        //     }
        //     console.log(select);
        // },

        //未通过成绩展示
        notThrough: function() {
            Ajax({
                url: 'http://localhost:8000/score/notThrough',
                method: 'GET',
                dataType: 'jsonp',
                data: {
                    username: window.localStorage.username,
                    session: window.localStorage.session,
                    name: window.localStorage.name
                },
                success: function(data) {
                    //填充未通过成绩的函数
                    scoreShow.fixNotThrough(data.result.length, data.result);
                }
            });
        },

        //已通过界面的数据填充
        passed: function() {

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
                div.innerHTML = '<div class="item_1"><div class="class_name">' + res[i].className + '</div><div class="class_time">时间&nbsp;<span color="black">' + res[i].style + '</span></div></div><div class="item_2"><div class="seat_num">座位号&nbsp;<span color="black">' + res[i].seat + '</span></div><div class="class_room">考场&nbsp;<span color="black">' + res[i].room + '</span></div></div>';
                fragment.appendChild(div);
            }
            var makeup_show = document.querySelector('.makeup_show');
            makeup_show.appendChild(fragment);
        }
    };
    scoreShow.init();
})();