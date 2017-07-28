/**
 * Created by lenovo on 2017/7/27.
 */

(function () {
    var scoreShow = {
        init : function(){
            // scoreShow.setSemster();
            scoreShow.notThrough();
        },

        //设置学期的select选项
        // setSemster : function () {
        //     var select = document.querySelector('.content_sel');
        //     var start = document.querySelector('.user_level').innerHTML;   //入学年份
        //     var end = new Date().getFullYear();    //当前年份
        //     var num = (end - start)*2;             //学期总数
        //     for(var i = 0;i < num+1;i++){
        //         select.appendChild(document.createElement('option'));
        //         for (var j = start,k=1;j < end ,k <= 2;j ++,k++){
        //             select.getElementsByTagName('option')[i+1].value = start + '-' + Number(start+1) + '学年' + '第' + k + '学期';
        //             // select.getElementsByTagName('option')[i+1].color = "#000";
        //             if(k == 3)
        //                 break;
        //         }
        //     }
        // }

        //未通过成绩展示
        notThrough : function () {
            Ajax({
                url : 'http://localhost:8000/score/notThrough',
                method : 'GET',
                dataType : 'jsonp',
                data : {
                    username : window.localStorage.username,
                    session : window.localStorage.session,
                    name : window.localStorage.name
                },
                success : function (data) {
                    console.log(data.result);
                    //填充未通过成绩的函数
                    scoreShow.fixNotThrough(data.result.length,data.result);
                }
            });
        },

        //未通过界面的数据填充
        fixNotThrough : function (length,res) {
            var items = [];
            var notThr_show = document.querySelector('.notThr_show');
            for(var i = 0;i < length;i++){
                var score_item = document.createElement('div');
                var item_1 = document.createElement('div');
                var item_2 = document.createElement('div');
                for(var j = 0;j < 6;j++){
                    items[j] = document.createElement('div');
                }
                notThr_show.appendChild(score_item);
                score_item.appendChild(item_1);
                score_item.appendChild(item_2);
                item_1.appendChild(items[0]);
                item_1.appendChild(items[1]);
                item_2.appendChild(items[2]);
                item_2.appendChild(items[3]);
                item_2.appendChild(items[4]);
                item_2.appendChild(items[5]);
                score_item.className = "score_item";
                item_1.className = "item_1";
                item_2.className = "item_2";
                items[0].className = "class_name";
                items[1].className = "class_nature";
                items[2].className = "credit";
                items[3].className = "cre";
                items[4].className = "heighest";
                items[5].className = "cre";
                var naure_img = document.createElement('img');
                items[1].appendChild(naure_img);
                console.log(score_item);

                items[0].innerHTML = res[i].className;
                if(res[i].nature == '必修课'){
                    naure_img.setAttribute('src',"../image/icon/scr_icon_must.png");
                }else if(res[i].nature == '选修课'){
                    naure_img.setAttribute('src',"../image/icon/src_icon_slt.png");
                }
                items[2].innerHTML = "学分";
                items[3].innerHTML = res[i].credit;
                items[4].innerHTML = "最高成绩";
                items[5].innerHTML = res[i].highest;
            }
        }

    };
    scoreShow.init();
})();